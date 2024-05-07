<script setup lang="ts">

</script>

<template>
  <div class="app">
    <div>
      {{$t('menu.home')}}
    </div>
    <div class="w-full flex">
      <img class="logo" src="../../../public/logo.svg" alt="">
    </div>
  </div>
</template>

<style scoped lang="less">
.app {
  display: flex;
  flex-direction: column;
}
.logo {
  width: 60%;
  height: 60%;
  object-fit: cover;
  margin: 0 auto;
}
</style>