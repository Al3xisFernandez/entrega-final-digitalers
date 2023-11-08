const { Router } = require("express");
const router = Router();

const {
    renderProductsForm,
    createNewProducts,
    renderProducts,
    renderEditProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controllers");
const { isAuthenticated } = require("../helpers/auth");

router.get("/products/add", isAuthenticated, renderProductsForm);
router.post("/products/new-product",isAuthenticated, createNewProducts);
router.get("/products", isAuthenticated,  renderProducts);
router.get("/products/edit/:id", isAuthenticated, renderEditProduct);
router.put("/products/edit/:id", isAuthenticated, updateProduct);
router.delete("/products/delete/:id", isAuthenticated, deleteProduct);
module.exports = router;
