import { Products } from "../Models/Product.js";

//add Product
export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;
  try {
    let product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    res.json({
      message: "Product Added successfully!!",
      product,
      success: true,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//get all products
export const getProducts = async (req, res) => {
  try {
    let products = await Products.find().sort({ createdAt: -1 });
    res.json({ message: "All Products :", products });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

//findProduct by Id
export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findById(id);
    if (!product)
      return res.json({ message: "Product Not found", success: false });

      res.json({ message: "Product by Id:", product, success: true });
  } catch (err) {
    return res.json({ message: `err: ,${err.message}`, success: false });
  }
};

//update a product
export const updateProductById = async (req, res) => {
      const id = req.params.id;
      try {
        const product = await Products.findById(id);
        if (!product)
          return res.json({ message: "Product Not found", success: false });

          const updatedProduct = await Products.findByIdAndUpdate(id, req.body,{new:true})
          res.json({ message: "Updated Product ",updatedProduct, success: true })
      } catch (err) {
        return res.json({ message: `err: ,${err.message}`, success: false });
      }
}

//delete product by id
export const deleteProductById = async (req, res) => {
      const id = req.params.id;
      try {
        const product = await Products.findById(id);
        if (!product)
          return res.json({ message: "Product Not found", success: false });

          const deletedProduct = await Products.findByIdAndDelete(id)
          res.json({ message: "Deleted Product:  ",deletedProduct, success: true })
      } catch (err) {
        return res.json({ message: `err: ,${err.message}`, success: false });
      }
}
