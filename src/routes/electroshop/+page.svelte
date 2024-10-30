<script>
  import { onMount } from "svelte";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "../../firebase.js";
  import Navbar from "../../components/Navbar.svelte";
  import NavbarAdmin from "../../components/NavbarAdmin.svelte";

  let user = {};
  let data = [];
  let categoria = "Todos";

  $: if (categoria) {
    getProducts();
  }

  async function getProducts() {
    if (categoria == "Todos") {
      const url = "http://localhost:8000/api/products";
      const response = await fetch(url);
      const dataAPI = await response.json();
      data = dataAPI;
    } else {
      const url = `http://localhost:8000/api/product/cat/${categoria}`;
      const response = await fetch(url);
      const dataAPI = await response.json();
      data = dataAPI;
    }
  }

  onMount(() => {
    onAuthStateChanged(auth, (currentUser) => {
      user = currentUser;
    });
  });
</script>

{#if user.email == "admin@gmail.com"}
  <NavbarAdmin />
  <section>
    <div class="ml-4 mt-4 flex">
      <label for="categoria" class="block font-medium"
        >Categoria del producto a buscar</label
      >
      <select
        bind:value={categoria}
        id="categoria"
        name="categoria"
        class="ml-1 mt-[-0.20rem] text-black"
      >
        <option value="Todos" selected>Todos</option>
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
  </section>
  <main class="mt-8 flex justify-center">
    <section class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {#each data as product}
        <a href="/electroshop/{product.id}">
          <article
            class="bg-[#eeeeee] w-fit rounded-lg cursor-pointer hover:scale-105 transition-all"
          >
            <div class="block rounded-lg bg-black w-72">
              <div
                class="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <img
                  src="data:image/jpeg;base64,{product.imagen}"
                  alt={product.nombre}
                  class="rounded-lg sm:m-h-64 md:h-64 w-full"
                />
              </div>
            </div>

            <div class="p-2">
              <div class="flex justify-between text-black">
                <h5 class="mb-2 text-sm font-bold leading-tigh">
                  {product.nombre}
                </h5>
                <h5 class="mb-2 text-sm font-bold leading-tigh">
                  {product.codigo}
                </h5>
              </div>
            </div>
          </article>
        </a>
      {/each}
    </section>
  </main>
{:else}
  <Navbar />
  <section>
    <div class="ml-4 mt-4 flex">
      <label for="categoria" class="block font-medium"
        >Categoria del producto a buscar</label
      >
      <select
        bind:value={categoria}
        id="categoria"
        name="categoria"
        class="ml-1 mt-[-0.20rem] text-black"
      >
        <option value="Todos" selected>Todos</option>
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
  </section>
  <main class="mt-8 flex justify-center">
    <section class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {#each data as product}
        <a href="/electroshop/{product.id}">
          <article
            class="bg-[#eeeeee] w-fit rounded-lg cursor-pointer hover:scale-105 transition-all"
          >
            <div class="block rounded-lg bg-black w-72">
              <div
                class="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <img
                  src="data:image/jpeg;base64,{product.imagen}"
                  alt={product.nombre}
                  class="rounded-lg sm:m-h-64 md:h-64 w-full"
                />
              </div>
            </div>

            <div class="p-2">
              <div class="flex justify-between text-black">
                <h5 class="mb-2 text-sm font-bold leading-tigh">
                  {product.nombre}
                </h5>
                <h5 class="mb-2 text-sm font-bold leading-tigh">
                  {product.codigo}
                </h5>
              </div>
            </div>
          </article>
        </a>
      {/each}
    </section>
  </main>
{/if}
