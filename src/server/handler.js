const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");
const storeData = require("../services/storeData"); // Import fungsi storeData

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  try {
    const { confidenceScore, label, explanation, suggestion } =
      await predictClassification(model, image);

    const id = crypto.randomUUID(); // Generate unique ID
    const createdAt = new Date().toISOString(); // Generate timestamp

    // Tentukan hasil dan saran berdasarkan label prediksi
    const result = label === "Cancer" ? "Cancer" : "Non-cancer";
    const responseSuggestion =
      label === "Cancer" ? "Segera periksa ke dokter!" : suggestion;

    const data = {
      id: id,
      result: result,
      suggestion: responseSuggestion,
      createdAt: createdAt,
    };

    // Pengecekan ukuran file
    if (image.bytes > 1000000) {
      return h
        .response({
          status: "fail",
          message:
            "Payload content length greater than maximum allowed: 1000000",
        })
        .code(413);
    }

    // Simpan data ke Firestore terlebih dahulu
    await storeData(id, data); // Menyimpan data ke Firestore sebelum membuat response

    // Buat respons sukses setelah data disimpan
    const response = h.response({
      status: "success",
      message: "Model is predicted successfully",
      data,
    });

    response.code(201); // Status code 201 untuk data berhasil dibuat
    return response;
  } catch (error) {
    // Tangani kesalahan prediksi atau penyimpanan data
    console.error("Error while predicting or storing data:", error.message); // Log error untuk debugging
    return h
      .response({
        status: "fail",
        message:
          "Terjadi kesalahan dalam melakukan prediksi atau menyimpan data",
      })
      .code(400); // Status code 400 untuk error input atau prediksi
  }
}

module.exports = postPredictHandler;
