const app = require("./src/servidor");
const swaggerUi = require("swagger-ui-express");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("./swagger.json")));
app.listen(process.env.PORT);
