const models = require("@models");
const {
  defInclude,
  getLikeTemplate,
  excludeFields,
  defAnswer,
} = require("@utils");

const getWord = (req, res) => {
  const { limit, offset, ...queryParams } = req.query;

  const where = Object.keys(queryParams).length
    ? getLikeTemplate({ ...queryParams }, ["caption"])
    : {};
  models.word
    .findAndCountAll({ where, attributes: defInclude() })
    .defAnswer(res);
};

const getWordById = (req, res) => {
  const { id } = req.params;

  models.word
    .findOne({
      where: { id },
      attributes: defInclude(),
      include: [
        {
          model: models.dictionary,
          attributes: excludeFields(defInclude(), ["id"]),
        },
      ],
    })
    .defAnswer(res);
};

module.exports = {
  loadController: (router) => {
    router.get("/", getWord);
    router.get("/:id", getWordById);
  },
  getWord,
  getWordById,
};
