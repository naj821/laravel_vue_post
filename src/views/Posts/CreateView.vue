<script setup>
import { usePostsStore } from "@/stores/posts";
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import ButtonLoading from "@/components/ButtonLoading.vue";

const { createPost } = usePostsStore();
const { errors } = storeToRefs(usePostsStore());
const isLoading = usePostsStore();

const formData = reactive({
  title: "",
  content: "",
});
</script>
<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create a new post</h2>
    <form @submit.prevent="createPost(formData)" class="space-y-4" name="createPostForm">
      <div class="mb-4">
        <label class="block text-gray-700"
          >Title
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            name="title"
            v-model="formData.title"
          />
        </label>

        <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
      </div>
      <div class="mb-4">
        <textarea
          rows="10"
          name="content"
          placeholder="Write your post here..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          v-model="formData.content"
        ></textarea>
        <p v-if="errors.content" class="error">{{ errors.content[0] }}</p>
      </div>
      <button
        type="submit"
        class="primary-btn w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
      >
        <span v-if="!isLoading.loading">Create Post</span>
        <ButtonLoading v-else />
      </button>
    </form>
  </div>
</template>
