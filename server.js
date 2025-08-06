const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;

    this.configureMiddlewares();
    this.configureRoutes();
    this.connectDatabase();
  }

  configureMiddlewares() {
    const corsOptions = {
      origin: "http://localhost:8081"
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  configureRoutes() {
    this.app.get("/", (req, res) => {
      res.json({ message: "UMG Web Application" });
    });

    //aqui colocar rutas
  } 

  async connectDatabase() {
    try {
      await db.sequelize.sync();
      console.log("Base de datos sincronizada correctamente.");
    } catch (error) {
      console.error("Error al sincronizar la base de datos:", error);
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
