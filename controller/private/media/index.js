const models = require("@models");
const { checkFields, createPath, createFile } = require("@utils");

const postMedia = (req, res) => {
  const { id } = req.body;
  models.media.findOne({ where: { id: req.mediaId ?? id } }).defAnswer(res);
};

const deleteMedia = (req, res) => {
  const { id } = req.query;

  if (req?.userData.isAdmin || req?.userData.isSuperAdmin)
    models.media.destroy({ where: { id } }).then(() => res.send("DELETED"));
  else {
    throw new Error("YOU AREN'T AN ADMIN BRO");
  }
};

module.exports = {
  loadController: (router) => {
    router.post("/", createFile, postMedia);
    router.delete("/", checkFields(["id"]), deleteMedia);
  },
  postMedia,
  deleteMedia,
};
