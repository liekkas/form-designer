<template>
  <Modal
      v-model="isShow" width="1000"
      @on-cancel="cancel">
      <Tabs :animated="false" v-model="tab">
        <TabPane name="formView" label="表单预览" style="overflow: auto;height: 420px;">
          <form-view ref="form" :data="data" :readonly="readonly"></form-view>
          <Button type="primary" style="margin: 0 45%;width: 10%;" @click="testCheck">{{btnLabel}}</Button>
        </TabPane>
        <TabPane name="dataView" label="数据预览">
          <editor :value="jsonStr" :options="{readOnly: true}"
            lang="javascript" theme="chrome" width="100%" height="420"></editor>
        </TabPane>
      </Tabs>
    <div slot="footer">
      
    </div>
  </Modal>
</template>

<script>
import formView from './formView';
import editor from './comps/AceEditor'
import 'brace/theme/chrome';
import 'brace/mode/javascript';
import _ from 'lodash';
export default {
  props: ['show', 'data', 'formInfo'],
  components: {formView, editor},
  data () {
      return {
          isShow: this.show,
          readonly: false,
          tab: 'formView',
          btnLabel: '开始验证',
          priviewData: []
      }
  },
  watch: {
    show(v) {
      this.isShow = v
      if(v) {
        this.tab = 'formView'
      }
    }
  },
  mounted() {
    this.priviewData = _.cloneDeep(this.data)
  },
  computed: {
    jsonStr() {
      const json = {
        ...this.formInfo,
        fields: this.data,
      }
      return JSON.stringify(json, null, 4)
    },
  },
  methods: {
    cancel () {
      this.$emit('close-modal')
    },
    testCheck() {
      if(this.btnLabel == '开始验证') {
        const value = this.$refs.form.value()
        console.log('test check value is', value);
        if(value) {
          this.$Message.success('验证通过！')
          this.readonly = true
        }
        this.btnLabel = '再次验证'
      } else {
        this.readonly = false
        this.priviewData = _.cloneDeep(this.data)
        this.btnLabel = '开始验证'
      }
      
    }
  }
}
</script>

<style>
  .ivu-modal-close {
    z-index: 999;
  }
</style>
