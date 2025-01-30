const models = require("@models");
const { checkFields, excludeFields, defInclude } = require("@utils");

const postWord = (req, res) => {
  const data = req.body;
  models.word.create(data).defAnswer(res);
};

const putWord = (req, res) => {
  const { id } = req.query;
  const data = req.body;

  models.word.update(data, { where: { id } }).then((data) => res.send(data));
};

const deleteWord = (req, res) => {
  const { id } = req.query;

  if (id && (req?.userData.isAdmin || req?.userData.isSuperAdmin))
    models.word.destroy({ where: { id } }).then(() => res.send("DELETED"));
  else {
    throw new Error("error");
  }
};

const importWord = (req, res) => {
  const { id, dictionaryId } = req.body;

  models.word
    .findOne({ where: { id } })
    .then((word) => {
      const { id, ...other } = word.toJSON();
      return models.word.create({ ...other, dictionaryId });
    })
    .defAnswer(res);
};

module.exports = {
  loadController: (router) => {
    router.post(
      "/",
      checkFields(excludeFields(defInclude(), ["id"]), "body"),
      postWord
    );
    router.post("/import", checkFields(["id"], "body"), importWord),
      router.put(
        "/",
        checkFields(excludeFields(defInclude(), ["id"]), "body"),
        putWord
      );
    router.delete("/", checkFields(["id"]), deleteWord);
  },
  postWord,
  putWord,
  deleteWord,
  importWord,
};
