<script>
  import { onMount } from "svelte";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "../../../firebase.js";
  import Swal from "sweetalert2";
  import Navbar from "../../../components/Navbar.svelte";
  import NavbarAdmin from "../../../components/NavbarAdmin.svelte";

  let user = {};
  let productos = [];

  $: {
    productos = JSON.parse(localStorage.getItem("producto")) || [];
  }

  function deleteProductLocalStorage(id) {
    let newProductos = productos.filter((product) => product.id != id);
    localStorage.setItem("producto", JSON.stringify(newProductos));
    productos = newProductos;
    Swal.fire({
      title: "¡Producto eliminado!",
      text: `El producto se eliminó correctamente del carrito.`,
      icon: "success",
    });
  }

  let totalCost = 0;

  $: totalCost = productos.reduce((acc, product) => {
    return acc + product.precio * product.cantidad;
  }, 0);

  function handleQuantityChange(event, product) {
    const newQuantity = +event.target.value;
    product.cantidad = newQuantity;

    localStorage.setItem("producto", JSON.stringify(productos));
  }

  function buy() {
    Swal.fire({
      title: "¡Productos comprados!",
      text: `Paquete en camino.`,
      icon: "success",
    });
  }

  onMount(() => {
    onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
    });
  });
</script>

{#if user.email == "admin@gmail.com"}
  <NavbarAdmin />
{:else}
  <Navbar />
{/if}

{#if productos.length > 0}
  <section class="p-4">
    <div class="overflow-x-auto text-pretty">
      <table class="min-w-full bg-white shadow-md rounded-xl">
        <thead>
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-3 px-4 text-left">Imagen</th>
            <th class="py-3 px-4 text-left">Producto</th>
            <th class="py-3 px-4 text-left">Cantidad</th>
            <th class="py-3 px-4 text-left">Precio</th>
            {#if user.email == "admin@gmail.com"}
              <th class="py-3 px-4 text-left">Eliminar</th>
            {/if}
          </tr>
        </thead>
        <tbody class="text-blue-gray-900">
          {#each productos as product}
            <tr class="border-b border-blue-gray-200" data-id={product.id}>
              <td class="py-3 px-4">
                <img
                  src="data:image/jpeg;base64,{product.imagen}"
                  alt={product.nombre}
                  class="rounded-lg sm:max-h-40 md:h-40"
                />
              </td>
              <td class="py-3 px-4">{product.nombre}</td>
              <td class="py-3 px-4 text-center">
                <input
                  type="number"
                  bind:value={product.cantidad}
                  min="0"
                  class="w-16 text-center"
                  on:input={(event) => handleQuantityChange(event, product)}
                />
              </td>
              <td class="py-3 px-4 text-center">{product.precio}</td>
              {#if user.email == "admin@gmail.com"}
                <td class="py-3 px-4 text-center">
                  <button
                    on:click={() => deleteProductLocalStorage(product.id)}
                    type="button"
                    class="bg-red-500 p-2 rounded-xl text-white transition-all hover:bg-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="text-right mt-4">
      <h2 class="text-xl font-bold">Total: ${totalCost}</h2>
    </div>
    <button
      on:click={buy}
      class="w-full bg-indigo-500 hover:bg-indigo-800 p-2 mt-2 rounded-xl text-white transition-all"
    >
      Comprar
    </button>
  </section>
{:else}
  <div class="flex justify-center items-center h-96">
    <h1 class="text-2xl text-blue-gray-500">
      No hay productos en el carrito
    </h1>
  </div>
{/if}

