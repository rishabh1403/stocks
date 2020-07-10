import React from "react";
import "./App.css";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import moment from "moment";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
function Stock({ name, price }) {
  const [color, setColor] = React.useState("white");
  const [lastUpdate, setLastUpdate] = React.useState(new Date());
  const [history, setHistory] = React.useState([]);
  const prevPrice: number = usePrevious(price);
  React.useEffect(() => {
    if (prevPrice) {
      if (prevPrice < price) {
        setColor("#388e3c");
      } else {
        setColor("#d32f2f");
      }
    }
    setHistory((h) => [...h, price]);
    setLastUpdate(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell style={{color: color}} color="error">{price.toFixed(2)}</TableCell>
      <TableCell>{moment(lastUpdate).fromNow()}</TableCell>
      <TableCell>
        <Sparklines data={history} limit={20}>
          <SparklinesLine color="#1c8cdc" />
          <SparklinesSpots />
        </Sparklines>
      </TableCell>
    </TableRow>
  );
  // return (
  //   <div style={{ color: color }}>
  //     name: {name}&nbsp;
  //     price : {price}&nbsp;
  //     last updates: {moment(lastUpdate).fromNow()} &nbsp;
  //     <div style={{ width: "200px", display:"inline-block" }}>
  //       <Sparklines data={history} limit={20}>
  //         <SparklinesLine color="#1c8cdc" />
  //         <SparklinesSpots />
  //       </Sparklines>
  //     </div>
  //   </div>
  // );
}

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
        <Paper>
          {/* {Object.keys(stocks).map((s, i) => {
          return <Stock name={s} key={i} price={stocks[s]} />;
        })} */}
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>History</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(stocks).map((s, i) => {
                  return <Stock name={s} key={i} price={stocks[s]} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default App;
