import React, { useState } from "react";
import { ethers } from "ethers";
import { Typography } from "antd";
import { useHistory } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { HD_PATH, MIN_PASSWORD_LENGTH } from "constants/wallet";
import { useAuthState } from "store/auth/state";
const { Title } = Typography;

const Signup = () => {
  const [isLoading, setLoading] = useState(false);
  const { setKeyStore, setIsAuthenticated } = useAuthState();
  const [form, setForm] = useState({
    step: 1,
    seed: "",
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    password: "",
    checkPassword: "",
  });
  const history = useHistory();

  async function saveKeyStore() {
    setLoading(true);

    if (ethers.utils.isValidMnemonic(form.seed)) {
      try {
        const wallet = ethers.Wallet.fromMnemonic(form.seed);
        const encryptedJSON = await wallet.encrypt(form.password, {
          path: HD_PATH,
        });
        setIsAuthenticated(true);
        setKeyStore(encryptedJSON);
        history.push("/wallet");
        return;
      } catch (err) {
        setLoading(false);
      }
    }
  }

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
      <Title style={{ textAlign: "center", marginBottom: "12px" }} level={3}>
        Signup
      </Title>
      {form.step === 1 && (
        <Step1
          form={form}
          changeForm={changeForm}
          changeCheckBox={changeCheckBox}
          goNextStep={goNextStep}
        />
      )}
      {form.step === 2 && (
        <Step2 form={form} changeForm={changeForm} goNextStep={goNextStep} />
      )}
      {form.step === 3 && (
        <Step3
          form={form}
          changeForm={changeForm}
          minCharacters={MIN_PASSWORD_LENGTH}
          saveKeyStore={saveKeyStore}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Signup;
