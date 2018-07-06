<template>
  <div class="form-view">
    <div v-for="(item,i) in data" :key="i">
      <l-title class="form-title" :id="i" :data="item" v-if="item.type === 'title'"/>
      <l-area class="form-area" :id="i" :data="item" v-else-if="item.type === 'area'">
        <div class="form-item" slot="content"
              v-for="(field,j) in item.children" :key="j">
          <f-input ref="field" :readonly="readonly" :data="field" v-if="field.type === 'input'"></f-input>
          <f-areatext ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'textarea'"></f-areatext>
          <f-radio ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'radio'"></f-radio>
          <f-checkbox ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'checkbox'"></f-checkbox>
          <f-select ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'select'"></f-select>
          <f-switch ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'switch'"></f-switch>
          <f-date ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'date'"></f-date>
          <f-date-range ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'daterange'"></f-date-range>
          <f-number ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'number'"></f-number>
          <b-staff-info ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'staff'"></b-staff-info>
          <f-rich-editor ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'richEditor'"></f-rich-editor>
          <f-rate ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'rate'"></f-rate>
          <f-upload ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'upload'"></f-upload>
        </div>                  
      </l-area>
      <l-subForm class="form-area" :id="i" :data="item" v-else-if="item.type === 'subForm' && item.displayType == 1">
        <div class="form-item" slot="content"
              v-for="(field,j) in item.children" :key="j">
          <f-input ref="field" :readonly="readonly" :data="field" v-if="field.type === 'input'"></f-input>
          <f-areatext ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'textarea'"></f-areatext>
          <f-radio ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'radio'"></f-radio>
          <f-checkbox ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'checkbox'"></f-checkbox>
          <f-select ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'select'"></f-select>
          <f-switch ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'switch'"></f-switch>
          <f-date ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'date'"></f-date>
          <f-date-range ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'daterange'"></f-date-range>
          <f-number ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'number'"></f-number>
          <b-staff-info ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'staff'"></b-staff-info>
          <f-rich-editor ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'richEditor'"></f-rich-editor>
          <f-rate ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'rate'"></f-rate>
          <f-upload ref="field" :readonly="readonly" :data="field" v-else-if="field.type === 'upload'"></f-upload>
        </div>
      </l-subForm>
      <l-subForm class="form-area" :id="i" :data="item" v-else-if="item.type === 'subForm' && item.displayType == 2">
        <div slot="content">
          <div class="list-form-box">
            <div class="list-form-header" v-for="(field,i) in item.children" :key="i">
              <div class="field-box-left-required" v-if="field.required && !readonly">*</div>
              <span>{{field.label}}</span>
            </div>
            <Button v-if="!readonly" size="small" style="margin: 4px; width: 90px;" type="primary" @click="addRow(item)" icon="plus"></Button>
          </div>
          <div class="list-form-box" v-for="(row,k) in item.values" :key="row.uuId">
            <div class="list-form-item" v-for="field in row.fields" :key="field.uuId">
              <f-input ref="field" :readonly="readonly" mode="list" :data="field" v-if="field.type === 'input'"></f-input>
              <f-areatext ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'textarea'"></f-areatext>
              <f-radio ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'radio'"></f-radio>
              <f-checkbox ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'checkbox'"></f-checkbox>
              <f-select ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'select'"></f-select>
              <f-switch ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'switch'"></f-switch>
              <f-date ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'date'"></f-date>
              <f-date-range ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'daterange'"></f-date-range>
              <f-number ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'number'"></f-number>
              <b-staff-info ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'staff'"></b-staff-info>
              <f-rich-editor ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'richEditor'"></f-rich-editor>
              <f-rate ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'rate'"></f-rate>
              <f-upload ref="field" :readonly="readonly" mode="list" :data="field" v-else-if="field.type === 'upload'"></f-upload>
            </div>
            <div v-if="!readonly" class="app-center" style="margin: 0 4px;">
              <div @click.stop="removeRow(item,row)" >
                <Icon type="android-close" class="icon-tiny" style="color: red;"></Icon>
              </div>
              <div @click.stop="cloneRow(item,row, k)" >
                <Icon type="ios-copy-outline" class="icon-tiny"></Icon>
              </div>
            </div>
          </div>
        </div>
      </l-subForm>
    </div>
  </div>
</template>

<script>
import {
  FAreatext,
  FCheckbox,
  FDate,
  FDateRange,
  FInput,
  FNumber,
  FRadio,
  FRichEditor,
  FSelect,
  FSwitch,
  FRate,
  FUpload,
  LArea,
  LSubForm,
  LTitle,
  BStaffInfo
} from "./fields";
import {fromPairs} from './utils/common';
import UID from './utils/uid';
import _ from 'lodash';
export default {
  props: ["data", 'readonly'],
  components: {
    FAreatext,
    FCheckbox,
    FDate,
    FDateRange,
    FInput,
    FNumber,
    FRadio,
    FRichEditor,
    FSelect,
    FSwitch,
    FRate,
    FUpload,
    LArea,
    LSubForm,
    LTitle,
    BStaffInfo
  },
  mounted() {
    console.log('data is ', this.data);
  },
  methods: {
    value() {
      let result = []
      const fields = this.$refs.field
      console.log('fields is', fields);

      let flag = true
      fields.forEach(field => {
        const areUOk = field.validate()
        if(!areUOk) {
          flag = false
        }
      })
      if(!flag) return false
      
      let mainAttr = {} //主表单字段
      let childFormAttrs = [] //子表单字段
      this.data.forEach(layout => {
        if(!_.isEmpty(layout.children)) {
          if(layout.type === 'area') {
            layout.children.forEach(field => this.setValue(mainAttr, field))
          } else if(layout.type === 'subForm') {
            let attributes = []
            childFormAttrs.push({
              id: layout.id,
              storageTableName: layout.storageTableName,
              attributes
            })
            if(layout.displayType == 1) {
              let attr = {}
              layout.children.forEach(field => this.setValue(attr, field))
              attributes.push(attr)
            } else { //列表状态下取值
              layout.values.forEach(row => {
                let attr = {}
                row.fields.forEach(field => this.setValue(attr, field))
                attributes.push(attr)
              })
            }
          }
        }
      })
      result.mainAttr = mainAttr
      result.childFormAttrs = childFormAttrs
      return result
    },
    setValue(item, field) {
      if(field.type === 'checkbox') {
        item['c_'+field.columnKey] = field.value.join(',')
      } else if(field.type === 'richEditor') {
        item['c_'+field.columnKey] = field.value
      } else if(field.type === 'date') {
        item['c_'+field.columnKey] = new Date(field.value).getTime()
      } else {
        item['c_'+field.columnKey] = field.value
      }
    },
    addRow(v) {
      const pairs = _.map(v.children, o => {
        return [[o.columnKey], o.value]
      })
      v.values.push({fields: _.cloneDeep(v.children), uuId: UID()})
      this.$forceUpdate()
    },
    removeRow(item, v) {
      item.values = _.reject(item.values, {uuId: v.uuId})
      this.$forceUpdate()
    },
    cloneRow(item, v, i) {
      let cloneItem = _.cloneDeep(v)
      cloneItem.uuId = UID()
      item.values.splice(i + 1, 0, cloneItem)
      this.$forceUpdate()
    }
  },
};
</script>

<style lang="less" src="./style.less">
</style>


