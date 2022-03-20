import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "antd";
import { shuffle } from "utils/shuffle";

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    marginBottom: "30px",
    borderRadius: "0.5rem",
  },
  seedBox: {
    width: "100%",
    margin: "0px",
    display: "flex",
    flexFlow: "row wrap",
  },
  cardBox: {
    minWidth: "12.66%",
    textAlign: "center",
    margin: "2%",
    padding: "0px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cardBoxSelected: {
    color: "#f1f1f1",
    backgroundColor: "#0860f2",
  },
  cardBoxBody: {
    padding: "5px",
  },
};

const Step2 = ({ form, goNextStep }) => {
  const [shuffledSeed, setShuffledSeed] = useState([]);
  const [selectedSeed, setSelectedSeed] = useState([]);

  useEffect(() => {
    if (form.seed) setShuffledSeed(shuffle(form.seed.split(" ")));
  }, [form.seed]);

  function removeWord(array, word) {
    return array.filter((w) => w !== word);
  }

  function handleSelectWord(word) {
    setSelectedSeed((current) => {
      return [...current, word];
    });
    setShuffledSeed((current) => {
      return removeWord(current, word);
    });
  }

  function handleDeselectWord(word) {
    setShuffledSeed((current) => {
      return [...current, word];
    });
    setSelectedSeed((current) => {
      return removeWord(current, word);
    });
  }

  function validateSeed() {
    return form.seed === selectedSeed.join(" ");
  }

  function checkSeedToNextStep() {
    if (validateSeed()) goNextStep();
  }

  const invalidSeed = !validateSeed();

  return (
    <Card
      style={styles.card}
      title={
        <center>
          <Text strong>Confirm your SEED</Text>
        </center>
      }
    >
      <center>
        <Text>Make sure to put the secret seed in the correct order.</Text>
      </center>
      <Card bodyStyle={styles.seedBox}>
        {shuffledSeed.map((word) => {
          return (
            <Card
              bodyStyle={styles.cardBoxBody}
              style={styles.cardBox}
              onClick={() => handleSelectWord(word)}
              key={word}
            >
              {word}
            </Card>
          );
        })}
      </Card>
      <Card bodyStyle={styles.seedBox}>
        {selectedSeed.map((word) => {
          return (
            <Card
              bodyStyle={styles.cardBoxBody}
              style={{
                ...styles.cardBox,
                ...styles.cardBoxSelected,
              }}
              onClick={() => handleDeselectWord(word)}
              key={word}
            >
              {word}
            </Card>
          );
        })}
      </Card>
      <center style={{ marginTop: "10px" }}>
        <Button
          disabled={invalidSeed}
          type="primary"
          onClick={checkSeedToNextStep}
        >
          Confirm
        </Button>
      </center>
    </Card>
  );
};

export default Step2;
