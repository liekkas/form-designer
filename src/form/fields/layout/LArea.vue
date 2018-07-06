<template>
  <div class="f-root">
    <h4 v-if="!data.isHideHead"
          :style="{textAlign: data.textAlign, backgroundColor: data.bgColor}">{{data.label}}</h4>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped lang="less">
  @import '../../theme';
  .f-root {
    width: 100%;
  }
  h4 {
    padding: 12px;
    background-color: @table-thead-bg;
  }
</style>
