const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        as: 'products',
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbtagData) => res.json(dbtagData))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});
// find a single tag by its `id`
  // be sure to include its associated Product data
router.get("/:id", (req, res) => {
  
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    // attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        as: "products"
      },
      // {
      //   model: ProductTag,
      //   attributes: ["id", "tag_name"],
      //   as: "tags"
      // },

    ],
  })
    .then((dbtagData) => {
      if (!dbtagData) {
        res.status(404).json({ message: "No tag found!" });
        return;
      }
      res.json(dbtagData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbtagData) => {
      res.json(dbtagData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbtagData) => {
      if (!dbtagData[0]) {
        res.status(404).json({ message: `no such tag ID ${req.params.id}` });
        return;
      }
      res.json(dbtagData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((dbtagData) => {
      if (!dbtagData) {
        res
        .status(404)
        .json({ message: "no tag found with this id" });
        return;
      }
      res.json(dbtagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
