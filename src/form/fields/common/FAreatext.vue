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
    <Input v-else class="field-box-right" :rows="4" type="textarea" v-model="data.value" :placeholder="data.placeholder" :disabled="disabled"></Input>
  </div>
</template>

<script>
export default {
  props: ['data', 'disabled', 'mode'],
  methods: {
    validate() {
      const value = this.data.value.trim()
      const {required, label, minLength, length} = this.data
      if(required) {
        if(value == '') {
          this.isInvalide = true
          this.$Message.error(`【${label}】不能为空！`)
          return false
        }
      }
      if(value.length < minLength) {
        this.isInvalide = true
        this.$Message.error(`【${label}】至少输入${minLength}个字符`)
        return false
      }
      if(value.length > length) {
        this.isInvalide = true
        this.$Message.error(`【${label}】字数超过最大长度【${length}】`)
        return false
      }
      this.isInvalide = false
      return true
    }
  },
}
</script>

<style>

</style>
