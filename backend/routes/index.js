const paymentApi = require("./Payments");
const configureRoutes = (app) => {
    paymentApi(app);
};
module.exports = configureRoutes;
