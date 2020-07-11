import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Stocks from "./components/stocks/stocks.components";
var ws = new WebSocket("ws://stocks.mnet.website");
var connectInterval;
var timeout = null;
const connect = () => {
  var ws = new WebSocket("ws://stocks.mnet.website");
  var connectInterval;

  // websocket onopen event listener
  ws.onopen = () => {
    console.log("connected websocket main component");

    timeout = 250; // reset timer to 250 on open of websocket connection
    clearTimeout(connectInterval); // clear Interval on on open of websocket connection
  };

  // websocket onclose event listener
  ws.onclose = (e) => {
    console.log(
      `Socket is closed. Reconnect will be attempted in ${Math.min(
        10000 / 1000,
        (timeout + timeout) / 1000
      )} second.`,
      e.reason
    );

    timeout = timeout + timeout; //increment retry interval
    connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
  };

  // websocket onerror event listener
  ws.onerror = (err) => {
    console.error("Socket encountered error: ", err, "Closing socket");

    ws.close();
  };
};
// websocket onopen event listener
ws.onopen = () => {
  console.log("connected websocket main component");

  // setWs({ ws: ws });

  timeout = 250; // reset timer to 250 on open of websocket connection
  clearTimeout(connectInterval); // clear Interval on on open of websocket connection
};

const check = () => {
  if (!ws || ws.readyState === WebSocket.CLOSED) connect(); //check if websocket instance is closed, if so call `connect` function.
};



function App() {
  // const [ws, setWs] = React.useState(null);
  const [stocks, setStocks] = React.useState({});
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  React.useEffect(() => {
    ws.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      // this.setState({dataFromServer: message})
      // console.log(message)
      const obj = {};
      console.log(obj);
      for (const mes of message) {
        obj[mes[0]] = mes[1];
      }
      // const ret = {...stocks,...obj}
      // console.log(ret)
      // console.log(stocks);
      console.log(obj);
      // pars();
      setStocks((prevStocks) => ({ ...prevStocks, ...obj }));
    };
    return () => {
      ws.close();
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#303030",
        }}
      > 
      <Stocks stocks={stocks} />
        
      </div>
    </ThemeProvider>
  );
}

export default App;
