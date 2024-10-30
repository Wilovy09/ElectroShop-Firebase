// importamos express de express
import express from "express";
// importamos cors para poner los dominios de confianza (derecho de autor)
import cors from "cors";
// importamos las rutas de los productos
import productRoutes from "./routes/product.routes.js";
// iniciamos express y lo guardamos en una constante app
const app = express();

let debug = true;
if (debug) {
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,POST,DELETE",
    }),
  );
} else {
  app.use(
    cors({
      origin: "http://localhost:5173/",
      methods: "GET,HEAD,PUT,POST,DELETE",
    }),
  );
}

app.use(express.json());
// incluimos las rutas de productos con el prefijo de /api
app.use("/api", productRoutes);
// iniciamos servidor en el puerto 8000
app.listen(8000, function () {
  if (debug) {
    console.log(
      "\n ➜ API funcionando en el puerto 8000.\n ➜ CORS deshabilitado.\n ➜ Debug activado.\n",
    );
  } else {
    console.log(
      "\n ➜ API funcionando en el puerto 8000.\n ➜ CORS habilitado.\n ➜ Debug desactivado.\n",
    );
  }
});
