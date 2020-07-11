import React, { FunctionComponent } from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Stocks from "./components/stocks/stocks.components";
import ws from "./utils/socket";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles({
  div: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#303030",
  },
});

const App: FunctionComponent = () => {
  const classes = useStyles();
  const [stocks, setStocks] = React.useState<{ string?: string }>({});

  React.useEffect(() => {
    ws.onmessage = (evt) => {
      const messages = JSON.parse(evt.data);
      const currentStocks = {};
      for (const message of messages) {
        currentStocks[message[0]] = message[1];
      }
      setStocks((prevStocks) => ({ ...prevStocks, ...currentStocks }));
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.div}>
        <Stocks stocks={stocks} />
      </div>
    </ThemeProvider>
  );
};

export default App;
