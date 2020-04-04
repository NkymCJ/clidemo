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
  .home {
    @include font-size(20px);
  }
</style>
