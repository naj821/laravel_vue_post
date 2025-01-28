<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import ButtonLoading from "@/components/ButtonLoading.vue";

const { authenticate } = useAuthStore();
const { errors } = storeToRefs(useAuthStore());
const isLoading = useAuthStore();

const formData = reactive({
  email: "",
  password: "",
});

onMounted(() => (errors.value = {}));
</script>
<template>
  <main>
    <h1 class="title">Login your account</h1>
    <form
      @submit.prevent="authenticate('login', formData)"
      class="w-1/2 mx-auto space-y-6"
    >
      <div>
        <input type="text" placeholder="Email" v-model="formData.email" />
        <p v-if="errors.email" class="error">{{ errors.email[0] }}</p>
      </div>
      <div>
        <input type="password" placeholder="Password" v-model="formData.password" />
      </div>
      <button class="primary-btn">
        <span v-if="!isLoading.loading">Login</span>
        <ButtonLoading v-else />
      </button>
    </form>
  </main>
</template>
