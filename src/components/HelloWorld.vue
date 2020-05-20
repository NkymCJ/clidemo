<template>
  <div class="hello-world">
    {{ name }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      name: '哈喽，你好'
    }
  }
}
</script>

<style lang="scss" scoped>
.hello-world {
  color: $primary;

  &:hover {
    color: $primary_hover;
  }
}
</style>
