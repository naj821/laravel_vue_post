<script setup>
import { reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import ButtonLoading from "@/components/ButtonLoading.vue";

//use if all of the function/action in auth.js is used in this file
//this is always reactive
// const authStore = useAuthStore();
//another approach for extracting the function at the same time it is reactive
const { errors } = storeToRefs(useAuthStore());

//if there is only function that is used, you can extract the function by using this
//but this is not reactive anymore(don't load in UI)
const { authenticate } = useAuthStore();
const isLoading = useAuthStore();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

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
        <button class="primary-btn">
          <span v-if="!isLoading.loading">Register</span>
          <ButtonLoading v-else />
        </button>
      </div>
    </form>
  </main>
</template>
