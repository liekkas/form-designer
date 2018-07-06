<template>
  <div class="f-root">
    <div class="f-item">
      <div class="f-item-left">
        <div class="f-item-left-required" v-if="data.fields[0].required">*</div>
        <div>
          <p>{{data.fields[0].label}}：</p>
          <p v-if="disabled" style="color: #bababa;">{{data.fields[0].columnKey}}&nbsp;&nbsp;&nbsp;</p>
        </div>
      </div>
      <Input class="f-item-right" v-model="data.fields[0].value" 
        @on-blur="validate(data.fields[0])"  :placeholder="data.fields[0].placeholder" :disabled="disabled"></Input>
    </div>

    <div class="f-item">
      <div class="f-item-left">
        <div class="f-item-left-required" v-if="data.fields[1].required">*</div>
        <div>
          <p>{{data.fields[1].label}}：</p>
          <p v-if="disabled" style="color: #bababa;">{{data.fields[1].columnKey}}&nbsp;&nbsp;&nbsp;</p>
        </div>
      </div>
      <Input class="f-item-right" v-model="data.fields[1].value" 
        @on-blur="validate(data.fields[1])"  :placeholder="data.fields[1].placeholder" :disabled="disabled"></Input>
    </div>

    <div class="f-item">
      <div class="f-item-left">
        <div class="f-item-left-required" v-if="data.fields[2].required">*</div>
        <div>
          <p>{{data.fields[2].label}}：</p>
          <p v-if="disabled" style="color: #bababa;">{{data.fields[2].columnKey}}&nbsp;&nbsp;&nbsp;</p>
        </div>
      </div>
      <Input class="f-item-right" v-model="data.fields[2].value" 
        @on-blur="validate(data.fields[2])"  :placeholder="data.fields[2].placeholder" :disabled="disabled"></Input>
    </div>

    <div class="f-item">
      <div class="f-item-left">
        <div class="f-item-left-required" v-if="data.fields[3].required">*</div>
        <div>
          <p>{{data.fields[3].label}}：</p>
          <p v-if="disabled" style="color: #bababa;">{{data.fields[3].columnKey}}&nbsp;&nbsp;&nbsp;</p>
        </div>
      </div>
      <Input class="f-item-right" v-model="data.fields[3].value" 
        @on-blur="validate(data.fields[3])"  :placeholder="data.fields[3].placeholder" :disabled="disabled"></Input>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'disabled'],
  methods: {
    validate(v) {
      const value = v.value.trim()
      const {required, label, minLength, length} = v
      if(required) {
        if(value == '') {
          v.isInvalide = true
          this.$Message.error(`【${label}】不能为空！`)
          return false
        }
      }
      if(value.length < minLength) {
        v.isInvalide = true
        this.$Message.error(`【${label}】至少输入${minLength}个字符`)
        return false
      }
      if(value.length > length) {
        v.isInvalide = true
        this.$Message.error(`【${label}】字数超过最大长度【${length}】`)
        return false
      }
      v.isInvalide = false
      console.log('v is ', v);
      return true
    }
  },
}
</script>

<style lang="less" scoped>
  @import '../../theme';

  .f-root {
    width: 100%;
    text-align: center;
    min-height: 42px;
    display: flex;
    flex-wrap: wrap;
  }

  .f-item {
    width: 50%;
    display: flex;
    align-items: center;
    padding: 4px;
    min-height: 40px;
    border-bottom: 1px solid @border-color-base;
    margin-bottom: -1px;
    &:nth-child(2n) {
      border-left: 1px solid @border-color-base;
      margin-left: -1px;
    }

    &-left {
      width: 40%;
      min-width: 100px;
      text-align: right;
      font-weight: bold;
      font-size: 11px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      &-required {
        color: red; 
        font-size:16px; 
        margin-top:5px; 
        margin-right:2px;
      }
    }

    &-right {
      width: 60%;
    }
  }
</style>
