const auth = require("./v1/auth");
const employees = require("./v1/employees");
const orders = require("./v1/orders");
const products = require("./v1/products");
const profile = require("./v1/profile");
const tickets = require("./v1/tickets");
const admin = require("./v1/admin")
const cart = require("./v1/cart");
const product_request = require("./v1/product_request")

module.exports = (app) => {
  app.use("/v1/auth", auth);
  app.use("/v1/employees", employees);
  app.use("/v1/orders", orders);
  app.use("/v1/products", products);
  app.use("/v1/profile", profile);
  app.use("/v1/tickets", tickets);
  app.use("/v1/admin",admin);
  app.use("/v1/cart", cart);
  app.use("/v1/productrequest/",product_request)
};
