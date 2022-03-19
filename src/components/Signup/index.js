import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Signup = () => {
  const [form, setForm] = useState({
    step: 1,
    seed: "",
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    password: "",
    checkPassword: "",
  });

  const minCharacters = 6;

  function changeForm(field, newValue) {
    setForm((current) => {
      return {
        ...current,
        [field]: newValue,
      };
    });
  }

  function changeCheckBox(name, e) {
    changeForm(name, e.target.checked);
  }

  function goNextStep() {
    changeForm("step", form.step + 1);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>Signup</h1>
      {form.step === 1 && (
        <Step1
          form={form}
          changeForm={changeForm}
          changeCheckBox={changeCheckBox}
          goNextStep={goNextStep}
        />
      )}
      {form.step === 2 && (
        <Step2
          form={form}
          changeForm={changeForm}
          changeCheckBox={changeCheckBox}
          goNextStep={goNextStep}
        />
      )}
      {form.step === 3 && (
        <Step3
          form={form}
          changeForm={changeForm}
          changeCheckBox={changeCheckBox}
          goNextStep={goNextStep}
          minCharacters={minCharacters}
        />
      )}
    </div>
  );
};

export default withRouter(Signup);
