import { connect } from "mqtt";

export default connect((process.env.MQTT_URL = "mqtt://mqtt.lyaelectronic.com:1883"));
