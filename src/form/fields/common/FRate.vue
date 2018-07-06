<template>
  <div class="field-box" >
    <div v-if="mode !== 'list'" class="field-box-left">
      <div class="field-box-left-required" v-if="data.required && !data.readonly">*</div>
      <div>
        <p>{{data.label}}：</p>
        <p v-if="disabled" style="color: #bababa;">{{data.columnKey}}&nbsp;&nbsp;&nbsp;</p>
      </div>
    </div>
    <div class="readonly-text" :style="{textAlign: mode == 'list' ? 'center' : 'left'}" v-if="data.readonly">
      {{data.value}}
    </div>
    <Rate v-else class="field-box-right" :show-text="data.showText" :allow-half="data.allowHalf" :count="data.count" v-model="data.value" :disabled="disabled"></Rate>
  </div>
</template>

<script>
export default {
  props: ['data', 'disabled', 'mode'],
  data() {
    return {
      isInvalide: false
    }
  },
  methods: {
    validate() {
      return true
    }
  },
}
</script>

<style>

</style>
