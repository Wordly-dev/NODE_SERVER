const { DataTypes } = require("sequelize");

module.exports = (db, modelName, options) => {
  const model = db.define(
    modelName,
    {
      padding: DataTypes.INTEGER,
    },
    options
  );

  model.associate = (models) => {
    model.belongsTo(models.Dictionary, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    });
  };

  return model;
};
