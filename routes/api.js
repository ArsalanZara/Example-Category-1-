const router = require("express").Router();

module.exports = ({ categoryService }) => {
  router.get("/categories", async (req, res) => {
    let categories = await categoryService.getData();
    res.json(categories);
  });

  router.get("/categories/delete/:index", async (req, res) => {
    const index = req.params.index;
    let categories = await categoryService.getData();
    categories.splice(index, 1);
    await categoryService.setList(categories);
    res.redirect("/");
  });
  return router;
};
