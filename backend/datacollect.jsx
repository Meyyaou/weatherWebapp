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
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

async function insertData(data) {
  try {
    const database = client.db("weather");
    const collection = database.collection("weatherData");
    const [humidityStr, temperatureStr] = data.split(" ");
    const humidity = parseFloat(humidityStr);
    const temperature = parseFloat(temperatureStr);
    console.log("Humidity and Temperature:", humidity, temperature);
    if (isNaN(humidity) || isNaN(temperature)) {
      console.error("Failed to parse humidity or temperature from data:", data);
      return;
    }
    const result = await collection.insertOne({ humidity, temperature });
    console.log(
      "Data inserted into the database with ID:",
      result.insertedId
    );
    return { humidity, temperature };
  } catch (err) {
    console.error(
      "Error inserting data into the database:",
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
  console.log("Serial connection established successfully");
});

parser.on("data", async (data) => {
  console.log("Data received from Arduino:", data);
  const insertedData = await insertData(data);
  if (insertedData) {
    broadcast(JSON.stringify(insertedData));
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Express server running!");
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

async function getWeatherData(req, res) {
  try {
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

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function broadcast(data) {
  console.log("Broadcasting data:", data); // Log broadcasted data
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  ws.on("message", (message) => {
    console.log("Received message:", message);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

const portH = 8009;
server.listen(portH, () => {
  console.log(`HTTP server listening on port ${portH}`);
});
