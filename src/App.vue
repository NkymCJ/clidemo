<template>
  <div id="app">
    <h1 class="title">App</h1>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss" scope>
  .title {
    color: $primary;
  }
</style>
