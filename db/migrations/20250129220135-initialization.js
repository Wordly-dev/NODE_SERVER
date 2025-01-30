const Sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          "User",
          {
            id: {
              type: Sequelize.INTEGER,
              field: "id",
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
            },
            caption: { type: Sequelize.TEXT, field: "caption" },
            description: { type: Sequelize.TEXT, field: "description" },
            login: { type: Sequelize.STRING, field: "login" },
            password: { type: Sequelize.STRING, field: "password" },
            isAdmin: {
              type: Sequelize.BOOLEAN,
              field: "isAdmin",
              defaultValue: false,
            },
            isSuperAdmin: {
              type: Sequelize.BOOLEAN,
              field: "isSuperAdmin",
              defaultValue: false,
            },
            createdAt: {
              type: Sequelize.DATE,
              field: "createdAt",
              allowNull: false,
            },
            updatedAt: {
              type: Sequelize.DATE,
              field: "updatedAt",
              allowNull: false,
            },
            deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          "File",
          {
            id: {
              type: Sequelize.INTEGER,
              field: "id",
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
            },
            caption: { type: Sequelize.TEXT, field: "caption" },
            description: { type: Sequelize.TEXT, field: "description" },
            name: { type: Sequelize.TEXT, field: "name" },
            size: { type: Sequelize.FLOAT, field: "size" },
            mimetype: { type: Sequelize.TEXT, field: "mimetype" },
            md5: { type: Sequelize.TEXT, field: "md5" },
            path: { type: Sequelize.TEXT, field: "path" },
            createdAt: {
              type: Sequelize.DATE,
              field: "createdAt",
              allowNull: false,
            },
            updatedAt: {
              type: Sequelize.DATE,
              field: "updatedAt",
              allowNull: false,
            },
            deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          "Dictionary",
          {
            id: {
              type: Sequelize.INTEGER,
              field: "id",
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
            },
            caption: { type: Sequelize.TEXT, field: "caption" },
            description: { type: Sequelize.TEXT, field: "description" },
            createdAt: {
              type: Sequelize.DATE,
              field: "createdAt",
              allowNull: false,
            },
            updatedAt: {
              type: Sequelize.DATE,
              field: "updatedAt",
              allowNull: false,
            },
            deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
            userId: {
              type: Sequelize.INTEGER,
              field: "UserId",
              onUpdate: "NO ACTION",
              onDelete: "NO ACTION",
              references: { model: "User", key: "id" },
              allowNull: true,
            },
            fileId: {
              type: Sequelize.INTEGER,
              field: "FileId",
              onUpdate: "NO ACTION",
              onDelete: "NO ACTION",
              references: { model: "File", key: "id" },
              allowNull: true,
            },
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          "Word",
          {
            id: {
              type: Sequelize.INTEGER,
              field: "id",
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
            },
            caption: { type: Sequelize.TEXT, field: "caption" },
            description: { type: Sequelize.TEXT, field: "description" },
            createdAt: {
              type: Sequelize.DATE,
              field: "createdAt",
              allowNull: false,
            },
            updatedAt: {
              type: Sequelize.DATE,
              field: "updatedAt",
              allowNull: false,
            },
            deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
            dictionaryId: {
              type: Sequelize.INTEGER,
              field: "DictionaryId",
              onUpdate: "NO ACTION",
              onDelete: "NO ACTION",
              references: { model: "Dictionary", key: "id" },
              allowNull: true,
            },
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          "DictionarySettings",
          {
            id: {
              type: Sequelize.INTEGER,
              field: "id",
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
            },
            padding: { type: Sequelize.INTEGER, field: "padding" },
            createdAt: {
              type: Sequelize.DATE,
              field: "createdAt",
              allowNull: false,
            },
            updatedAt: {
              type: Sequelize.DATE,
              field: "updatedAt",
              allowNull: false,
            },
            deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
            dictionaryId: {
              type: Sequelize.INTEGER,
              field: "DictionaryId",
              onUpdate: "NO ACTION",
              onDelete: "NO ACTION",
              references: { model: "Dictionary", key: "id" },
              allowNull: true,
              Dictionary,
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("User", {
          transaction: t,
        }),
        queryInterface.dropTable("Dictionary", {
          transaction: t,
        }),
        queryInterface.dropTable("Word", {
          transaction: t,
        }),
        queryInterface.dropTable("DictionarySettings", { transaction: t }),
        queryInterface.dropTable("File", { transaction: t }),
      ]);
    });
  },
};
