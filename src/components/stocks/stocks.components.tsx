import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Stock from "../stock/stock.component";

export default function Stocks({ stocks }) {
  return (
    <Paper>
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
  );
}
