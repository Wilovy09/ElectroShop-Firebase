-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "marca" TEXT,
    "codigo" TEXT NOT NULL,
    "stock" INTEGER,
    "precio" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_codigo_key" ON "Product"("codigo");
