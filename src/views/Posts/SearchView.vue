<script setup>
import { usePostsStore } from "@/stores/posts";
import { ref, watchEffect } from "vue";

const { searchPost } = usePostsStore();
const searchedQuery = ref("");
const searchResults = ref([]);

//To Trigger the search
const performSearch = async () => {
  searchResults.value = await searchPost(searchedQuery.value);
};
// watchEffect(() => {
//   performSearch();
// });
</script>

<template>
  <!-- START of SEARCH -->
  <div class="my-6 mx-6 w-48 flex items-center">
    <div class="relative w-full">
      <input
        @keyup.enter="performSearch"
        type="text"
        name="search"
        v-model="searchedQuery"
        placeholder="Search posts..."
        class="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
      <button
        type="button"
        @click="performSearch"
        class="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <svg
          class="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
  <!-- REAL -->

  <div v-if="searchResults.data">
    <div
      v-for="post in searchResults.data"
      :key="post.id"
      class="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 relative"
    >
      <h2 class="text-3xl font-semibold mb-3 text-indigo-600">{{ post.title }}</h2>
      <p class="text-gray-500 mb-2 absolute top-0 right-0 mt-4 mr-4">
        Posted by <span class="font-medium text-gray-700">{{ post.user.name }}</span>
      </p>
      <p class="text-gray-700 leading-relaxed">{{ post.content }}</p>
      <RouterLink :to="{ name: 'home' }" class="text-indigo-500 hover:underline">
        Read more
      </RouterLink>
    </div>
  </div>
  <div v-else class="p-6 mb-6 text-center flex items-center justify-center min-h-[50vh]">
    <div>
      <h2 class="text-2xl font-semibold mb-3 text-gray-600">Post does not exist</h2>
      <p class="text-gray-500">Please check back later.</p>
    </div>
  </div>
  <!--REAL  -->
</template>
