import * as toxicity from "@tensorflow-models/toxicity";
import { useEffect, useState } from "react";
const ToxicityDetector = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await toxicity.load();
      console.log(model);
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const getToxicityScore = async (text) => {
    if (!model) {
      return null;
    }
    const predictions = await model.classify(text);

    console.log(predictions);
    const scores = {};
    predictions.forEach((prediction) => {
      scores[prediction.label] = prediction.results[0].match;
    });
    //console.log(scores);
    return scores;
  };

  return { getToxicityScore };
};

export default ToxicityDetector;
