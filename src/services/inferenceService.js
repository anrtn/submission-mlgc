const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  // Jika gambar hanya memiliki satu channel (grayscale), ubah ke RGB
  if (tensor.shape[2] === 1) {
    tensor = tensor.expandDims(-1).tile([1, 1, 1, 3]); // Menambahkan dua channel untuk mengubah gambar menjadi RGB
  }

  // Periksa shape tensor setelah konversi
  console.log(tensor.shape); // Pastikan tensor berukuran [1, 224, 224, 3]

  const prediction = model.predict(tensor);
  const score = await prediction.data();
  const confidenceScore = Math.max(...score) * 100;

  const classes = ["Cancer"];

  const classResult = tf.argMax(prediction, 1).dataSync()[0];
  let label = classes[classResult]; // Ganti dari const ke let

  let explanation, suggestion;

  // Tentukan ambang batas confidenceScore untuk mendeteksi kanker
  const threshold = 50;

  if (confidenceScore < threshold) {
    // Jika confidence score rendah, kita anggap sebagai non-cancer
    label = "Non-cancer";
    explanation = "Penyakit kanker tidak terdeteksi.";
    suggestion = "Penyakit kanker tidak terdeteksi.";
  } else if (label === "Cancer") {
    explanation = "Terdeteksi kanker, segera periksa ke dokter.";
    suggestion = "Segera periksa ke dokter!";
  }

  return { confidenceScore, label, explanation, suggestion };
}

module.exports = predictClassification;
