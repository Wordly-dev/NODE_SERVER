const models = require("@models");
const { defInclude, excludeFields, getLikeTemplate } = require("@utils");

const getDictionary = (req, res) => {
  const { offset, limit, ...queryParams } = req.query;

  const where = getLikeTemplate(
    queryParams,
    excludeFields(defInclude(), ["id"])
  );

  models.Dictionary.findAll().defAnswer(res);

  /*models.dictionary
    .findAndCountAll({
      where,
      limit,
      offset,
      attributes: defInclude(),
      include: [
        {
          model: models.dictionarySettings,
        },
        {
          model: models.file,
          attributes: defInclude(["path"]),
        },
      ],
    })
    .defAnswer(res);
    */
};

const getDictionaryById = async (req, res) => {
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
          model: models.word,
        },
        {
          model: models.dictionarySettings,
        },
      ],
    })
    .defAnswer(res);
};

module.exports = {
  loadController: (router) => {
    router.get("/", getDictionary);
    router.get("/:id", getDictionaryById);
  },
  getDictionary,
  getDictionaryById,
};
