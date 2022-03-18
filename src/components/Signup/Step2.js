import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";
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
};

const Step2 = ({ form }) => {
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

  return (
    <div>
      <Card
        style={styles.card}
        title={
          <>
            <div>
              <Text strong>Confirm your SEED</Text>
            </div>
            <Text style={{ color: "red" }} strong>
              Make sure to put the SECRET SEED in the correct order.
            </Text>
            <Card style={{ fontWeight: "bold", textAlign: "center" }}>
              {shuffledSeed.map((word) => {
                return (
                  <div onClick={() => handleSelectWord(word)} key={word}>
                    {word}
                  </div>
                );
              })}
            </Card>
            <Card style={{ fontWeight: "bold", textAlign: "center" }}>
              {selectedSeed.map((word) => {
                return (
                  <div onClick={() => handleDeselectWord(word)} key={word}>
                    {word}
                  </div>
                );
              })}
            </Card>
          </>
        }
      ></Card>
    </div>
  );
};

export default Step2;
