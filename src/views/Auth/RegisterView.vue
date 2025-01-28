<script setup>
import { reactive, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import ButtonLoading from "@/components/ButtonLoading.vue";

const { errors } = storeToRefs(useAuthStore());
const { authenticate } = useAuthStore();
const isLoading = useAuthStore();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

import { ref, watch } from "vue";

const emailError = ref("");

watch(
  () => formData.email,
  (newEmail) => {
    emailError.value = !emailRegex.test(newEmail) ? "Invalid email format" : "";
  }
);

onMounted(() => (errors.value = {}));
</script>

<template>
  <main>
    <h1 class="title">Register a new account</h1>

    <form
      @submit.prevent="authenticate('register', formData)"
      class="w-1/2 mx-auto space-y-6"
    >
      <div>
        <input type="text" placeholder="Name" v-model="formData.name" />
        <p v-if="errors.name" class="error">{{ errors.name[0] }}</p>
      </div>
      <div>
        <input type="text" placeholder="Email" v-model="formData.email" />
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="formData.password" />
        <p v-if="errors.password" class="error">{{ errors.password[0] }}</p>
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="formData.password_confirmation"
        />
      </div>
      <div>
        <button class="primary-btn" :disabled="emailError">
          <span v-if="!isLoading.loading">Register</span>
          <ButtonLoading v-else />
        </button>
      </div>
    </form>
  </main>
</template>
