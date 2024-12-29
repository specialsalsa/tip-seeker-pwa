<template>
  <div class="container">
    <v-card class="card" rounded="lg" elevation="2">
      <v-card-title>Login</v-card-title>
      <v-form @submit.prevent="login()">
        <v-text-field
          class="text-field"
          v-model="username"
          label="Username"
        ></v-text-field>
        <v-text-field
          class="text-field"
          type="password"
          v-model="password"
          label="Password"
        ></v-text-field>
        <v-btn type="submit" class="submit-button">Login</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from "~/store/store";
  import { getCsrfTokenFromMemory } from "~/util/util";

  const username = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const modalOpen = ref(false);
  const modalText = ref("");
  let csrfToken = getCsrfTokenFromMemory();
  const store = useUserStore();

  onMounted(() => {
    store.loadingTokenAuth = false;
  });

  const signUp = () => {
    if (password.value !== confirmPassword.value) {
      modalText.value = "Passwords do not match";
      modalOpen.value = true;
      return;
    }
    if (!username || !password) {
      modalText.value = "Invalid username or password";
      return;
    }
  };

  const login = async () => {
    if (!username || !password) {
      modalText.value = "Please fill out username and password";
      modalOpen.value = true;
      return;
    }

    const res = await fetch("https://wildlyle.dev:8020/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // "X-Csrf-Token": csrfToken!,
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      modalText.value = "Invalid username or password";
      modalOpen.value = true;

      return;
    }
    store.isLoggedIn = true;

    const json = await res.json();
    localStorage.setItem("token", json.token);
  };
</script>

<style></style>
