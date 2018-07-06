//通用字段
export var COMMON_FIELDS = [{
  type: "input",
  length: 20,
  minLength: 0,
  isAddIndex: false,
  required: false,
  groupType: "text",
  label: "单行文本",
  placeholder: "",
  value: "",
  defaultValue: "",
  attributeType: "varchar"
}, {
  type: "textarea",
  length: 200,
  minLength: 0,
  isAddIndex: false,
  required: false,
  groupType: "text",
  label: "多行文本",
  placeholder: "",
  value: "",
  defaultValue: "",
  attributeType: "varchar"
}, {
  type: "radio",
  length: 20,
  isAddIndex: false,
  required: false,
  groupType: "array",
  label: "单选框",
  arrayValue: ["选项1", "选项2", "选项3"],
  value: "",
  defaultValue: "",
  attributeType: "varchar"
}, {
  type: "checkbox",
  length: 20,
  isAddIndex: false,
  required: false,
  groupType: "array",
  label: "多选框",
  arrayValue: ["选项1", "选项2", "选项3"],
  value: [],
  defaultValue: "",
  attributeType: "varchar"
}, {
  type: "number",
  length: 20,
  isAddIndex: false,
  required: false,
  groupType: "text",
  label: "数字",
  placeholder: "",
  value: 0,
  defaultValue: 0,
  attributeType: "int"
}, {
  type: "switch",
  length: 20,
  isAddIndex: false,
  required: false,
  groupType: "boolean",
  label: "开关项",
  value: false,
  defaultValue: 0,
  attributeType: "int"
}, {
  type: "date",
  label: "日期",
  isAddIndex: false,
  required: false,
  placeholder: "请选择日期",
  value: "",
  defaultValue: "",
  attributeType: "datetime"
}, {
  type: "daterange",
  label: "日期区域",
  isAddIndex: false,
  required: false,
  placeholder: "请选择日期",
  value: [],
  defaultValue: "",
  attributeType: "datetime"
}, {
  type: "select",
  length: 20,
  isAddIndex: false,
  required: false,
  groupType: "array",
  label: "下拉框",
  arrayValue: ["选项1", "选项2", "选项3"],
  value: "",
  defaultValue: "",
  attributeType: "varchar"
}, {
  type: "richEditor",
  length: 16000,
  minLength: 0,
  isAddIndex: false,
  required: false,
  groupType: "editor",
  label: "富文本",
  value: "",
  defaultValue: "",
  attributeType: "varchar"
}, {
  type: "upload",
  length: 1000,
  maxSize: 10240,
  showUploadList: false,
  multiple: false,
  groupType: "common",
  accept: '',
  format: [],
  label: "附件上传",
  value: [],
  defaultValue: "",
  attributeType: "varchar"
}, {
  type: "rate",
  length: 2,
  count: 5, //星级总数
  showText: false,
  allowHalf: false, //是否允许半星
  groupType: "common",
  label: "等级评分",
  value: 0,
  defaultValue: "",
  attributeType: "int"
}];

export var LAYOUT_FIELDS = [
// {
//   type: "title",
//   groupType: "layout",
//   label: "标题",
// },
{
  type: "area",
  groupType: "layout",
  label: "表单区域",
  textAlign: 'left',
  children: []
}];

//业务字段，由一些通用字段组合而成
export var BIZ_FIELDS = [{
  type: "staff",
  groupType: "biz",
  label: "人员信息",
  placeholder: "",
  index: 0,
  fields: [{
    type: "input",
    length: 20,
    minLength: 0,
    isAddIndex: false,
    required: false,
    groupType: "text",
    label: "姓名",
    placeholder: "",
    value: "",
    defaultValue: "",
    attributeType: "varchar"
  }, {
    type: "input",
    length: 20,
    minLength: 0,
    isAddIndex: false,
    required: false,
    groupType: "text",
    label: "手机号",
    placeholder: "",
    value: "",
    defaultValue: "",
    attributeType: "varchar"
  }, {
    type: "input",
    length: 20,
    minLength: 0,
    isAddIndex: false,
    required: false,
    groupType: "text",
    label: "部门",
    placeholder: "",
    value: "",
    defaultValue: "",
    attributeType: "varchar"
  }, {
    type: "input",
    length: 20,
    minLength: 0,
    isAddIndex: false,
    required: false,
    groupType: "text",
    label: "职位",
    placeholder: "",
    value: "",
    defaultValue: "",
    attributeType: "varchar"
  }]
}];