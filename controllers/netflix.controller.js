const db = require("../models");
const Netflix = db.getModel("Netflix");
const Categoria = db.getModel("Categoria");
const { Op } = db.Sequelize;

class NetflixController {
    async create(req, res) {
        const { nombre, id_categoria, actores, duracion_min, tipo, anio_lanzamiento } = req.body;
        if (!nombre || !id_categoria || !actores || !duracion_min || !tipo || !anio_lanzamiento) {
            return res.status(400).send({ message: "Faltan campos obligatorios." });
        }
        try {
            const existe = await Categoria.findOne({ where: { id_categoria } });
            if (!existe) {
                return res.status(400).send({
                    message: "No se ha encontrado una categoria relacionada"
                });
            }
            const netflix = { nombre, id_categoria, actores, duracion_min, tipo, anio_lanzamiento };
            const data = await Netflix.create(netflix);
            res.status(201).send({
                message: "Netflix creado con éxito.",
                data
            });
        } catch (err) {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el registro."
            });
        }
    }

    async findAll(req, res) {
        const nombre = req.query.nombre;
        const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : undefined;
        try {
            const data = await Netflix.findAll({ where: condition });
            res.send(data);
        } catch (err) {
            res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los catalogos."
            });
        }
    }

    async findOne(req, res) {
        const id = req.params.id;
        try {
            const data = await Netflix.findByPk(id);
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `Catalogos con id=${id} no encontrada.` });
            }
        } catch (err) {
            res.status(500).send({
                message: "Error al obtener los catalogos con id=" + id
            });
        }
    }
    async findByNombre(req, res) {
        const nombre = req.params.nombre;
        try {
            const data = await Netflix.findOne({ where: { nombre } });
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `Catalogo con nombre=${nombre} no encontrada.` });
            }
        } catch (err) {
            res.status(500).send({
                message: "Error al obtener el catalogo con nombre=" + nombre
            });
        }
    }
    async update(req, res) {
        const id = req.params.id;
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).send({ message: "El campo 'nombre' es obligatorio para actualizar." });
        }
        try {
            const [updated] = await Netflix.update({ nombre }, { where: { id } });
            if (updated === 1) {
                res.send({ message: "Catalogo actualizado exitosamente." });
            } else {
                res.status(404).send({
                    message: `No se pudo actualizar el catalogo con id=${id}. Puede que no exista o que la solicitud esté vacía.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "Error al actualizar el catalogo con id=" + id
            });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            const deleted = await Netflix.destroy({ where: { id } });
            if (deleted === 1) {
                res.send({ message: "Catalogo eliminada exitosamente." });
            } else {
                res.status(404).send({
                    message: `No se pudo eliminar el catalogo con id=${id}. No encontrada.`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: "No se pudo eliminar el catalogo con id=" + id
            });
        }
    }
}
module.exports = NetflixController;
