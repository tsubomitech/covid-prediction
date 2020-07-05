import { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import {
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  Button,
  Chip,
  Input,
  TextField,
} from "@material-ui/core";
import Layout from "../components/layout";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const API_URL = "/api";
// {"map": 55.3, "ldh": 340, "charlson_with_Age": 9, "pulseOx": 92, "egfr": 63, "troponin": 0.01, "ddimerIni": 1.24, "rr": 22, "mcv": 93.5, "calcium": 5.2}

async function getModels() {}

export default function Try() {
  const [formFields, setFormFields] = useState({
    map: 55.3,
    ldh: 340,
    charlson_with_Age: 9,
    pulseOx: 92,
    egfr: 63,
    troponin: 0.01,
    ddimerIni: 1.24,
    rr: 22,
    mcv: 93.5,
    calcium: 5.2,
  });

  const [models, setModels] = useState({
    list: [],
    selected: ["GLM_1_AutoML_20200608_155614"],
  });

  const fetchModels = async () => {
    const res = await fetch(API_URL, { method: "GET" });
    const json = await res.json();
    if (json.type === "success") {
      setModels({ ...models, list: json.message });
    } else {
      console.error(json);
    }
  }

  useEffect(() => {
    fetchModels();
  }, []);

  const [response, setResponse] = useState({
    type: "success",
    message: "Click submit to get some probabilities...",
  });

  const handleChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promises = await Promise.all(
        models.selected.map((model) =>
          fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(formFields),
            headers: {
              "Content-Type": "application/json",
              "X-Model": model,
            },
          })
        )
      );

      const responses = [];
      for (let i = 0; i < promises.length; i++) {
        const json = await promises[i].json();
        if (json.type === "success") {
          responses.push({model: models.selected[i], results: json.message});
        } else {
          setResponse({
            type: "error",
            message: JSON.stringify(json),
          });
        }
      }
      setResponse({ type: "success", message: JSON.stringify(responses, null, 2) });
    } catch (e) {
      console.log("An error occurred", e);
      setResponse({
        type: "error",
        message: "An error occured while submitting the form",
      });
    }
  };

  let output = null;
  if (response.type === "error") {
    output = <div style={{ color: "red" }}>{response.message}</div>;
  } else {
    output = <div style={{ color: "green" }}><pre>{response.message}</pre></div>;
  }
  const classes = useStyles();
  return (
    <Layout>
      <h1>Try</h1>
      <form action="{API_URL}" method="post" onSubmit={handleSubmit}>
        <fieldset id="forms__input">
          <legend>input parameters</legend>
          {/* <p>
            <label for="input__text">Name</label>
            <input
              id="input__text"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </p> */}

          {Object.keys(formFields).map((f) => (
            <TextField
              key={f}
              id={"input__" + f}
              name={f}
              label={f}
              type="number"
              step="0.01"
              value={formFields[f]}
              onChange={handleChange}
              style={{ margin: "5px" }}
              // helperText="Enter a number"
              required
            />
          ))}
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="models-label">Models</InputLabel>
            <Select
              labelId="models-label"
              id="models-chip"
              multiple
              value={models.selected}
              onChange={(e) =>
                setModels({ ...models, selected: e.target.value })
              }
              input={<Input id="select-multiple-models" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {models.selected.map((value) => (
                    <Chip
                      key={"chip__" + value}
                      label={value}
                      className={classes.chip}
                    />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {models.list.map((model) => (
                <MenuItem key={"item__" + model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Button type="submit">Submit</Button>
          <div>{output}</div>
        </fieldset>
      </form>
    </Layout>
  );
}
