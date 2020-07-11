import React, { FunctionComponent } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Stock from "../stock/stock.component";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#673ab7",
  },
  appbar: {
    backgroundColor: "#673ab7",
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface IStocks {
  stocks: {
    string?: string;
  };
}
const Stocks: FunctionComponent<IStocks> = ({ stocks }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Stocks
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper style={{ maxWidth: "900px", margin: "auto" }}>
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
              {Object.keys(stocks).map((stock, idx) => {
                return <Stock name={stock} key={idx} price={stocks[stock]} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Stocks;
