const { DataTypes } = require("sequelize");

module.exports = (db, modelName, options) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      name: DataTypes.TEXT,
      size: DataTypes.FLOAT,
      mimetype: DataTypes.TEXT,
      md5: DataTypes.TEXT,
      path: DataTypes.TEXT,
    },
    options
  );

  model.associate = (models) => {
    model.hasOne(models.Dictionary, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    });
  };

  return model;
};
