const models = require("@models");
const {
  getLikeTemplate,
  defInclude,
  excludeFields,
  defAnswer,
} = require("@utils");

const getUser = (req, res) => {
  const { limit, offset, ...queryParams } = req.query;

  const where = Object.keys(queryParams).length
    ? getLikeTemplate(
        { ...queryParams },
        ["caption"],
        ["password", "isAdmin", "isSuperAdmin"]
      )
    : {};

  if (
    queryParams["password"] !== undefined ||
    queryParams["isAdmin"] !== undefined ||
    queryParams["isSuperAdmin"] !== undefined
  ) {
    res.status(406).send("Something went wrong");
    return;
  }
  models.user
    .findAndCountAll({
      where: where,
      limit,
      offset,
      attributes: defInclude(["login"]),
      include: [
        {
          model: models.dictionary,
          attributes: excludeFields(defInclude(), ["id"]),
        },
      ],
    })
    .defAnswer(res);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  models.user
    .findOne({
      where: { id },
      attributes: defInclude(),
      include: [{ model: models.dictionary, attributes: defInclude() }],
    })
    .defAnswer(res);
};

module.exports = {
  loadController: (router) => {
    router.get("/", getUser);
    router.get("/:id", getUserById);
  },
  getUser,
  getUserById,
};
