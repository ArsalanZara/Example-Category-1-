const router = require("express").Router();

module.exports = ({ categoryService }) => {
  router.get("/", async (req, res) => {
    res.render("index");
  });

  router.post("/", async (req, res) => {
    let category = { category: req.body.category };
    try {
      await categoryService.addEntry(category);
      res.redirect("/");
    } catch (e) {
      res.redirect("/");
    }
  });

  router.use("/api", require("./api")({ categoryService }));

  return router;
};
