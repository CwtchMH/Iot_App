import mqtt from 'mqtt';

// Use the correct WebSocket URL and port
const client = mqtt.connect('ws://192.168.22.123:9001/mqtt');

client.on('connect', () => {
    if (client.connected === true) {
        console.log('Successfully connected to MQTT broker'); 
    }
});

export function mqttPublish(message) {
  client.publish('devices/control', message, (err) => {
    if (err) {
      console.error('Error publishing to MQTT:', err);
    }
  });
}