<script setup>
import { usePostsStore } from "@/stores/posts";
import { onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import LoadingIndicator from "@/components/LoadingGlobal.vue";

const { getAllPosts, searchPost } = usePostsStore();
const posts = ref([]);
const isLoading = usePostsStore();

const formData = reactive({
  searchQuery: "",
});

onMounted(async () => {
  posts.value = await getAllPosts();
});
</script>

<template>
  <main>
    <!-- START of LOADING INDICATIR -->
    <LoadingIndicator v-if="isLoading.loading" />
    <!-- END of LOADING INDICATOR -->

    <!-- START of MAIN CONTENT -->
    <div v-else>
      <div v-if="posts.length > 0">
        <h1 class="title">Latest Post</h1>
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 relative"
        >
          <h2 class="text-3xl font-semibold mb-3 text-indigo-600">{{ post.title }}</h2>
          <p class="text-gray-500 mb-2 absolute top-0 right-0 mt-4 mr-4">
            Posted by <span class="font-medium text-gray-700">{{ post.user.name }}</span>
          </p>
          <p class="text-gray-700 leading-relaxed">{{ post.content }}</p>
          <RouterLink
            :to="{ name: 'show', params: { id: post.id } }"
            class="text-indigo-500 hover:underline"
          >
            Read more
          </RouterLink>
        </div>
      </div>
      <!-- END of MAIN CONTENT -->

      <!-- CHECK IF MAIN CONTENT !EMPTY -->
      <div
        v-else
        class="p-6 mb-6 text-center flex items-center justify-center min-h-[50vh]"
      >
        <div>
          <h2 class="text-2xl font-semibold mb-3 text-gray-600">No posts available</h2>
          <p class="text-gray-500">Please check back later.</p>
        </div>
      </div>
    </div>
    <!-- END OF CHECK -->
  </main>
</template>
