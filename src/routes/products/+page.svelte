<script>
  import Swal from "sweetalert2";
  import NavbarAdmin from "../../components/NavbarAdmin.svelte";

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
      nombre: nombre,
      marca: marca,
      codigo: codigo,
      stock: parseInt(stock),
      precio: parseFloat(precio),
      categoria: categoria,
      descripcion: descripcion,
      imagen: imagen,
    };

    const url = "http://localhost:8000/api/products";
    const opciones = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, opciones);
      if (response.ok) {
        Swal.fire({
          title: "¡Producto agregado!",
          text: "¡El producto se agrego correctamente a la base de datos!",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "El producto no se pudo agregar a la base de datos.",
        text: `${error}`,
        icon: "error",
      });
    }
  };
</script>

<NavbarAdmin />

<form on:submit|preventDefault={handleSubmit} class="m-8">
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
      class="ml-1 text-black"
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
