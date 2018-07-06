<template>
  <div class="field-box" >
    <div v-if="mode !== 'list'" class="field-box-left">
      <div class="field-box-left-required" v-if="data.required && !data.readonly">*</div>
      <div>
        <p>{{data.label}}：</p>
        <p v-if="disabled" style="color: #bababa;">{{data.columnKey}}&nbsp;&nbsp;&nbsp;</p>
      </div>
    </div>
    <div class="readonly-text" :style="{textAlign: mode == 'list' ? 'center' : 'left'}" v-if="data.readonly && files">
      <p v-for="(file,i) in files" :key="i">
        <a :href="file.url" target="_blank">{{file.name}}</a>
      </p>
    </div>
    <Upload v-else class="field-box-right" style="margin: 6px 2px 0 0;"
        :show-upload-list="true" :accept="data.accept"
        :multiple="data.multiple" v-model="data.value" :placeholder="data.placeholder" :disabled="disabled"
        type="drag" :headers="headers" name="files"
        :on-success="onSuccess"
        :action="uploadUrl">
        <div class="app-center" style="padding: 12px 0;">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <div style="margin-left: 24px;">
              <p>点击或拖拽文件到此处进行上传</p>
              <p v-if="data.accept">支持以下文件类型上传：【{{data.accept}}】</p>
            </div>
        </div>
    </Upload>
    <div class="field-box-right field-mask" v-if="disabled">
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'disabled', 'mode'],
  data() {
    return {
      isInvalide: false,
    }
  },
  computed: {
    headers() {
      return {
        // Authorization: 'Bearer ' + this.$store.getters.token,
      }
    },
    //TODO
    uploadUrl() {
      // return `http://192.168.2.133:5501/report/upload`
      // return `${REST_API}/flowable/v1/file/upload`
      return ''
    },
    files() {
      let result = []
      let arr = []
      if(_.isString(this.data.value)) {
        arr = JSON.parse(this.data.value)
      } else if(_.isArray(this.data.value)) {
        arr = this.data.value
      }
      arr.forEach(v => {
        const arr = v.split('|')
        let name = ''
        let url = ''
        if(arr.length > 0) {
          result.push({
            name: arr[0],
            // url: REST_API+'/flowable/uploadfile/'+arr[1]
            // url: REST_API+'/flowable/uploadfile/'+arr[1]
            url: ''
          })
        }
      })
      return result
    }
  },
  methods: {
    validate() {
      return true
    },
    onSuccess(v) {
      this.data.value = [...this.data.value, v.hyz_result[0]]
      console.log(this.data.value);
    }
  },
}
</script>

<style>

</style>
