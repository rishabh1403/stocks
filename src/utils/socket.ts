import {websocketUrl} from "../constants";

let ws = new WebSocket(websocketUrl);
let connectInterval = null;
let timeout: number = 250;

const connect = () => {
  ws = new WebSocket(websocketUrl);

  ws.onopen = () => {
    console.log("connected to websocket");
    clearTimeout(connectInterval);
  };

  ws.onclose = (e) => {
    console.log(
      `Socket is closed. Reconnecting...`,
      e.reason
    );
    timeout = timeout + timeout;
    connectInterval = setTimeout(checkWebsocketConnection, Math.min(10000, timeout));
  };

  ws.onerror = (err) => {
    console.error("Socket encountered error: ", err, "Closing socket");
    ws.close();
  };
};

ws.onopen = () => {
  console.log("connected websocket main component");
  timeout = 250;
  clearTimeout(connectInterval);
};

function checkWebsocketConnection(){
  if (!ws || ws.readyState === WebSocket.CLOSED) connect();
};

export default ws;
