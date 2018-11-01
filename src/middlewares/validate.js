export default {
  validateGeneral: (req, res, next) => {
    if (!req.body.category || req.body.category.trim().length < 1) {
      res.status(400).send({
        success: false,
        message: 'Request must contain category',
      });
      return;
    }

    if (!req.body.price) {
      res.status(400).send({
        success: false,
        message: 'Request must contain price',
      });
      return;
    }

    if (Number.isNaN(parseInt(req.body.price, 10))) {
      res.status(400).send({
        success: false,
        message: 'Price must contain only numbers',
      });
      return;
    }

    if (!req.body.quantity) {
      res.status(400).send({
        success: false,
        message: 'Request must contain quantity',
      });
      return;
    }

    if (Number.isNaN(parseInt(req.body.quantity, 10))) {
      res.status(400).send({
        success: false,
        message: 'Quantity must contain only numbers',
      });
      return;
    }

    if (req.body.quantity.indexOf('.') !== -1) {
      res.status(400).send({
        success: false,
        message: 'Quantity must not contain decimals',
      });
      return;
    }
    next();
  },

  validateProduct: (req, res, next) => {
    if (!req.body.name || req.body.name.trim().length < 1) {
      res.status(400).send({
        success: false,
        message: 'Request must contain product name',
      });
      return;
    }
    next();
  },

  validateSale: (req, res, next) => {
    if (!req.body.product || req.body.product.trim().length < 1) {
      res.status(400).send({
        success: false,
        message: 'Request must contain product name',
      });
      return;
    }
    if (!req.body.attendant || req.body.attendant.trim().length < 1) {
      res.status(400).send({
        success: false,
        message: 'Request must contain attendant name',
      });
      return;
    }
    next();
  },
};
