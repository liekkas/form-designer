<template>
  <div class="f-root">
    <h4 v-if="!data.isHideHead" 
      :style="{textAlign: data.textAlign}">{{data.objectName}}</h4>
    <slot name="content"></slot>
    <div v-if="showBorder" class="wavy-line"></div>
  </div>
</template>

<script>
export default {
  props: ['data', 'showBorder']
}
</script>

<style scoped lang="less">
  @import '../../theme';
  .f-root {
    width: 100%;
    background-color: white;
  }
  h4 {
    padding: 12px;
    background-color: @table-thead-bg;
  }
  .wavy-line {
    width: 100%;
    height: 5px;
    background-image: radial-gradient(circle, transparent, transparent 4px, orange 4px, orange 5px, transparent 5px, transparent);
    background-size: 10px 10px;
  }
</style>
