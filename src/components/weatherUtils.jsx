export const shouldShowAlert = (temperature, humidity, alertsEnabled) => {
  const isTemperatureHigh = temperature <= 30;
  const isHumidityHigh = humidity <= 70;

  return alertsEnabled && (isTemperatureHigh || isHumidityHigh);
};
