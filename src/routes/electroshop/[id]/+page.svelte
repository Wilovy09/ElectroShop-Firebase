<script>
  import { onMount } from "svelte";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "../../../firebase.js";
  import Swal from "sweetalert2";
  import Navbar from "../../../components/Navbar.svelte";
  import NavbarAdmin from "../../../components/NavbarAdmin.svelte";

  export let data;

  let user = {};
  let dataAPI = {};

  async function getProducts() {
    const url = `http://localhost:8000/api/product/${data.id}`;
    const response = await fetch(url);
    const dataFETCH = await response.json();
    dataAPI = dataFETCH;
  }

  let count = 0;
  function increment() {
    count += 1;
  }
  function decrement() {
    count -= 1;
  }
  $: {
    if (count < 0) {
      count = 0;
    }
  }

  async function deleteProduct() {
    const url = `http://localhost:8000/api/product/${data.id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        Swal.fire({
          title: "¡Producto eliminado!",
          text: `El producto se eliminó correctamente de la base de datos.`,
          icon: "success",
        });
      } else {
        console.log("Error al eliminar el producto");
      }
    } catch (error) {
      console.log(error);
    }
  }

  let nombre = "";
  let marca = "";
  let codigo = "";
  let stock = 0;
  let precio = 0.0;
  let categoria = "";
  let descripcion = "";
  let imagen = "";

  let Base64String = "";
  function uploadImage() {
    let file = document.querySelector("input[type=file]").files[0];
    let reader = new FileReader();

    reader.onload = function () {
      Base64String = reader.result.replace("data", "").replace(/^.+,/, "");
    };
    reader.readAsDataURL(file);
  }
  $: if (Base64String != "") {
    imagen = Base64String;
  }

  let handleSubmit = async () => {
    let data = {
      id: dataAPI.id,
      nombre: nombre,
      marca: marca,
      codigo: codigo,
      stock: parseInt(stock),
      precio: parseFloat(precio),
      categoria: categoria,
      descripcion: descripcion,
      imagen: imagen,
    };

    const url = `http://localhost:8000/api/product/${data.id}`;
    const opciones = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, opciones);
      if (response.ok) {
        Swal.fire({
          title: "¡Producto editado correctamente!",
          text: "¡El producto se edito correctamente en la base de datos!",
          icon: "success",
        });
        window.modal.close();
      }
    } catch (error) {
      console.log(error);
    }
  };
  function editProduct() {
    window.modal.showModal();

    nombre = dataAPI.nombre;
    marca = dataAPI.marca;
    codigo = dataAPI.codigo;
    stock = dataAPI.stock;
    precio = dataAPI.precio;
    categoria = dataAPI.categoria;
    descripcion = dataAPI.descripcion;
    imagen = dataAPI.imagen;
    Base64String = dataAPI.imagen;
  }

  function buy() {
    if (count > dataAPI.stock) {
      Swal.fire({
        title: "¡Error!",
        text: `No hay suficiente stock para comprar ${count} productos, quedan ${dataAPI.stock} en stock.`,
        icon: "error",
      });
      return;
    } else if (count > 0) {
      Swal.fire({
        title: "¡Producto comprado!",
        text: `Se compraron ${count} correctamente.`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "¡Error!",
        text: `No se puede comprar 0 productos.`,
        icon: "error",
      });
    }
  }

  function addToCart(data, count) {
    /*
     * TODO: Hacer que pueda haber mas de un producto en el carrito
     * y que se guarde en el localStorage en un mismo "objeto".
     */
    let products = JSON.parse(localStorage.getItem("producto")) || [];

    products.push({
      id: data.id,
      nombre: data.nombre,
      marca: data.marca,
      codigo: data.codigo,
      stock: data.stock,
      precio: data.precio,
      categoria: data.categoria,
      descripcion: data.descripcion,
      imagen: data.imagen,
      cantidad: count,
    });

    localStorage.setItem("producto", JSON.stringify(products));
  }
  function alertAddToCart() {
    if (count > dataAPI.stock) {
      Swal.fire({
        title: "¡Error!",
        text: `No hay suficiente stock para comprar ${count} productos, quedan ${dataAPI.stock} en stock.`,
        icon: "error",
      });
      return;
    } else if (count > 0) {
      let data = {
        id: dataAPI.id,
        nombre: dataAPI.nombre,
        marca: dataAPI.marca,
        codigo: dataAPI.codigo,
        stock: dataAPI.stock,
        precio: dataAPI.precio,
        categoria: dataAPI.categoria,
        descripcion: dataAPI.descripcion,
        imagen: dataAPI.imagen,
      };
      addToCart(data, count);
      Swal.fire({
        title: "¡Producto agregado al carrito!",
        text: `Se agrego ${count} ${dataAPI.nombre} al carrito correctamente.`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "¡Error!",
        text: `No se puede comprar 0 productos.`,
        icon: "error",
      });
    }
  }

  onMount(() => {
    onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
    });
    getProducts();
  });
