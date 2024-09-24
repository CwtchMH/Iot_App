import mqtt from 'mqtt';

// Use the correct WebSocket URL and port
const client = mqtt.connect('ws://192.168.0.110:9001/mqtt');

client.on('connect', () => {
    if (client.connected === true) {
        console.log('Successfully connected to MQTT broker'); 
    }
});

export function mqttPublish(message) {
  client.publish('your/topic', message, (err) => {
    if (err) {
      console.error('Error publishing to MQTT:', err);
    }
  });
}