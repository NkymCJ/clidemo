<template>
  <div class="home">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      content: 'Home'
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {}
</style>
