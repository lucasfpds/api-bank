require("dotenv").config();
const app = require("./servidor");
const swaggerUi = require("swagger-ui-express");
console.log(process.env.PORT);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(require("../swagger.json")));
app.listen(process.env.PORT);
