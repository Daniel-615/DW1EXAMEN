const db = require("../models");
const Categoria = db.getModel("Categoria");
const { Op } = db.Sequelize;

class CategoriaController {
  async create(req, res) {
    if ( !req.body.nombre) {
      return res.status(400).send({ message: "Faltan campos obligatorios." });
    }

    const categoria = {
      nombre: req.body.nombre
    };

    try {
      const data = await Categoria.create(categoria);
      res.status(201).send({
        message: "Categoria creada con éxito.",
        data  
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la categoria."
      });
    }
  }

  async findAll(req, res) {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    try {
      const data = await Categoria.findAll({ where: condition });
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Ocurrió un error al obtener las categorias."
      });
    }
  }

  async findOne(req, res) {
    const id_categoria = req.params.id;

    try {
      const data = await Categoria.findByPk(id_categoria);
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Categoria con id=${id_categoria} no encontrado.` });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error al obtener el Categoria con id=" + id_categoria
      });
    }
  }

  async update(req, res) {
    const id_categoria = req.params.id;
    const nombre= req.body.nombre;
    try {
      const [updated] = await Categoria.update({nombre}, { where: { id_categoria } });

      if (updated === 1) {
        res.send({ message: "Categoria actualizado exitosamente." });
      } else {
        res.send({
          message: `No se pudo actualizar la categoria con id=${id_categoria}. Puede que no exista o que la solicitud esté vacía.`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error al actualizar la categoria con id=" + id_categoria
      });
    }
  }

  async delete(req, res) {
    const id_categoria = req.params.id;

    try {
      const deleted = await Categoria.destroy({ where: { id_categoria } });

      if (deleted === 1) {
        res.send({ message: "Categoria eliminado exitosamente." });
      } else {
        res.send({
          message: `No se pudo eliminar la Categoria con id=${id_categoria}. No encontrado.`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "No se pudo eliminar la categoria con id=" + id_categoria
      });
    }
  }
}

module.exports = CategoriaController;
