<script setup>
import { usePostsStore } from "@/stores/posts";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import LoadingIndicator from "@/components/LoadingGlobal.vue";

const route = useRoute();
const { getPost, deletePost } = usePostsStore();
const authStore = useAuthStore();
const isLoading = usePostsStore();
const post = ref({});

onMounted(async () => {
  post.value = await getPost(route.params.id);
});
</script>

<template>
  <main>
    <LoadingIndicator v-if="isLoading.loading" />
    <div v-else>
      <div v-if="post && post.user" class="mt-6">
        <div class="bg-white shadow-lg rounded-lg p-6 mb-6 relative">
          <h2 class="text-3xl font-semibold mb-3 text-indigo-600">{{ post.title }}</h2>
          <p class="text-gray-500 mb-2 absolute top-0 right-0 mt-4 mr-4">
            Posted by <span class="font-medium text-gray-700">{{ post.user.name }}</span>
          </p>
          <p class="text-gray-700 leading-relaxed">{{ post.content }}</p>
          <div v-if="authStore.user && authStore.user.id === post.user.id" class="mt-6">
            <div class="flex items-center space-x-4">
              <RouterLink
                :to="{ name: 'update', params: { id: post.id } }"
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >Update</RouterLink
              >
              <form @submit.prevent="deletePost(post)">
                <button
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="p-6 mb-6 text-center flex items-center justify-center min-h-[50vh]"
      >
        <div>
          <h2 class="text-2xl font-semibold mb-3 text-gray-600">Post does not exist</h2>
          <p class="text-gray-500">Please check back later.</p>
        </div>
      </div>
    </div>
  </main>
</template>
