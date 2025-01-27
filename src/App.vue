<script setup>
// import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
      <RouterLink :to="{ name: 'search' }" class="nav-link">Search</RouterLink>

      <div v-if="authStore.user" class="flex items-center space-x-6">
        <form @submit.prevent="authStore.logout">
          <!-- <RouterLink class="nav-link">My Posts</RouterLink> -->
          <RouterLink :to="{ name: 'create-post' }" class="nav-link">New Post</RouterLink>
          <button class="nav-link">Logout</button>
        </form>
      </div>

      <div v-else class="space-x-6">
        <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
        <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>
