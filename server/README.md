# Documentación de la API

## Obtener todos los productos

- Tipo de petición: `GET`
- URL: [http://localhost:8000/api/products](http://localhost:8000/api/products)

```json
[
  {
    "id": 1,
    "nombre": "Test",
    "imagen": "iVBORw0KG...",
    "marca": "Test Marca",
    "codigo": "Test code",
    "stock": 5,
    "precio": 9.99,
    "categoria": "Reles",
    "descripcion": "Test descripcion"
  },
  {
    "id": 2,
    "nombre": "Test",
    "imagen": "iVBORw0KG...",
    "marca": "Test Marca",
    "codigo": "Test code",
    "stock": 5,
    "precio": 9.99,
    "categoria": "Reles",
    "descripcion": "Test descripcion"
  }
]
```

## Crear un nuevo producto

- Tipo de petición: `POST`
- URL: [http://localhost:8000/api/products](http://localhost:8000/api/products)

En esta petición se debe enviar un objeto JSON con la información del producto a crear.

```json
{
  "nombre": "Test",
  // Imagen en base64
  "imagen": "iVBORw0KG...",
  "marca": "Test Marca",
  "codigo": "Test code",
  "stock": 5,
  "precio": 9.99,
  "categoria": "Reles",
  "descripcion": "Test descripcion"
}
```

## Obtener solo un producto por ID

- Tipo de petición: `GET`
- URL: [http://localhost:8000/api/product/[ID]](http://localhost:8000/api/product/[ID])

Esto buscara en la base de datos un producto con el ID especificado.

Si lo encuentra, devolverá un objeto JSON con la información del producto.

```json
[
  {
    "id": 1,
    "nombre": "Test",
    "imagen": "iVBORw0KG...",
    "marca": "Test Marca",
    "codigo": "Test code",
    "stock": 5,
    "precio": 9.99,
    "categoria": "Reles",
    "descripcion": "Test descripcion"
  }
]
```

Si no lo encuentra, devolvera un objeto JSON con un mensaje de error y un error 404.

```json
{
  "error": "Producto no encontrado"
}
```

## Obtener solo un producto por CODIGO

- Tipo de petición: `GET`
- URL: [http://localhost:8000/api/product/code/[CODIGO]](http://localhost:8000/api/product/code/[CODIGO])

Esto buscara en la base de datos un producto con el CODIGO especificado.

Si lo encuentra, devolverá un objeto JSON con la información del producto.

```json
[
  {
    "id": 1,
    "nombre": "Test",
    "imagen": "iVBORw0KG...",
    "marca": "Test Marca",
    "codigo": "Test code",
    "stock": 5,
    "precio": 9.99,
    "categoria": "Reles",
    "descripcion": "Test descripcion"
  }
]
```

Si no lo encuentra, devolvera un objeto JSON con un mensaje de error y un error 404.

```json
{
  "error": "Producto no encontrado"
}
```

## Obtener solo un producto por CATEGORIA

- Tipo de petición: `GET`
- URL: [http://localhost:8000/api/product/cat/[CODIGO]](http://localhost:8000/api/product/cat/[CODIGO])

Esto buscara en la base de datos todos los productos con la categoria espeficicada.

Si los encuentra, devolverá un objeto JSON con la información del producto.

```json
[
  {
    "id": 1,
    "nombre": "Test",
    "imagen": "iVBORw0KG...",
    "marca": "Test Marca",
    "codigo": "Test code",
    "stock": 5,
    "precio": 9.99,
    "categoria": "Reles",
    "descripcion": "Test descripcion"
  },
  {
    "id": 2,
    "nombre": "Test",
    "imagen": "iVBORw0KG...",
    "marca": "Test Marca",
    "codigo": "Test code",
    "stock": 5,
    "precio": 9.99,
    "categoria": "Reles",
    "descripcion": "Test descripcion"
  }
]
```

Si no los encuentra, devolvera un objeto JSON con un mensaje de error y un error 404.

```json
{
  "error": "Producto no encontrado"
}
```

## Eliminar un producto por ID

- Tipo de petición: `DELETE`
- URL: [http://localhost:8000/api/product/[ID]](http://localhost:8000/api/product/[ID])

Esto buscara en la base de datos el producto con el ID especificado y lo eliminara.

Si los encuentra, devolverá un objeto JSON con la información del producto eliminado.

```json
[
  {
    "id": 1,
    "nombre": "Test",
    "imagen": "iVBORw0KG...",
    "marca": "Test Marca",
    "codigo": "Test code",
    "stock": 5,
    "precio": 9.99,
    "categoria": "Reles",
    "descripcion": "Test descripcion"
  }
]
```

Si no los encuentra, devolvera un objeto JSON con un mensaje de error y un error 404.

```json
{
  "error": "Producto no encontrado"
}
```

## Actualizar un producto por ID

- Tipo de petición: `PUT`
- URL: [http://localhost:8000/api/product/[ID]](http://localhost:8000/api/product/[ID])

Esto buscara en la base de datos el producto con el ID especificado y lo actualizara con los datos que le mandemos.

Datos a enviar en el cuerpo de la petición:

```json
{
  "nombre": "Test",
  // Imagen en base64
  "imagen": "iVBORw0KG...",
  "marca": "Test Marca",
  "codigo": "Test code",
  "stock": 5,
  "precio": 9.99,
  "categoria": "Reles",
  "descripcion": "Test descripcion"
}
```

Si encuentra el producto y lo pudo editar, devolverá un objeto JSON con la información del producto.

```json
[
  {
    "id": 1,
    "nombre": "Test",
    "imagen": "iVBORw0KG...",
    "marca": "Test Marca",
    "codigo": "Test code",
    "stock": 5,
    "precio": 9.99,
    "categoria": "Reles",
    "descripcion": "Test descripcion"
  }
]
```

Si no lo encuentra, devolvera un objeto JSON con un mensaje de error y un error 404.

```json
{
  "error": "Producto no encontrado"
}
```
