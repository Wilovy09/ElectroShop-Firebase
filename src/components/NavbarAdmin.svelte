<script>
  import { signOut } from "firebase/auth";
  import { auth } from "../firebase.js";
  import { goto } from "$app/navigation";
  import { showErrorToast } from "../helpers/swalFunctions.js";

  async function LogOut() {
    try {
      await signOut(auth);
      console.log("User is logged out");
      goto("/");
    } catch (e) {
      console.error(e);
    }
  }

  let codigoUser = "";
  async function searchCode() {
    const url = `http://localhost:8000/api/product/code/${codigoUser}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const dataCodigo = await response.json();

      console.log(dataCodigo);

      if (dataCodigo.id != null) {
        goto(`/electroshop/${dataCodigo.id}`);
      } else {
        window.searchModal.close();
        showErrorToast("No se encontro ningun producto con el nombre.");
      }
    } catch (e) {
      console.error(e);
    }
  }
</script>

<nav
  class="lg:px-16 px-6 bg-[#fcfcfc] text-white shadow-md flex flex-wrap items-center lg:py-0 py-2"
  data-svelte-h="svelte-1lsm3ud"
>
  <div class="flex-1 flex justify-between items-center">
    <a href="/electroshop" class="flex text-lg font-semibold">
      <img
        src="/favicon.png"
        alt="logo electroshop"
        class="text-black h-8 mr-2"
      />
      <span class="text-black">ElectroShop</span>
    </a>
  </div>
  <li class="">
    <a
      class="inline-flex items-center px-5 group lg:mt-1.5"
      href="/electroshop/cart"
    >
      <svg
        class="font-bold text-black group-hover:text-[#888888]"
        width="25"
        height="25"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
    </a>
  </li>
  <label for="menu-toggle" class="cursor-pointer mt-[-0.20rem] lg:hidden block">
    <svg
      class="fill-current text-black hover:text-[#888888]"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      ><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
      ></path></svg
    >
  </label>
  <input class="hidden svelte-1ah0gke" type="checkbox" id="menu-toggle" />
  <div
    class="hidden lg:flex lg:items-center lg:w-auto w-full svelte-1ah0gke"
    id="menu"
  >
    <ul
      class="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex lg:pt-0"
    >
      <li class="py-2 lg:py-0">
        <button
          onClick="window.searchModal.showModal();"
          class="inline-flex flex-col items-center justify-center px-5 group"
        >
          <span class="font-bold text-black group-hover:text-[#888888]"
            >Buscar</span
          >
        </button>
      </li>
      <li class="py-2 lg:py-0">
        <a
          class="inline-flex flex-col items-center justify-center px-5 group"
          href="/electroshop"
        >
          <span class="font-bold text-black group-hover:text-[#888888]"
            >Inicio</span
          >
        </a>
      </li>
      <li class="py-2 lg:py-0">
        <a
          class="inline-flex flex-col items-center justify-center px-5 group"
          href="/products"
        >
          <span class="font-bold text-black group-hover:text-[#888888]"
            >Agregar productos</span
          >
        </a>
      </li>
      <li class="py-2 lg:py-0">
        <button
          on:click={LogOut}
          class="font-bold text-black hover:text-[#888888]"
          >Cerrar sesión</button
        >
      </li>
    </ul>
  </div>
</nav>

<dialog id="searchModal" class="rounded-xl p-4">
  <form on:submit|preventDefault={searchCode} class="min-w-fit">
    <div class="">
      <label for="busqueda" class="block text-sm font-medium text-gray-700"
        >Buscar producto</label
      >
      <input
        bind:value={codigoUser}
        type="busqueda"
        id="busqueda"
        name="busqueda"
        placeholder="Código de producto"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <button
      class="mt-3 w-full bg-indigo-500 text-white font-semibold p-2 rounded-md"
      >Buscar</button
    >
  </form>

  <div class="flex justify-center">
    <button
      onclick="window.searchModal.close();"
      class="mt-1 w-full bg-red-500 text-white font-semibold p-2 rounded-md"
      >Cerrar</button
    >
  </div>
</dialog>

<style>
  #menu-toggle:checked + #menu {
    display: block;
  }
</style>
