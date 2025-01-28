<script setup>
import { usePostsStore } from "@/stores/posts";
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import LoadingIndicator from "@/components/LoadingGlobal.vue";

const { getPost, updatePost } = usePostsStore();
const { user } = storeToRefs(useAuthStore());
const { errors } = storeToRefs(usePostsStore());
const isLoading = usePostsStore();

const route = useRoute();
const router = useRouter();

const post = ref(null);

const formData = reactive({
  title: "",
  content: "",
});
onMounted(async () => {
  post.value = await getPost(route.params.id);

  if (user.value.id !== post.value.user.id) {
    router.push({ name: "home" });
  } else {
    formData.title = post.value.title;
    formData.content = post.value.content;
  }
});
</script>

<template>
  <LoadingIndicator v-if="isLoading.loading" />
  <div v-else class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Update your post</h2>
    <form
      @submit.prevent="updatePost(post, formData)"
      class="space-y-4"
      name="updatePostForm"
    >
      <div class="mb-4">
        <label class="block text-gray-700">
          Title
          <input
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            v-model="formData.title"
            name="title"
          />
        </label>

        <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
      </div>
      <div class="mb-4">
        <textarea
          rows="10"
          placeholder="Write your post here..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          v-model="formData.content"
          name="content"
        ></textarea>
        <p v-if="errors.content" class="error">{{ errors.content[0] }}</p>
      </div>
      <button
        class="primary-btn w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Update Post
      </button>
    </form>
  </div>
</template>
