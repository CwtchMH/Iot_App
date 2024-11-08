import mqtt from "mqtt";

// Use the correct WebSocket URL and port
const client = mqtt.connect("ws://192.168.89.195:9001/mqtt", {
  username: "ManhHieu",
  password: "b21dccn364",
});

client.on("connect", () => {
  if (client.connected === true) {
    console.log("Successfully connected to MQTT broker");
  }
  client.subscribe("devices/control");
});

export function mqttPublish(message) {
  client.publish("devices/control", message, (err) => {
    if (err) {
      console.error("Error publishing to MQTT:", err);
    }
  });
}

export default client;





