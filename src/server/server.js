require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
const loadModel = require("../services/loadModel");

(async () => {
  const server = Hapi.server({
    port: 8080,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);

  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    // Jika response adalah error (Boom)
    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });

      // Pastikan kode status adalah integer (gunakan statusCode dari Boom error)
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    // Jika bukan Boom, lanjutkan
    return h.continue;
  });

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();