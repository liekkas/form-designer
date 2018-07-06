<template>
  <div class="field-box">
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
    <Select v-else :disabled="disabled" class="field-box-right" v-model="data.value">
      <Option v-for="item in data.arrayValue" 
        :key="item" :value="item">{{item}}</Option>
    </Select>
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
