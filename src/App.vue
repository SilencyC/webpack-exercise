// ./src/App.vue

<template>
  <div class="app">
    <h1>vue app</h1>
    <p><img :src="imgSrc" /></p>
    <div v-for="(item, index) in count" :key="index">
      <span class="iconfont icon-dizhiaddress"></span>
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import imgSrc from '@/assets/images/01.jpg';

export default {
  data() {
    return {
      imgSrc,
      count: 20,
    };
  },
};
</script>

<style lang="less" scoped>
.app {
  color: yellow;
}
</style>