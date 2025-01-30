const models = require("@models");
const {
  defInclude,
  checkFields,
  excludeFields,
  getLikeTemplate,
  createFile,
} = require("@utils");
const {
  postDictionarySettings,
} = require("@controller/public/dictionarySettings");

const getDictionary = (req, res) => {
  const { offset, limit, ...queryParams } = req.query;

  const where = getLikeTemplate(queryParams, defInclude());

  where.userId = req.userData?.id;

  models.dictionary
    .findAndCountAll({
      where,
      limit,
      offset,
      attributes: defInclude(),
      include: [
        {
          model: models.media,
          attributes: defInclude(["path"]),
        },
      ],
    })
    .defAnswer(res);
};

const getDictionaryById = (req, res) => {
  const { id } = req.params;

  models.dictionary
    .findOne({
      where: { id },
      attributes: defInclude(),
      include: [
        {
          model: models.media,
          attributes: defInclude(["path"]),
        },
        {
          model: models.dictionarySettings,
        },
      ],
    })
    .defAnswer(res);
};

const postDictionary = async (req, res) => {
  const data = req.body;
  data.userId = req.userData.id;

  if (req?.mediaId) {
    data.mediaId = (
      await models.media.findOne({ where: { id: req.mediaId } })
    ).id;
  }

  models.dictionary
    .create(data)
    .then(async (dictionary) => {
      req.body.dictionaryId = dictionary.id;
      await postDictionarySettings(req, res);

      return dictionary;
    })
    .defAnswer(res);
};

const putDictionary = (req, res) => {
  const { id } = req.query;

  models.dictionary.update(req.body, { where: { id } }).defAnswer(res);
};

const deleteDictionary = (req, res) => {
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
    router.get("/", getDictionary);
    router.get("/:id", getDictionaryById);
    router.post(
      "/",
      checkFields(excludeFields(defInclude(), ["id"]), "body"),
      createFile,
      postDictionary
    );
    router.put(
      "/",
      checkFields(excludeFields(defInclude(), ["id"]), "body"),
      putDictionary
    );
    router.delete("/", deleteDictionary);
  },
  getDictionary,
  getDictionaryById,
  postDictionary,
  deleteDictionary,
};
