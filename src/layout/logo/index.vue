<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p class="title">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
//引入设置标题与logo这配置文件
import setting from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;

  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    //line-height: $base-menu-logo-height;
  }
}
.title {
  display: inline-block;
  height: 32px;
  margin: 2px 0 0 18px;
  overflow: hidden;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
