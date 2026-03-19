const Product = require('../models/Product')

async function getProducts(req, res, next) {
  try {
    const { category, q } = req.query
    const filter = {}

    if (category) {
      filter.category = { $regex: String(category), $options: 'i' }
    }

    if (q) {
      filter.$text = { $search: String(q) }
    }

    const products = await Product.find(filter).sort({ createdAt: -1 })
    return res.status(200).json({ data: products })
  } catch (error) {
    return next(error)
  }
}

async function createProduct(req, res, next) {
  try {
    const { name, description, category, price, stock } = req.body

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
    })

    return res.status(201).json({ message: 'Product created.', data: product })
  } catch (error) {
    return next(error)
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    return res.status(200).json({ message: 'Product updated.', data: product })
  } catch (error) {
    return next(error)
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    return res.status(200).json({ message: 'Product deleted.' })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
}
