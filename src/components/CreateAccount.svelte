<script>
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase.js";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";

  let handleSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      goto("/electroshop");
    } catch (e) {
      console.error(e);
    }
  };
</script>

<main class="bg-[#fcfcfc]">
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-bold text-center">Crear cuenta</h1>

      <form on:submit|preventDefault={handleSubmit} class="mt-4">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Correo</label
          >
          <input
            bind:value={email}
            type="email"
            id="email"
            name="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Contraseña</label
          >
          <input
            bind:value={password}
            type="password"
            id="password"
            name="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-500 text-white font-semibold p-2 rounded-md"
          >Crear cuenta</button
        >
        <button
          type="button"
          class="mt-4 w-full bg-indigo-300 text-white font-semibold p-2 rounded-md"
          ><a href="/">Ya tengo cuenta</a></button
        >
      </form>
    </div>
  </div>
</main>
