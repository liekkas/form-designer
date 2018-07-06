<template>
  <div class="field-box" >
    <div v-if="mode !== 'list' && !readonly" class="field-box-left">
      <div class="field-box-left-required" v-if="data.required">*</div>
      <div>
        <p>{{data.label}}：</p>
        <p v-if="disabled" style="color: #bababa;">{{data.columnKey}}&nbsp;&nbsp;&nbsp;</p>
      </div>
    </div>
    <div class="readonly-text" style="text-align: left; padding: 12px;" v-if="data.readonly" v-html="data.value">
    </div>
    <editor ref="editor" v-else class="field-box-right" v-model="data.value" :text.sync="pureText" :placeholder="data.placeholder" :disabled="disabled"></editor>
    <div class="field-box-right field-mask" v-if="disabled">
    </div>
  </div>
</template>

<script>
import Editor from '../../comps/WangEditor'

export default {
  props: ['data', 'disabled', 'mode'],
  components: {Editor},
  data() {
    return {
      pureText: ''
    }
  },
  methods: {
    validate() {
      const value = this.pureText.trim()
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
  }
}
</script>

<style>

</style>
