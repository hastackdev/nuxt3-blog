<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="text-xl font-semibold">Blog Page</div>
    <div class="relative flex justify-end mb-7">
      <NuxtLink
        to="/blog/create"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
      >
        Add Post
      </NuxtLink>
    </div>

    <div v-for="blog in data" class="relative w-full border rounded-lg p-5 mb-6" :key="blog.id">
      <div class="text-lg font-semibold mb-3">{{ blog.title }}</div>
      <p>{{ blog.content }}</p>

      <div class="relative flex justify-end pt-3">
        <button
          @click="() => onDelete(blog.id)"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none mr-2"
        >
          Delete
        </button>
        <NuxtLink
          :to="'/blog/' + blog.id"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none mr-2"
        >
          Edit
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogModel } from '~~/server/model/blog';
useHead({
  title: 'Blog Page'
});

const data = ref<BlogModel[]>([]);

const fetchData = async () => {
  try {
    const result = await $fetch('/api/blog');
    data.value = result.data as BlogModel[];
  } catch {
    alert('Fetch error');
  }
};

const onDelete = async (id: number) => {
  try {
    await $fetch('/api/blog/' + id, {
      method: 'DELETE'
    });

    await fetchData();
  } catch {
    alert('Delete error');
  }
};

onMounted(fetchData);
</script>
