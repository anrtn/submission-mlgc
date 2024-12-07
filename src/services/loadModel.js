const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
  const modelUrl = process.env.MODEL_URL;

  if (!modelUrl) {
    throw new Error(
      "Model URL not provided. Please set the MODEL_URL environment variable."
    );
  }

  try {
    return await tf.loadGraphModel(modelUrl);
  } catch (error) {
    console.error("Error loading model:", error);
    throw error;
  }
}

module.exports = loadModel;
