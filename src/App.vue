<template>
  <div id="app">
    <router-link to="/" tag="li">
      <a>Home</a>
    </router-link>
    <router-link to="/todos" tag="li">
      <a>Todo</a>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
  }
</script>

<style>
</style>
