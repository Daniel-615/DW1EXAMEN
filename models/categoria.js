const { DataTypes, Model } = require("sequelize");
class Categoria extends Model{
};
module.exports=(sequelize)=>{
    Categoria.init(
        {
            id_categoria:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre:{
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: 'Categoria',
            tableName: 'Categorias',
            timestamps: false
        }
    );
    return Categoria;
}