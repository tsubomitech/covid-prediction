import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AppBar,
  Tab,
  Box,
  Typography,
  Tabs,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ResultsTabs(props) {
  const [tab, setTab] = useState(0);
  return (
    <div style={{marginTop: "10px"}}>
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          aria-label="simple tabs example"
        >
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="API Response" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <ResultsTable rows={props.rows} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <pre>{props.payload}</pre>
      </TabPanel>
    </div>
  );
}

function ResultsTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow color="primary" style={{ backgroundColor: "black" }}>
            <TableCell
              style={{ color: "white", fontWeight: "bold" }}
              align="left"
            >
              Model
            </TableCell>
            <TableCell
              style={{ color: "white", fontWeight: "bold" }}
              align="left"
            >
              Chance of survival
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.chance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default function Results(props) {
  let rows = []
  try {
    const modelResults = JSON.parse(props.payload);
    rows = modelResults.map((m) => ({
      name: m.model,
      chance: `${(m.results["probability1"] * 100).toFixed(2)} %`,
    }));
  } catch (e) {
    console.error("ERR - could not parse json")
  }

  return (
    <ResultsTabs rows={rows} payload={props.payload} />
  );
}

Results.defaultProps = {
  payload: "",
};
