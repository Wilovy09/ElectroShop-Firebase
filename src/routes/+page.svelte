<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "../firebase.js";

  import "./app.css";
  import LoginCard from "../components/LoginCard.svelte";

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        goto("/electroshop");
      } else {
        console.log("User is logged out");
        goto("/");
      }
    });
  });
</script>

<LoginCard />
