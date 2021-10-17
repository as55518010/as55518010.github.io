<template>
  <div>
    <BlogAuthorIng />
    <BlogAuthorAside />
  </div>
</template>

<script>
import BlogAuthorIng from './components/BlogAuthorIng.vue'
import BlogAuthorAside from './components/BlogAuthorAside'

export default {
  name: 'BlogAuthorBody',
  components: { BlogAuthorAside, BlogAuthorIng }
}
</script>

<style scoped>

</style>
