const models = require("@models");
const { defInclude, checkFields, excludeFields } = require("@utils");

const getDictionarySettings = (req, res) => {
  const { offset, limit } = req.query;

  models.dictionarySettings
    .findAndCountAll({
      limit,
      offset,
      attributes: ["id", "padding"],
      include: [
        {
          model: models.dictionary,
          attributes: defInclude(),
        },
      ],
    })
    .defAnswer(res);
};

const postDictionarySettings = async (req, res) => {
  const data = req.body;

  await models.dictionarySettings.create({ ...data, padding: 0 });
};

const putDictionarySettings = (req, res) => {
  const { dictionaryId } = req.query;

  models.dictionarySettings
    .update(req.body, { where: { dictionaryId } })
    .defAnswer(res);
};

const deleteDictionarySettings = (req, res) => {
  const { id } = req.query;

  if (id && (req?.userData.isAdmin || req?.userData.isSuperAdmin))
    models.dictionary
      .destroy({ where: { id } })
      .then(() => res.send("DELETED"));
  else {
    throw new Error("error");
  }
};

module.exports = {
  loadController: (router) => {
    router.get("/", getDictionarySettings);
    router.put(
      "/",
      checkFields(
        excludeFields(defInclude(), ["id", "caption", "description"]),
        "body"
      ),
      putDictionarySettings
    );
    router.post(
      "/",
      checkFields(
        excludeFields(defInclude(["dictionaryId"]), [
          "id",
          "caption",
          "description",
        ]),
        "body"
      ),
      postDictionarySettings
    );
    router.delete("/", deleteDictionarySettings);
  },
  getDictionarySettings,
  postDictionarySettings,
  putDictionarySettings,
  deleteDictionarySettings,
};
