<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="text-xl font-semibold">Add Blog</div>

    <div class="mb-6">
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Title</label>
      <input
        v-model="form.title"
        type="text"
        id="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Enter title"
        required
      />
    </div>

    <div class="mb-6">
      <label for="content" class="block mb-2 text-sm font-medium text-gray-900">Content</label>
      <textarea
        v-model="form.content"
        id="content"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your content here..."
      ></textarea>
    </div>

    <div class="relative flex justify-end mb-7">
      <NuxtLink
        to="/blog"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none mr-2"
      >
        Back
      </NuxtLink>
      <button
        @click="onSubmit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Add Blog'
});

const form = reactive({
  title: '',
  content: ''
});

const router = useRouter();

const onSubmit = async () => {
  try {
    await $fetch('/api/blog', {
      method: 'POST',
      body: form
    });

    router.push('/blog');
  } catch {
    alert('Post blog error');
  }
};
</script>
