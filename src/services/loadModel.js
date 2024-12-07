const tf = require("@tensorflow/tfjs-node");
const modelUrl = process.env.MODEL_URL;

if (!modelUrl) {
  console.error("MODEL_URL environment variable is not set.");
  throw new Error(
    "Model URL not provided. Please set the MODEL_URL environment variable."
  );
} else {
  console.log("MODEL_URL:", modelUrl);
}

async function loadModel() {
  try {
    return await tf.loadGraphModel(modelUrl);
  } catch (error) {
    console.error("Error loading model:", error);
    throw error;
  }
}
module.exports = loadModel;
