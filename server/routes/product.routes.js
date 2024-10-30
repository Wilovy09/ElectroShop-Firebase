// Importamos router de express
import { Router } from "express";
// Importamos la constante exportada en el archivo db.js
import { prisma } from "../db.js";
// Hacemos una nueva instancia de router y la guardamos en router
const router = Router();

// Ver todos los productos
router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// Crear un producto
router.post("/products", async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });
  res.json(newProduct);
});

// Ver un producto por id
router.get("/product/:id", async (req, res) => {
  const productFound = await prisma.product.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!productFound)
    return res.status(404).json({ error: "Product not found" });
  res.json(productFound);
});

// Ver un producto por codigo
router.get("/product/code/:codigo", async (req, res) => {
  const productFound = await prisma.product.findFirst({
    where: {
      codigo: req.params.codigo,
    },
  });
  if (!productFound)
    return res.status(404).json({ error: "Product not found" });
  res.json(productFound);
});

// Ver un producto por nombre
router.get("/product/name/:nombre", async (req, res) => {
  const productFound = await prisma.product.findFirst({
    where: {
      nombre: req.params.nombre,
    },
  });
  if (!productFound)
    return res.status(404).json({ error: "Product not found" });
  res.json(productFound);
});

// Ver un producto por categoria
router.get("/product/cat/:categoria", async (req, res) => {
  const productFound = await prisma.product.findMany({
    where: {
      categoria: req.params.categoria,
    },
  });
  if (!productFound)
    return res.status(404).json({ error: "Product not found" });
  res.json(productFound);
});

// Eliminar un producto
router.delete("/product/:id", async (req, res) => {
  const productDeleted = await prisma.product.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!productDeleted)
    return res.status(404).json({ error: "Product not found" });

  res.json(productDeleted);
});

// Actualizar un producto
router.put("/product/:id", async (req, res) => {
  const productUpdated = await prisma.product.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });
  if (!productUpdated)
    return res.status(404).json({ error: "Product not found" });

  return res.json(productUpdated);
});

export default router;
