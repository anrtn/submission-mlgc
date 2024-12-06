const { Firestore } = require("@google-cloud/firestore");

const firestore = new Firestore();

async function getPredictionHistory(request, h) {
  try {
    const snapshot = await firestore.collection("predictions").get();
    const predictions = [];
    snapshot.forEach((doc) => {
      predictions.push({ id: doc.id, history: doc.data() });
    });
    return h.response({ status: "success", data: predictions });
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan dalam mengambil data",
      })
      .code(500); // Gunakan status code 500 untuk kesalahan server
  }
}

module.exports = getPredictionHistory;
