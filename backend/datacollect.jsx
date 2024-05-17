const express = require("express");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const WebSocket = require("ws");
const http = require('http');

const app = express();
const port = 3000;

const portName = "COM3";
const serialPort = new SerialPort({
  path: portName,
  baudRate: 9600,
  autoOpen: false,
});
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connecté à la base de données MongoDB");
  } catch (err) {
    console.error("Erreur de connexion à la base de données MongoDB :", err);
  }
}

async function insertData(data) {
  try {
    const database = client.db("weather");
    const collection = database.collection("weatherData");
    const [humidityStr, temperatureStr] = data.split(" ");
    const humidity = parseFloat(humidityStr);
    const temperature = parseFloat(temperatureStr);
    console.log("here are humid and temp: ", humidity, temperature);
    if (isNaN(humidity) || isNaN(temperature)) {
      console.error("Failed to parse humidity or temperature from data:", data);
      return;
    }
    const result = await collection.insertOne({ humidity, temperature });
    console.log(
      "Donnée insérée dans la base de données avec l'ID :",
      result.insertedId
    );
  } catch (err) {
    console.error(
      "Erreur lors de l'insertion des données dans la base de données :",
      err
    );
  }
}

serialPort.open((err) => {
  if (err) {
    console.error("Error opening port:", err.message);
  } else {
    console.log("Port opened successfully");
  }
});

serialPort.on("open", () => {
  console.log("Connexion série établie avec succès");
});

parser.on("data", async (data) => {
  console.log("Données reçues de l'Arduino:", data);
  const insertedData = await insertData(data);
  if (insertedData) {
    broadcast(JSON.stringify(insertedData));
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Serveur Express en marche !");
});

app.listen(port, () => {
  console.log(`Le serveur Express écoute sur le port ${port}`);
});
async function getWeatherData(req, res) {
  try {
    await client.connect();
    const db = client.db("weather");
    const coll = db.collection("weatherData");

    const aggregationPipeline = [
      { $sort: { _id: -1 } }, // Sort by _id in descending order to get the latest document first
      { $limit: 1 }, // Limit to retrieve only one document
    ];

    const cursor = coll.aggregate(aggregationPipeline);
    const result = await cursor.toArray();
    res.json(result); // Send the fetched data as JSON response
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  } finally {
    //await client.close();
  }
}

app.get("/getWeatherData", getWeatherData);

connectToDatabase();
module.exports = { getWeatherData };


const server = http.createServer((req, res) => {});
const wss = new WebSocket.Server({ server });

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on("connection", (ws) => {
  console.log("WebSocket connection is successfullyy established");
  ws.on("message", (message) => {
    console.log("Received:", message);
  });
});

const portH=3001;
server.listen(portH, () => {
  console.log(`HTTP server listening on port ${portH}`);
});