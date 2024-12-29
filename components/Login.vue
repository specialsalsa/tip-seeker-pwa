<template>
  <div class="container" v-if="!onSignup">
    <h1 class="title">Login</h1>
    <v-container class="card">
      <!-- <v-card-title>Login</v-card-title> -->
      <v-form @submit.prevent="login()" class="form">
        <v-text-field
          class="text-field"
          v-model="username"
          label="Email"
          type="email"
        ></v-text-field>
        <v-text-field
          class="text-field"
          type="password"
          v-model="password"
          label="Password"
        ></v-text-field>
        <div class="btn-container">
          <v-btn type="submit" class="submit-button">Login</v-btn>
        </div>
      </v-form>
      <div class="signup-container">
        <span class="text-span">Don't have an account yet?</span>
        <span>&nbsp;</span>
        <a class="signup-link" @click="onSignup = true">Sign up</a>
      </div>
    </v-container>
  </div>
  <div class="container" v-else>
    <h1 class="title">Sign Up</h1>
    <v-container class="card">
      <!-- <v-card-title>Login</v-card-title> -->
      <v-form @submit.prevent="signUp()" class="form">
        <v-text-field
          class="text-field"
          v-model="username"
          label="Email"
          type="email"
        ></v-text-field>
        <v-text-field
          class="text-field"
          type="password"
          v-model="password"
          label="Password"
        ></v-text-field>
        <v-text-field
          class="text-field"
          type="password"
          v-model="confirmPassword"
          label="Confirm Password"
        ></v-text-field>
        <div class="btn-container">
          <v-btn type="submit" class="submit-button">Sign Up</v-btn>
        </div>
      </v-form>
      <div class="signup-container">
        <span class="text-span">Back to</span>
        <span>&nbsp;</span>
        <a class="signup-link" @click="onSignup = false">login</a>
      </div>
    </v-container>
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
  const onSignup = ref(false);
  let csrfToken = getCsrfTokenFromMemory();
  const store = useUserStore();

  onMounted(() => {
    store.loadingTokenAuth = false;
  });

  const signUp = async () => {
    if (password.value !== confirmPassword.value) {
      modalText.value = "Passwords do not match";
      modalOpen.value = true;
      return;
    }
    if (!username || !password) {
      modalText.value = "Invalid username or password";
      return;
    }

    const res = await fetch("https://wildlyle.dev:8020/signup", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": getCsrfTokenFromMemory()!,
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value,
        userKey: localStorage.getItem("userKey"),
      }),
    });

    if (!res.ok) {
      modalText.value = "Something went wrong, try again in a few seconds";
      modalOpen.value = true;
      return;
    }
    const json = await res.json();

    login();
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
        "X-Csrf-Token": getCsrfTokenFromMemory()!,
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

<style>
  .btn-container {
    display: flex;
    justify-content: center;
  }

  .signup-link {
    color: rgb(0, 190, 0);
  }

  .text-span {
    display: inline-block;
  }

  .signup-link:hover {
    cursor: pointer;
  }

  .signup-container {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .title {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
</style>
