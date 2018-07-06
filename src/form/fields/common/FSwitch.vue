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
    <i-switch v-else :disabled="disabled" v-model="data.value"></i-switch>
  </div>
</template>

<script>
export default {
  props: ['data', 'disabled', 'mode'],
  methods: {
    validate() {
      return true
    }
  }
}
</script>

<style>

</style>
