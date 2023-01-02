const { Op } = require("sequelize");
const db = require("../models");
const product = db.Product;
const category = db.Category;

module.exports = {
  create: async (req, res) => {
    try {
      const { productName, distributor, description } = req.body;

      if (!productName && !distributor && !description) throw "required field";

      await product.create(
        {
          productName,
          distributor,
          description,
        }
        // {
        //   Images: fileUploaded.filename,
        // }
      );
      res.status(200).send({
        message: "Successfully Added",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;

      await category.create(
        {
          categoryName,
        }
        // {
        //   Images: fileUploaded.filename,
        // }
      );
      res.status(200).send({
        message: "Successfully Added",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getAll: async (req, res) => {
    try {
      const users = await product.findAll({
        attributes: ["id", "productName", "distributor", "description"],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const users = await category.findAll({
        attributes: ["id", "categoryName"],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getById: async (req, res) => {
    try {
      const users = await product.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getBy: async (req, res) => {
    try {
      const { productName, distributor, description } = req.query;
      const users = await product.findAll({
        where: {
          [Op.or]: {
            productName: productName ? productName : "",
            distributor: distributor ? distributor : "",
            description: description ? description : "",
          },
        },
        raw: true,
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  searchBy: async (req, res) => {
    try {
      const { productName, description } = req.query;
      const users = await product.findAll({
        where: {
          [Op.or]: {
            productName: {
              [Op.like]: `%${productName}%`,
            },
            description: {
              [Op.like]: `%${description}%`,
            },
          },
        },
        raw: true,
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalBooks: async (req, res) => {
    try {
      const users = await product.findAll({
        attributes: [[sequelize.fn("count", sequelize.col(`id`)), "total"]],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  remove: async (req, res) => {
    try {
      await product.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(req.params.id);
      const users = await product.findAll();
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { productName, distributor, description } = req.body;
      //   let fileUploaded = req.file;
      await product.update(
        {
          productName,
          distributor,
          description,
        },
        // {
        //   Images: fileUploaded.filename,
        // },
        {
          where: { id: req.params.id },
        }
      );
      const users = await product.findOne({ where: { id: req.params.id } });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  sortBy: async (req, res) => {
    try {
      const { data, order } = req.query;
      const users = await product.findAll({
        order: [[data, order]],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  // uploadFile: async (req, res) => {
  //   try {
  //     let fileUploaded = req.file;
  //     console.log("controller", fileUploaded);
  //     await book.update(
  //       {
  //         Images: fileUploaded.filename,
  //       },
  //       {
  //         where: {
  //           id: req.params.id,
  //         },
  //       }
  //     );
  //     const getBook = await book.findOne({
  //       where: {
  //         id: req.params.id,
  //       },
  //       raw: true,
  //     });
  //     res.status(200).send({
  //       id: getBook.id,
  //       Title: getBook.Title,
  //       Images: getBook.Images,
  //     });
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
  // },

  view2: async (req, res) => {
    try {
      const { page, limit, search_query, order, order_direction } = req.query;
      const productlist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * productlist_page;
      const orderby = order || "Title";
      const direction = order_direction || "ASC";
      const totalRows = await product.count({
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              description: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await product.findAll({
        include: [
          {
            model: cart,
            attributes: ["id"],
          },
        ],
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              description: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        offset: offset,
        limit: list_limit,
        order: [[orderby, direction]],
        include: [
          {
            model: cart,
            attributes: ["id"],
          },
        ],
      });

      res.status(200).send({
        result: result,
        page: productlist_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  stock: async (req, res) => {
    try {
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
