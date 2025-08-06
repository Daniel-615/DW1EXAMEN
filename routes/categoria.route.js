const express = require("express");
const CategoriaController = require("../controllers/categoria.controller.js");

class NetflixRoutes {
  constructor(app) {
    this.router = express.Router();
    this.controller = new CategoriaController();
    this.registerRoutes();
    app.use("/api/categoria", this.router);
  }

  registerRoutes() {
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.get("/", this.controller.findAll.bind(this.controller));
    this.router.get("/:id/", this.controller.findOne.bind(this.controller));
    this.router.put("/:id/", this.controller.update.bind(this.controller));
    this.router.delete("/:id/", this.controller.delete.bind(this.controller));
  }
}

module.exports = NetflixRoutes;
