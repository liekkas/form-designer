<template>
  <h3 class="f-root">
    {{data.label}}
  </h3>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>
  .f-root {
    width: 100%;
    text-align: center;
    padding: 12px;
    min-height: 42px;
  }
</style>
