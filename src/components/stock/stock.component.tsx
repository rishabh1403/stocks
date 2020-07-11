import React, { FunctionComponent } from "react";
import moment from "moment";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function usePrevious(value: number) {
  const ref: any = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface IStock {
  name: string;
  price: number;
}

const Stock: FunctionComponent<IStock> = ({ name, price }) => {
  const [color, setColor] = React.useState<string>("white");
  const [lastUpdate, setLastUpdate] = React.useState<Date>(new Date());
  const [history, setHistory] = React.useState<number[]>([]);
  const prevPrice: number = usePrevious(price);

  React.useEffect(() => {
    if (prevPrice) {
      if (prevPrice < price) {
        setColor("#388e3c");
      } else {
        setColor("#d32f2f");
      }
    }
    setHistory((oldPrice) => [...oldPrice, price]);
    setLastUpdate(new Date());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell style={{ color: color }} color="error">
        {price.toFixed(2)}
      </TableCell>
      <TableCell>{moment(lastUpdate).fromNow()}</TableCell>
      <TableCell>
        <Sparklines data={history} limit={20}>
          <SparklinesLine color="#1c8cdc" />
          <SparklinesSpots />
        </Sparklines>
      </TableCell>
    </TableRow>
  );
};

export default Stock;
