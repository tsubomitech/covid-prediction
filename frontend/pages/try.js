import Layout from "../components/layout";
import { useState } from "react";

const API_URL = "/api";
// {"map": 55.3, "ldh": 340, "charlson_with_Age": 9, "pulseOx": 92, "egfr": 63, "troponin": 0.01, "ddimerIni": 1.24, "rr": 22, "mcv": 93.5, "calcium": 5.2}
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

  const [response, setResponse] = useState({
    type: "success",
    message: "Click submit to get some probabilities...",
  });

  const handleChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(formFields),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();
      if (json.type === "success") {
        setResponse({
          type: "success",
          message: JSON.stringify(json.message),
        });
      } else {
        setResponse({
          type: "error",
          message: JSON.stringify(json),
        });
      }
    } catch (e) {
      console.log("An error occurred", e);
      setResponse({
        type: "error",
        message: "An error occured while submitting the form",
      });
    }
  };

  let output = null
  if (response.type === "error") {
    output = <p style={{color: "red"}}>{response.message}</p>;
  } else {
    output = <p style={{color: "green"}}>{response.message}</p>;
  }

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
            <p key={f}>
              <label htmlFor={"input__" + f}>{f}</label>
              <input
                id={"input__" + f}
                name={f}
                type="number"
                step="0.01"
                value={formFields[f]}
                placeholder="Enter a number"
                onChange={handleChange}
                required
              />
            </p>
          ))}
          <p>
            <button type="submit">Submit</button>
            {/* <button type="reset">Clear</button> */}
            {/* <button type="button" disabled="">
              &lt;button disabled&gt;
            </button> */}
          </p>
          <div>
            {output}
          </div>
        </fieldset>
      </form>
    </Layout>
  );
}
