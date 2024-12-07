const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
  const modelUrl = process.env.MODEL_URL;

  if (!modelUrl) {
    throw new Error(
      "Model URL not provided. Please set the MODEL_URL environment variable."
    );
  }

  try {
    const startTime = Date.now();
    const model = await tf.loadGraphModel(modelUrl);
    console.log(`Model loaded in ${(Date.now() - startTime) / 1000} seconds`);
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
    throw error;
  }
}

module.exports = loadModel;