</script>

{#if user.email == "admin@gmail.com"}
  <NavbarAdmin />
  <main class="grid justify-center mt-8 lg:w-[90%vw] mx-4">
    <div class="flex gap-4 mb-4 font-semibold">
      <button
        on:click={editProduct}
        class="w-full bg-orange-500 hover:bg-orange-800 p-2 mt-2 rounded-xl text-white transition-all"
        >Editar</button
      >
      <button
        on:click={deleteProduct}
        class="w-full bg-red-500 hover:bg-red-800 p-2 mt-2 rounded-xl text-white transition-all"
        >Eliminar</button
      >
    </div>

    <img
      src="data:image/jpeg;base64,{dataAPI?.imagen}"
      alt={dataAPI?.nombre}
      class="rounded-lg m-h-64"
    />

    <div>
      <h1 class="text-center text-3xl font-bold">{dataAPI?.nombre}</h1>
      <div class="flex justify-between font-semibold">
        <h2>{dataAPI?.marca}</h2>
        <h2>#{dataAPI?.codigo}</h2>
      </div>
      <div class="flex justify-between">
        <h3>
          <span class="font-semibold">Disponibilidad:</span>
          {dataAPI?.stock}
        </h3>
        <h4 class="font-semibold">{dataAPI?.categoria}</h4>
      </div>
      <h4><span class="font-semibold">$</span>{dataAPI?.precio}</h4>
      <div>
        <h4 class="font-semibold">Descripción:</h4>
        <h4 class="p-2">{dataAPI?.descripcion}</h4>
      </div>
      <div class="text-center font-semibold bg-slate-100 p-2 rounded-xl">
        <h5>Cantidad</h5>
        <div class="flex justify-between">
          <button
            on:click={decrement}
            class="bg-white hover:bg-[#f0f0f0] transition-all p-4 rounded-l-xl"
            >-</button
          >
          <h5 class="bg-white p-4 w-full">{count}</h5>
          <button
            on:click={increment}
            class="bg-white hover:bg-[#f0f0f0] transition-all p-4 rounded-r-xl"
            >+</button
          >
        </div>
      </div>
      <button
        on:click={buy}
        class="font-semibold w-full bg-indigo-500 hover:bg-indigo-800 p-2 mt-2 rounded-xl text-white transition-all"
        >Comprar</button
      >
      <button
        on:click={alertAddToCart}
        class="mb-8 w-full bg-blue-500 hover:bg-blue-800 p-2 mt-2 rounded-xl text-white transition-all"
        >Agregar al carrito</button
      >
    </div>
  </main>
  <!-- ventana de edicion de producto -->
  <dialog id="modal" class="p-4 w-[30rem] rounded-xl">
    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700"
          >Nombre del producto</label
        >
        <input
          bind:value={nombre}
          type="nombre"
          id="nombre"
          name="nombre"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="imagen" class="block text-sm font-medium text-gray-700"
          >Imagen del producto</label
        >
        <input on:change={uploadImage} type="file" id="imagen" name="imagen" />
        {#if imagen != ""}
          <img src="data:image/jpeg;base64,{Base64String}" alt="IMAGEN" />
        {/if}
      </div>
      <div class="mb-4">
        <label for="marca" class="block text-sm font-medium text-gray-700"
          >Marca del producto</label
        >
        <input
          bind:value={marca}
          type="marca"
          id="marca"
          name="marca"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="codigo" class="block text-sm font-medium text-gray-700"
          >Código del producto</label
        >
        <input
          bind:value={codigo}
          type="codigo"
          id="codigo"
          name="codigo"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="stock" class="block text-sm font-medium text-gray-700"
          >Stock del producto</label
        >
        <input
          bind:value={stock}
          type="stock"
          id="stock"
          name="stock"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="precio" class="block text-sm font-medium text-gray-700"
          >Precio del producto</label
        >
        <input
          bind:value={precio}
          type="precio"
          id="precio"
          name="precio"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4 flex">
        <label for="categoria" class="block text-sm font-medium text-gray-700"
          >Categoria del producto</label
        >
        <select
          bind:value={categoria}
          id="categoria"
          name="categoria"
          class="ml-1"
        >
          <option value="Seleccione" selected>Seleccione</option>
          <option value="Resistores">Resistores</option>
          <option value="Capacitores">Capacitores</option>
          <option value="Leds">Leds</option>
          <option value="Reles">Relés</option>
          <option value="Displays">Displays</option>
          <option value="Transistores">Transistores</option>
          <option value="Potenciometros">Potenciómetros</option>
          <option value="Circuitos Integrados">Circuitos Integrados</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="descripcion" class="block text-sm font-medium text-gray-700"
          >Descripción del producto</label
        >
        <textarea
          bind:value={descripcion}
          id="descripcion"
          name="descripcion"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full bg-indigo-500 text-white font-semibold p-2 rounded-md"
        >Agregar producto</button
      >
    </form>
    <div class="flex justify-center mt-2">
      <button
        onclick="window.modal.close();"
        class="w-full bg-red-500 text-white font-semibold p-2 rounded-md"
        >Cerrar</button
      >
    </div>
  </dialog>
{:else}
  <Navbar />
  <main class="grid justify-center mt-8 lg:w-[90%vw] mx-4">
    <img
      src="data:image/jpeg;base64,{dataAPI.imagen}"
      alt={dataAPI.nombre}
      class="rounded-lg m-h-64"
    />

    <div>
      <h1 class="text-center text-3xl font-bold">{dataAPI.nombre}</h1>
      <div class="flex justify-between font-semibold">
        <h2>{dataAPI.marca}</h2>
        <h2>#{dataAPI.codigo}</h2>
      </div>
      <div class="flex justify-between">
        <h3>
          <span class="font-semibold">Disponibilidad:</span>
          {dataAPI.stock}
        </h3>
        <h4 class="font-semibold">{dataAPI.categoria}</h4>
      </div>
      <h4><span class="font-semibold">$</span>{dataAPI.precio}</h4>
      <div>
        <h4 class="font-semibold">Descripción:</h4>
        <h4 class="p-2">{dataAPI.descripcion}</h4>
      </div>
      <div class="text-center font-semibold bg-slate-100 p-2 rounded-xl">
        <h5>Cantidad</h5>
        <div class="flex justify-between">
          <button
            on:click={decrement}
            class="bg-white hover:bg-[#f0f0f0] transition-all p-4 rounded-l-xl"
            >-</button
          >
          <h5 class="bg-white p-4 w-full">{count}</h5>
          <button
            on:click={increment}
            class="bg-white hover:bg-[#f0f0f0] transition-all p-4 rounded-r-xl"
            >+</button
          >
        </div>
      </div>
      <button
        on:click={buy}
        class="w-full bg-indigo-500 hover:bg-indigo-800 p-2 mt-2 rounded-xl text-white transition-all"
        >Comprar</button
      >
      <button
        on:click={alertAddToCart}
        class="mb-8 w-full bg-blue-500 hover:bg-blue-800 p-2 mt-2 rounded-xl text-white transition-all"
        >Agregar al carrito</button
      >
    </div>
  </main>
{/if}
