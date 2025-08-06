const { DataTypes,Model} = require("sequelize");

class Netflix extends Model{
};
module.exports=(sequelize)=>{
    Netflix.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            id_categoria: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            actores: {
                type: DataTypes.STRING,
                allowNull: false
            },
            duracion_min: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            anio_lanzamiento: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Netflix',
            tableName: 'Netflixs',
            timestamps: false
        }
    );
    return Netflix;
}