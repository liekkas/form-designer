<template>
  <div class="new-form">
    <div class="form-field">
      <div style="margin-bottom: 12px; padding: 0; display: flex;justify-content: center;">
        <ButtonGroup>
          <Button shape="circle" type="primary" icon="ios-eye" @click="onPreivew">预览</Button>&nbsp;&nbsp;
          <Button shape="circle" type="ghost" icon="bookmark" @click="onSave">保存</Button>&nbsp;&nbsp;
          <!-- <Button shape="circle" type="ghost" icon="ios-download-outline" @click="onExport">下载</Button>&nbsp;&nbsp; -->
          <Button shape="circle" type="ghost" icon="ios-reload" @click="onReset">重置</Button>
          <!-- <Button v-if="isUpdate" shape="circle" type="ghost" icon="ios-arrow-back" @click="onBack">返回</Button> -->
        </ButtonGroup>
      </div>

      <!-- 字段 -->
      <Collapse v-model="colStatus">
        <Panel name="other" v-show="isMainForm">
            表单字段
            <Poptip trigger="hover" style="font-weight: normal;">
                <Icon style="font-size: 13px;font-weight: bold;" type="ios-help-outline"></Icon>
                <div slot="content">
                  <p>先拖拽表单字段</p>
                  <p>通用字段和业务字段需要在表单字段中创建</p>
                </div>
            </Poptip>
            <div class="form-item-box" slot="content">
              <draggable style="width: 50%;" v-model="layouts"
                      :options="layoutDragOption">
                <div class="form-item-left" v-for="(item,i) in layouts" v-if="i%2===0" :key="i">
                    <img :src="'/static/icons/'+item.type+'.png'" width="20">
                    <div style="padding: 6px;">{{item.label}}</div>
                </div>
              </draggable>
              <draggable style="width: 50%;"  v-model="layouts"
                    :options="layoutDragOption">
                <div class="form-item-right" v-for="(item,i) in layouts"  v-if="i%2===1" :key="i">
                    <img :src="'/static/icons/'+item.type+'.png'" width="20">
                    <div style="padding: 6px;">{{item.label}}</div>
                </div>
              </draggable>
            </div>
          </Panel>
          <Panel name="common" >
              通用字段
              <div class="form-item-box" slot="content">
                <draggable style="width: 50%;" v-model="commons"
                      :options="formDragOption">
                  <div class="form-item-left" v-for="(item,i) in commons" v-if="i%2===0" :key="i">
                      <img :src="'/static/icons/'+item.type+'.png'" width="20">
                      <div style="padding: 6px;">{{item.label}}</div>
                  </div>
                </draggable>
                <draggable style="width: 50%;"  v-model="commons"
                      :options="formDragOption">
                  <div class="form-item-right" v-for="(item,i) in commons"  v-if="i%2===1" :key="i">
                      <img :src="'/static/icons/'+item.type+'.png'" width="20">
                      <div style="padding: 6px;">{{item.label}}</div>
                  </div>
                </draggable>
              </div>
          </Panel>
          <Panel name="biz">
            业务字段
            <div class="form-item-box" slot="content">
              <draggable style="width: 50%;" v-model="bizs"
                      :options="formDragOption">
                <div class="form-item-left" v-for="(item,i) in bizs" v-if="i%2===0" :key="i">
                    <img :src="'/static/icons/'+item.type+'.png'" width="20">
                    <div style="padding: 6px;">{{item.label}}</div>
                </div>
              </draggable>
              <draggable style="width: 50%;"  v-model="bizs"
                    :options="formDragOption">
                <div class="form-item-right" v-for="(item,i) in bizs"  v-if="i%2===1" :key="i">
                    <img :src="'/static/icons/'+item.type+'.png'" width="20">
                    <div style="padding: 6px;">{{item.label}}</div>
                </div>
              </draggable>
            </div>
          </Panel>
      </Collapse>
    </div>


    <!-- 内容区 -->
      <Tabs class="form-tabs" :animated="false" type="card" 
            @on-click="changeForm" v-model="tabForm"
            @on-tab-remove="removeSubForm"	>
        <TabPane name="main" label="主表单" icon="star">
          <div class="form-content-box">
            <div class="form-content">
              <draggable class="form-drag" v-model="fields" element="div"
                        :options="{group: {name:'layout'}}" 
                        @add="onAdd($event)">
                <div class="form-drag-item" v-for="(item,i) in fields" 
                    :class="{'form-select': selectField && (item.uuId === selectField.uuId)}"
                    style="margin-bottom: 8px;"
                    :key="i" @click="setAttri(item)">
                  <div class="field-tool">
                    <div @click.stop="removeField(item,i)" >
                      <Icon type="android-close" class="icon-tiny" style="color: red;"></Icon>
                    </div>
                    <div @click.stop="cloneField(item,i)" >
                      <Icon type="ios-copy-outline" class="icon-tiny"></Icon>
                    </div>
                  </div>
                  <l-title :data="item" v-if="item.type === 'title'"/>
                  <l-area :data="item" v-else-if="item.type === 'area'">
                    <draggable slot="content"
                      v-model="item.children" style="min-height: 80px;"
                      :options="{group: {name:'form'}}" @add="onFieldAdd($event, item)">
                      <div  class="form-drag-item" 
                            :class="{'form-select': selectField && (field.uuId === selectField.uuId)}"
                            v-for="(field,j) in item.children" :key="j"
                            @click.stop="setAttri(field)">
                        <div class="sub-field-tool">
                          <div @click.stop="removeSubField(item.children,field,j)" >
                            <Icon type="android-close" class="icon-tiny" style="color: red;"></Icon>
                          </div>
                          <div @click.stop="cloneSubField(item.children,field,j)" >
                            <Icon type="ios-copy-outline" class="icon-tiny"></Icon>
                          </div>
                        </div>
                        <f-input :data="field" :disabled="true" v-if="field.type === 'input'"></f-input>
                        <f-areatext :data="field" :disabled="true" v-else-if="field.type === 'textarea'"></f-areatext>
                        <f-radio :data="field" :disabled="true" v-else-if="field.type === 'radio'"></f-radio>
                        <f-checkbox :data="field" :disabled="true" v-else-if="field.type === 'checkbox'"></f-checkbox>
                        <f-select :data="field" :disabled="true" v-else-if="field.type === 'select'"></f-select>
                        <f-switch :data="field" :disabled="true" v-else-if="field.type === 'switch'"></f-switch>
                        <f-date :data="field" :disabled="true" v-else-if="field.type === 'date'"></f-date>
                        <f-date-range :data="field" :disabled="true" v-else-if="field.type === 'daterange'"></f-date-range>
                        <f-number :data="field" :disabled="true" v-else-if="field.type === 'number'"></f-number>
                        <b-staff-info :data="field" :disabled="true" v-else-if="field.type === 'staff'"></b-staff-info>
                        <f-rich-editor :data="field" :disabled="true" v-else-if="field.type === 'richEditor'"></f-rich-editor>
                        <f-rate :data="field" :disabled="true" v-else-if="field.type === 'rate'"></f-rate>
                        <f-upload :data="field" :disabled="true" v-else-if="field.type === 'upload'"></f-upload>
                      </div>
                    </draggable>
                  </l-area>
                </div>
              </draggable>
            </div>
          </div>
        </TabPane>
        <TabPane closable v-for="item in subForms" :name="item.uuId" :key="item.uuId" :label="item.objectName">
          <div class="form-content-box">
            <div class="form-content">
              <l-subForm :showBorder="true" :data="item">
                <draggable slot="content"
                  v-model="item.children" style="min-height: 80px;"
                  :options="{group: {name:'form'}}" @add="onFieldAdd($event, item)">
                  <div class="form-drag-item" 
                        :class="{'form-select': selectField && (field.uuId === selectField.uuId)}"
                        v-for="(field,j) in item.children" :key="j"
                        @click.stop="setAttri(field)">
                    <div class="sub-field-tool">
                      <div @click.stop="removeSubField(item.children,field,j)" >
                        <Icon type="android-close" class="icon-tiny" style="color: red;"></Icon>
                      </div>
                      <div @click.stop="cloneSubField(item.children,field,j)" >
                        <Icon type="ios-copy-outline" class="icon-tiny"></Icon>
                      </div>
                    </div>
                    <f-input :data="field" :disabled="true" v-if="field.type === 'input'"></f-input>
                    <f-areatext :data="field" :disabled="true" v-else-if="field.type === 'textarea'"></f-areatext>
                    <f-radio :data="field" :disabled="true" v-else-if="field.type === 'radio'"></f-radio>
                    <f-checkbox :data="field" :disabled="true" v-else-if="field.type === 'checkbox'"></f-checkbox>
                    <f-select :data="field" :disabled="true" v-else-if="field.type === 'select'"></f-select>
                    <f-switch :data="field" :disabled="true" v-else-if="field.type === 'switch'"></f-switch>
                    <f-date :data="field" :disabled="true" v-else-if="field.type === 'date'"></f-date>
                    <f-date-range :data="field" :disabled="true" v-else-if="field.type === 'daterange'"></f-date-range>
                    <f-number :data="field" :disabled="true" v-else-if="field.type === 'number'"></f-number>
                    <b-staff-info :data="field" :disabled="true" v-else-if="field.type === 'staff'"></b-staff-info>
                    <f-rich-editor :data="field" :disabled="true" v-else-if="field.type === 'richEditor'"></f-rich-editor>
                    <f-rate :data="field" :disabled="true" v-else-if="field.type === 'rate'"></f-rate>
                    <f-upload :data="field" :disabled="true" v-else-if="field.type === 'upload'"></f-upload>
                  </div>
                </draggable>
              </l-subForm>
            </div>
          </div>
        </TabPane>
        <Button type="primary" icon="plus" @click="addSubForm" size="small" slot="extra">添加子表单</Button>
      </Tabs>

    <!-- 属性区 -->
    <div class="form-right">
      <div class="form-attribute" disabled>
        <Tabs :value="attrType" @on-click="changeAttrType">
          <Tab-pane label="表单属性" name="formAttr">
            <div v-if="curFormInfo && isMainForm">
              <div class="form-attr-item">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>表单名称:</h5>
                </div>
                <Input placeholder="请输入表单名称"
                  v-model="curFormInfo.objectName"></Input>
              </div>

              <div class="form-attr-item">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>对应存储表名称:
                    <Poptip trigger="hover" transfer placement="top" style="font-weight: normal;">
                        <Icon style="font-size: 12px;font-weight: bold;" type="ios-help-outline"></Icon>
                        <div slot="content">
                          <p>保存后会在数据库创建一张表,</p>
                          <p>表名自动添加"f_"前缀',版本号当后缀</p>
                          <p>比如输入"table"，假如当前版本为1，会创建"f_table_1"表。</p>
                        </div>
                    </Poptip>
                    <span v-if="isTableCreated" style="color: #ed3f14">&nbsp;&nbsp;该表已存在！</span>
                  </h5>
                </div>
                <Input :class="{ 'ivu-form-item-error .ivu-input' : isTableCreated }"  type="text" placeholder="请输入对应存储表名称"
                  @on-change="validateTableName" v-model="curFormInfo.showTableName">
                  <span slot="prepend">f_</span>
                  <span slot="append">_{{curFormInfo.flowVersion}}</span>
                </Input>
              </div>
              <div class="form-attr-item">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>表单类型:</h5>
                </div>
                <Select v-model="curFormInfo.objectType">
                  <Option :value="1">表单</Option>
                  <Option :value="2">工单</Option>
                  <Option :value="3">运算数据</Option>
                </Select>
              </div>
              <div class="form-attr-item">
                <h5>表单描述:</h5>
                <Input type="textarea" :rows="4" placeholder="请输入表单描述" v-model="curFormInfo.descInfo"></Input>
              </div>
            </div>
            <div v-if="curSubFormInfo && !isMainForm">
              <div class="form-attr-item">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>子表单名称:</h5>
                </div>
                <Input clearable placeholder="请输入子表单名称" 
                  v-model="curSubFormInfo.objectName"></Input>
              </div>

              <div class="form-attr-item">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>对应存储表名称:
                    <Poptip trigger="hover" transfer placement="top" style="font-weight: normal;">
                        <Icon style="font-size: 12px;font-weight: bold;" type="ios-help-outline"></Icon>
                        <div slot="content">
                          <p>保存后会在数据库创建一张子表,</p>
                          <p>表名自动添加"sub_"前缀',版本号当后缀</p>
                          <p>比如输入"table"，假如当前版本为1，会创建"sub_table_1"表。</p>
                        </div>
                    </Poptip>
                    <span v-if="isSubTableCreated" style="color: #ed3f14">&nbsp;&nbsp;该表已存在！</span>
                  </h5>
                </div>
                <Input clearable :class="{ 'ivu-form-item-error .ivu-input' : isSubTableCreated }"  type="text" placeholder="请输入对应存储表名称"
                  @on-change="validateSubTableName" v-model="curSubFormInfo.showTableName">
                  <span slot="prepend">sub_</span>
                  <span slot="append">_{{curFormInfo.flowVersion}}</span>
                </Input>
              </div>
              <div class="form-attr-item">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>子表单类型:</h5>
                </div>
                <Select v-model="curSubFormInfo.objectType">
                  <Option :value="1">表单</Option>
                  <Option :value="2">工单</Option>
                  <Option :value="3">运算数据</Option>
                </Select>
              </div>
              <div class="form-attr-item">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>呈现类型:</h5>
                </div>
                <Select v-model="curSubFormInfo.displayType">
                  <Option :value="1">属性</Option>
                  <Option :value="2">列表</Option>
                </Select>
              </div>
              <div class="form-attr-item">
                <h5>子表单描述:</h5>
                <Input type="textarea" :rows="4" placeholder="请输入表单描述" v-model="curSubFormInfo.descInfo"></Input>
              </div>
              <div class="form-attr-item">
                <h5>标题位置:</h5>
                <RadioGroup v-model="curSubFormInfo.textAlign">
                  <Radio label="left">
                    <span>居左</span>
                  </Radio>
                  <Radio label="center">
                    <span>居中</span>
                  </Radio>
                  <Radio label="right">
                    <span>居右</span>
                  </Radio>
                </RadioGroup>
              </div>
              <!-- <div class="form-attr-item">
                <h5>标题背景:</h5>
                <ColorPicker style="z-index:2000" v-model="curSubFormInfo.bgColor" alpha />
              </div> -->
            </div>
          </Tab-pane>
          <Tab-pane label="字段属性" name="fieldAttr">
            <div v-if="selectField && selectField.groupType !== 'biz'">
              <div class="form-attr-item" v-if="!isFormField && selectField.type != 'parent'">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>字段名称:</h5>
                </div>
                <Input v-model="selectField.label" clearable></Input>
              </div>
              <div class="form-attr-item" v-if="selectField.type == 'area'">
                <h5>标题位置:</h5>
                <RadioGroup v-model="selectField.textAlign">
                  <Radio label="left">
                    <span>居左</span>
                  </Radio>
                  <Radio label="center">
                    <span>居中</span>
                  </Radio>
                  <Radio label="right">
                    <span>居右</span>
                  </Radio>
                </RadioGroup>
              </div>
              <div class="form-attr-item" v-if="showColumnKey">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>对应存储表列名称:
                    <Poptip trigger="hover" transfer placement="top" style="font-weight: normal;">
                        <Icon style="font-size: 12px;font-weight: bold;" type="ios-help-outline"></Icon>
                        <div slot="content">
                          <p>默认随机生成一个列名，建议修改</p>
                          <p>保存会自动添加"c_"前缀</p>
                          <p>比如输入"field"，对应表中会生成"c_field"列</p>
                        </div>
                    </Poptip>
                    <span v-if="isColumnCreated" style="color: #ed3f14">&nbsp;&nbsp;列名重复！</span>
                  </h5>
                </div>
                <Input v-model="selectField.columnKey"
                    :class="{ 'ivu-form-item-error .ivu-input' : isColumnCreated }" clearable
                    @on-change="validateColumnName($event,selectField.uuId)"></Input>
              </div>
              <div class="form-attr-item" v-if="showArrayValue">
                <h5>可选项:<span style="font-weight: normal;">(输入框按Enter键确认更新)</span></h5>
                  <div style="display: flex; flex-wrap: wrap;">
                    <Input style="width: 48%;margin: 0 2% 4px 0; " size="small"
                      icon="ios-close-outline"
                      v-for="(item, i) in selectField.arrayValue" :key="item" :name="item" closable
                      :value="item"  @on-enter="changeOption($event,i)"
                      @on-click="removeOption(i)">{{ item + 1 }}</Input>
                    <Button style="width: 48%;" icon="plus" type="dashed" size="small" @click="handleAddOption"></Button>
                  </div>
              </div>
              <div class="form-attr-item" v-if="selectField.type === 'checkbox'">
                <h5>默认值:</h5>
                <Select multiple v-model="selectField.value">
                  <Option v-for="(item, i) in selectField.arrayValue" :key="item" :value="item">{{item}}</Option>
                </Select>
              </div>
              <div class="form-attr-item" v-if="selectField.type === 'radio' || selectField.type === 'select'">
                <h5>默认值:</h5>
                <RadioGroup v-model="selectField.value">
                  <Radio v-for="item in selectField.arrayValue"
                    :key="item" :label="item"></Radio>
                </RadioGroup>
              </div>
              <div class="form-attr-item" v-if="selectField.type === 'switch'">
                <h5>默认值:</h5>
                <i-switch v-model="selectField.value"></i-switch>
              </div>
              <div class="form-attr-item" v-if="selectField.groupType === 'text'">
                <h5>默认值:</h5>
                <Input v-model="selectField.value"></Input>
              </div>
              <div class="form-attr-item" v-if="showPlaceholder">
                <h5>提示信息:</h5>
                <Input v-model="selectField.placeholder"></Input>
              </div>
              <div class="form-attr-item-h" v-if="selectField.length">
                <h5>最大长度:</h5>
                <InputNumber  v-model="selectField.length"
                  :max="9999" :min="1" :step="1"></InputNumber>
              </div>
              <div class="form-attr-item-h" v-if="selectField.hasOwnProperty('minLength')">
                <h5>最小长度:</h5>
                <InputNumber  v-model="selectField.minLength"
                  :max="selectField.length" :min="0" :step="1"></InputNumber>
              </div>
              <!-- <div class="form-attr-item-h" v-if="selectField.hasOwnProperty('required')">
                <h5>是否必填:</h5>
                <Checkbox v-model="selectField.required"></Checkbox>
              </div> -->
              <div class="form-attr-item-h" v-if="selectField.hasOwnProperty('isAddIndex')">
                <h5>是否设为索引:</h5>
                <Checkbox v-model="selectField.isAddIndex"></Checkbox>
              </div>

              <!-- Rate特有 -->
              <div class="form-attr-item-h" v-if="selectField && selectField.type === 'rate'">
                <h5>星级数量:</h5>
                <InputNumber :max="10" :min="1" v-model="selectField.count"></InputNumber>
              </div>
              <div class="form-attr-item-h" v-if="selectField && selectField.type === 'rate'">
                <h5>是否允许打半星:</h5>
                <Checkbox v-model="selectField.allowHalf"></Checkbox>
              </div>
              <div class="form-attr-item-h" v-if="selectField && selectField.type === 'rate'">
                <h5>是否呈现文字:</h5>
                <Checkbox v-model="selectField.showText"></Checkbox>
              </div>

              <!-- Upload特有 -->
              <div class="form-attr-item-h" v-if="selectField && selectField.type === 'upload'">
                <h5>是否支持多选:</h5>
                <Checkbox v-model="selectField.multiple"></Checkbox>
              </div>
              <div class="form-attr-item" v-if="selectField && selectField.type === 'upload'">
                <h5>支持上传的文件类型:
                  <Poptip trigger="hover" transfer placement="top" style="font-weight: normal;">
                      <Icon style="font-size: 12px;font-weight: bold;" type="ios-help-outline"></Icon>
                      <div slot="content">
                        <p>输入文件类型后缀，比如.jpg,.png,.doc</p>
                        <p>多个类型用英文逗号隔开</p>
                        <p>记得类型名前面加“.”号</p>
                        <p>不填则不做限制</p>
                      </div>
                  </Poptip>
                </h5>
                <Input v-model="selectField.accept"></Input>
              </div>
            </div>
            <div v-if="selectField && selectField.groupType === 'biz'">
              <div class="form-attr-item">
                <h5>{{selectField.label}}:</h5>
                <Select @on-change="onBizFieldChanged($event, selectField.fields)">
                  <Option v-for="bizField in selectField.fields" 
                    :key="bizField.uuId" :value="bizField.uuId">{{bizField.label}}</Option>
                </Select>
              </div>

              <div class="form-attr-item" v-if="selectBizField">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>字段名称:</h5>
                </div>
                <Input v-model="selectBizField.label" clearable></Input>
              </div>
              
              <div class="form-attr-item" v-if="selectBizField">
                <div style="display: flex;">
                  <div class="required">*</div>
                  <h5>对应存储表列名称:
                    <Poptip trigger="hover" transfer placement="top" style="font-weight: normal;">
                        <Icon style="font-size: 12px;font-weight: bold;" type="ios-help-outline"></Icon>
                        <div slot="content">
                          <p>默认随机生成一个列名，建议修改</p>
                          <p>保存会自动添加"c_"前缀</p>
                          <p>比如输入"field"，对应表中会生成"c_field"列</p>
                        </div>
                    </Poptip>
                    <span v-if="isColumnCreated" style="color: #ed3f14">&nbsp;&nbsp;列名重复！</span>
                  </h5>
                </div>
                <Input v-model="selectBizField.columnKey"
                    :class="{ 'ivu-form-item-error .ivu-input' : isColumnCreated }" clearable
                    @on-change="validateColumnName($event,selectBizField.uuId)"></Input>
              </div>
              <div class="form-attr-item" v-if="selectBizField && showBizArrayValue">
                <h5>可选项:<span style="font-weight: normal;">(输入框按Enter键确认更新)</span></h5>
                  <div style="display: flex; flex-wrap: wrap;">
                    <Input style="width: 48%;margin: 0 2% 4px 0; " size="small"
                      icon="ios-close-outline"
                      v-for="(item, i) in selectBizField.arrayValue" :key="item" :name="item" closable
                      :value="item"  @on-enter="changeOption($event,i)"
                      @on-click="removeOption(i)">{{ item + 1 }}</Input>
                    <Button style="width: 48%;" icon="plus" type="dashed" size="small" @click="handleAddOption"></Button>
                  </div>
              </div>
              
              <div class="form-attr-item" v-if="selectBizField && selectBizField.type === 'checkbox'">
                <h5>默认值:</h5>
                <Select multiple v-model="selectBizField.value">
                  <Option v-for="(item, i) in selectBizField.arrayValue" :key="item" :value="item">{{item}}</Option>
                </Select>
              </div>
              <div class="form-attr-item" v-if="selectBizField && (selectBizField.type === 'radio' || selectBizField.type === 'select')">
                <h5>默认值:</h5>
                <RadioGroup v-model="selectBizField.value">
                  <Radio v-for="item in selectBizField.arrayValue"
                    :key="item" :label="item"></Radio>
                </RadioGroup>
              </div>
              
              <div class="form-attr-item" v-if="selectBizField && selectBizField.type === 'switch'">
                <h5>默认值:</h5>
                <i-switch v-model="selectBizField.value"></i-switch>
              </div>
              <div class="form-attr-item" v-if="selectBizField && selectBizField.groupType === 'text'">
                <h5>默认值:</h5>
                <Input v-model="selectBizField.value"></Input>
              </div>
              <div class="form-attr-item" v-if="selectBizField && showBizPlaceholder">
                <h5>提示信息:</h5>
                <Input v-model="selectBizField.placeholder"></Input>
              </div>
              <div class="form-attr-item-h" v-if="selectBizField && selectBizField.length">
                <h5>最大长度:</h5>
                <InputNumber  v-model="selectBizField.length"
                  :max="9999" :min="1" :step="1"></InputNumber>
              </div>
              <div class="form-attr-item-h" v-if="selectBizField && selectBizField.hasOwnProperty('minLength')">
                <h5>最小长度:</h5>
                <InputNumber  v-model="selectBizField.minLength"
                  :max="selectBizField.length" :min="0" :step="1"></InputNumber>
              </div>
              <!-- <div class="form-attr-item-h" v-if="selectBizField && selectBizField.hasOwnProperty('required')">
                <h5>是否必填:</h5>
                <Checkbox v-model="selectBizField.required"></Checkbox>
              </div> -->
              <div class="form-attr-item-h" v-if="selectBizField && selectBizField.hasOwnProperty('isAddIndex')">
                <h5>是否设为索引:</h5>
                <Checkbox v-model="selectBizField.isAddIndex"></Checkbox>
              </div>

              <!-- Rate特有 -->
              <div class="form-attr-item-h" v-if="selectBizField && selectBizField.type === 'rate'">
                <h5>星级数量:</h5>
                <InputNumber :max="10" :min="1" v-model="selectBizField.count"></InputNumber>
              </div>
              <div class="form-attr-item-h" v-if="selectBizField && selectBizField.type === 'rate'">
                <h5>是否允许打半星:</h5>
                <Checkbox v-model="selectBizField.allowHalf"></Checkbox>
              </div>
              <div class="form-attr-item-h" v-if="selectBizField && selectBizField.type === 'rate'">
                <h5>是否呈现文字:</h5>
                <Checkbox v-model="selectBizField.showText"></Checkbox>
              </div>

              <!-- Upload特有 -->
              <div class="form-attr-item-h" v-if="selectField && selectField.type === 'upload'">
                <h5>支持上传的文件类型:</h5>
                <Checkbox v-model="selectField.showText"></Checkbox>
              </div>
            </div>
            <Alert style="margin:0 12px;" v-if="!selectField">未选择字段!</Alert>
            
          </Tab-pane>
        </Tabs>
      </div>
    </div>
    <form-preview :data="jsonFields" :formInfo="formInfo" :show="showPreview" @close-modal="showPreview = false"></form-preview> 
  </div>
</template>

<script>
import draggable from "vuedraggable";
import formPreview from "./formPreview";
import _ from 'lodash';
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

import { COMMON_FIELDS, BIZ_FIELDS, LAYOUT_FIELDS } from "./helper";
import UID from "./utils/uid";
export default {
  props: ['data'],
  components: {
    draggable,
    formPreview,
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
  data() {
    return {
      isTableCreated: false,
      isSubTableCreated: false,
      isColumnCreated: false,
      colStatus: ["common", "biz", "other"],
      tabForm: 'main',
      formDragOption: {
        group: { name: "form", pull: "clone", put: false, revertClone: false },
        sort: false,
        dragClass: "drag-class",
        ghostClass: "ghost"
      },
      layoutDragOption: {
        group: { name: "layout", pull: "clone", put: false },
        sort: false,
        dragClass: "drag-class",
        ghostClass: "ghost"
      },
      layouts: LAYOUT_FIELDS,
      commons: COMMON_FIELDS,
      bizs: BIZ_FIELDS,
      fields: [],
      selectField: undefined, //选中的字段
      selectBizField: undefined, //选中的业务字段
      prevSelectField: undefined, //上一个选中字段
      showPreview: false,
      originFields: [], //修改时初始字段,用于判断是否有变化
      originSubForms: [], //修改时初始字段,用于判断子表单是否有变化
      // attrType: 'formAttr',
      isUpdate: false,
      curFormInfo: {}, //当前编辑的表单数据
      curSubFormInfo: {}, //当前选中的子表单数据
      originFormInfo: {}, //初始表单主要信息，用于判断是否有变化
      subForms: [],
      isMainForm: true, //当前tab页是否是主表单，默认选中
      isPublish: false, //当前工单是否已经发布
      flowData: {} //流程模板数据
    };
  },
  mounted() {
    this.init()
  },
  computed: {
    showPlaceholder() {
      return (
        this.selectField.type === "input" ||
        this.selectField.type === "textarea" ||
        this.selectField.type === "select" ||
        this.selectField.type === "date"
      );
    },
    showBizPlaceholder() {
      return (
        this.selectBizField.type === "input" ||
        this.selectBizField.type === "textarea" ||
        this.selectBizField.type === "select" ||
        this.selectBizField.type === "date"
      );
    },
    showArrayValue() {
      return (
        this.selectField.type === "radio" ||
        this.selectField.type === "checkbox" ||
        this.selectField.type === "select"
      );
    },
    showBizArrayValue() {
      return (
        this.selectBizField.type === "radio" ||
        this.selectBizField.type === "checkbox" ||
        this.selectBizField.type === "select"
      );
    },
    isFormField() {
      return (
        this.selectField && this.selectField.hasOwnProperty("storageTableName")
      );
    },
    showColumnKey() {
      return !this.isFormField && this.selectField.groupType !== "layout";
    },
    attrType() {
      return this.selectField ? "fieldAttr" : "formAttr";
    },
    formInfo() {
      //返回表单主要信息
      const {
        objectName,
        objectType,
        showTableName,
        storageTableName,
        descInfo,
        flowVersion,
        keyName
      } = this.curFormInfo;
      return {
        objectName,
        objectType,
        showTableName,
        storageTableName: `f_${showTableName}_${flowVersion}`,
        descInfo,
        flowVersion,
        keyName
      };
    },
    jsonFields() {
      this.subForms.forEach(v => v.storageTableName = `sub_${v.showTableName}_${this.curFormInfo.flowVersion}`)
      //界面呈现用信息
      return [...this.fields, ...this.subForms];
    }
  },
  methods: {
    init() {
      const json = this.data
      this.curFormInfo = {
        flowVersion: 1,
        storageTableName: json.storageTableName,
        showTableName: json.showTableName,
      };
      this.fields = _.filter(json.fields, v => v.type !== "subForm");
      this.subForms = _.filter(json.fields, v => v.type === "subForm");
      console.log('fields is', this.fields, json);
      // this.originFormInfo = {
      //   objectName: result.objectName,
      //   storageTableName: json.storageTableName,
      //   showTableName: json.showTableName,
      //   descInfo: result.descInfo,
      //   flowVersion: result.flowVersion,
      //   keyName: result.keyName
      // };
      if (this.isUpdate) {
        this.originFields = _.cloneDeep(this.fields);
        this.originSubForms = _.cloneDeep(this.subForms);
      }
    },
    onBizFieldChanged(uuId, arr) {
      this.selectBizField = _.find(arr, { uuId });
    },
    removeField(item, i) {
      this.fields.splice(i, 1);
      if (this.selectField && item.uuId === this.selectField.uuId) {
        this.selectField = undefined;
      }
    },
    cloneField(item, i) {
      let newItem = _.cloneDeep(item);
      let uuId = UID();
      newItem.uuId = uuId;
      newItem.columnKey = "column_" + UID(1);
      if (newItem.children) {
        newItem.children.forEach(o => {
          let uuId = UID();
          o.uuId = uuId;
          o.columnKey = "column_" + UID(1);
        });
      }
      this.fields.splice(i + 1, 0, newItem);
    },
    removeSubField(arr, item, i) {
      arr.splice(i, 1);
      if (this.selectField && item.uuId === this.selectField.uuId) {
        this.selectField = undefined;
      }
    },
    cloneSubField(arr, item, i) {
      let newItem = _.cloneDeep(item);
      let uuId = UID();
      newItem.uuId = uuId;
      newItem.columnKey = "column_" + UID(1);
      arr.splice(i + 1, 0, newItem);
    },
    //表单字段添加
    onAdd(e, isClikAdd) {
      let newItem;
      if (isClikAdd) {
        newItem = { ...e };
      } else {
        const oldItem = this.fields[e.newIndex];
        newItem = { ...oldItem };
      }
      if (!newItem.uuId) {
        let uuId = UID();
        newItem.uuId = uuId;
        newItem.columnKey = "column_" + UID(1);
      }
      this.selectField = newItem;
      this.fields.splice(e.newIndex, 1, newItem);
    },
    onFieldAdd(e, item) {
      const oldItem = item.children[e.newIndex];
      let newItem = _.cloneDeep(oldItem);
      if (!newItem.uuId) {
        let uuId = UID();
        newItem.uuId = uuId;
        newItem.columnKey = "column_" + UID(1);
      }
      if (newItem.type == "staff") {
        newItem.fields.forEach(field => {
          field.uuId = UID();
          field.columnKey = "column_" + UID(1);
        });
      }
      this.selectField = newItem;
      item.children.splice(e.newIndex, 1, newItem);
    },
    handleAddOption() {
      const v = _.uniqueId("新选项");
      this.selectField.arrayValue.push(v);
      this.options.push(v);
    },
    removeOption(v) {
      this.selectField.arrayValue.splice(v, 1);
    },
    changeOption(v, i) {
      this.$set(this.selectField.arrayValue, i, v.target.value);
    },
    setAttri(v) {
      if (this.selectField && v.uuId === this.selectField.uuId) {
        this.prevSelectField = this.selectField;
        this.selectField = undefined;
      } else {
        this.selectField = v;
        this.prevSelectField = this.selectField;
      }
    },
    changeAttrType(v) {
      if (v === "formAttr") {
        this.prevSelectField = this.selectField;
        this.selectField = undefined;
      } else {
        this.selectField = this.prevSelectField;
      }
    },
    onPreivew() {
      this.showPreview = true;
    },
    onReset() {
      this.fields = [];
      this.subForms = [];
      this.selectField = undefined;
    },
    onSave() {
      const objectName = this.curFormInfo.objectName;
      const showTableName = this.curFormInfo.showTableName.trim();
      if (!objectName) {
        this.$Message.error("请输入表单名称！");
        return false;
      }
      if (!showTableName) {
        this.$Message.error("请输入表单存储表名称！");
        return false;
      }

      if (this.isTableCreated) {
        this.$Message.error("该表已存在！");
        return false;
      }

      if (this.isSubTableCreated) {
        this.$Message.error("存在相同名称子表！");
        return false;
      }

      if (this.isColumnCreated) {
        this.$Message.error("存在重复表字段！");
        return false;
      }

      let attributes = [];
      let childForms = [];
      let hasEmptySubFormName = false;
      let hasEmptySubFormTableName = false;

      //主表单信息
      this.fields.forEach(field => {
        if (field.children) {
          field.children.forEach(subField => {
            if (subField.groupType === "biz") {
              subField.fields.forEach(bizField => {
                attributes.push({
                  ...bizField,
                  columnKey: "c_" + bizField.columnKey,
                  defaultValue: JSON.stringify(bizField.value),
                  isAddIndex: bizField.isAddIndex ? 1 : 0,
                  isNull: bizField.required ? 0 : 1
                });
              });
            } else {
              attributes.push({
                ...subField,
                columnKey: "c_" + subField.columnKey,
                defaultValue: JSON.stringify(subField.value),
                isAddIndex: subField.isAddIndex ? 1 : 0,
                isNull: subField.required ? 0 : 1
              });
            }
          });
        }
      });

      //子表单信息
      this.subForms.forEach(field => {
        let subForm = {
          ...field,
          flowVersion: this.curFormInfo.flowVersion,
          keyName: this.curFormInfo.keyName,
          managerObjectAttributeList: []
        };
        const { objectName, showTableName } = field;
        if (!objectName.trim()) {
          hasEmptySubFormName = true;
        }
        if (!showTableName.trim()) {
          hasEmptySubFormTableName = true;
        }
        subForm.flowVersion = this.curFormInfo.flowVersion;
        subForm.storageTableName =
          "sub_" +
          subForm.showTableName +
          "_" +
          this.curFormInfo.flowVersion;
        field.children.forEach(subField => {
          if (subField.groupType === "biz") {
            subField.fields.forEach(bizField => {
              subForm.managerObjectAttributeList.push({
                ...bizField,
                columnKey: "c_" + bizField.columnKey,
                defaultValue: JSON.stringify(bizField.value),
                isAddIndex: bizField.isAddIndex ? 1 : 0,
                isNull: bizField.required ? 0 : 1
              });
            });
          } else {
            subForm.managerObjectAttributeList.push({
              ...subField,
              columnKey: "c_" + subField.columnKey,
              defaultValue: JSON.stringify(subField.value),
              isAddIndex: subField.isAddIndex ? 1 : 0,
              isNull: subField.required ? 0 : 1
            });
          }
        });
        childForms.push(subForm);
      });

      if (hasEmptySubFormName) {
        this.$Message.error("请输入子表单名称！");
        return false;
      }

      if (hasEmptySubFormTableName) {
        this.$Message.error("请输入子表单存储表名称！");
        return false;
      }

      if (attributes.length === 0) {
        this.$Message.error("表单为空!");
        return false;
      }

      if (this.isUpdate && !this.isPublish) {
        const body = {
          ...this.curFormInfo,
          fileData: JSON.stringify({
            ...this.formInfo,
            fields: this.jsonFields
          }),
          storageTableName: this.formInfo.storageTableName,
          managerObjectAttributeList: attributes,
          childForms
        };
        this.$emit('on-update', body)
      } else {
        const body = {
          ...this.curFormInfo,
          storageTableName: this.formInfo.storageTableName,
          fileData: JSON.stringify({
            ...this.formInfo,
            fields: this.jsonFields
          }),
          managerObjectAttributeList: attributes,
          displayType: 1,
          childForms
        };
        this.$emit('on-create', body)
      }
    },
    //保存后重置更新相关字段
    resetUpdateFields() {
      this.originFields = _.cloneDeep(this.fields);
      this.originSubForms = _.cloneDeep(this.subForms);
      this.originFormInfo = _.cloneDeep(this.formInfo);
    },
    onBack() {
      this.$emit("on-back");
      this.$router.push({ name: "templateList" });
    },
    validate() {
      const fieldIsEqual = _.isEqual(this.fields, this.originFields);
      const formInfoIsEqual = _.isEqual(this.formInfo, this.originFormInfo);

      const subFieldsIsEqual = _.isEqual(this.subForms, this.originSubForms);
      console.log(
        "validate",
        this.fields,
        this.originFields,
        this.formInfo,
        this.originFormInfo
      );

      if (!fieldIsEqual || !formInfoIsEqual || !subFieldsIsEqual) {
        //假如有不同则需要更新
        return this.onSave();
      }
      return true;
    },
    changeForm(v) {
      this.isMainForm = v === 'main';
      this.curSubFormInfo = _.find(this.subForms, { uuId: v });
      this.selectField = undefined;
    },
    addSubForm() {
      let newItem = {
        type: "subForm",
        groupType: "layout",
        label: "子表单",
        objectName: "子表单",
        displayType: 1,
        objectType: 2,
        textAlign: "left",
        bgColor: "aliceblue",
        showTableName: "",
        storageTableName: "",
        descInfo: "",
        children: [],
        values: []
      };
      if (!newItem.uuId) {
        let uuId = UID();
        newItem.uuId = uuId;
      }
      this.subForms.push(newItem);
    },
    removeSubForm(v) {
      this.subForms = _.reject(this.subForms, { uuId: v });
      if(this.curSubFormInfo.uuId == v) { //如果关闭的是选中的子表单，则相当于切换表单
        this.changeForm(this.tabForm)
      }
    },
    validateTableName: _.debounce(function(v) {
      const name = `f_${v.target.value.trim()}_${this.curFormInfo.flowVersion}`;
      this.$emit('validate-tablename', name)
    }, 800),
    validateSubTableName: _.debounce(function(v) {
      const name = `sub_${v.target.value.trim()}_${
        this.curFormInfo.flowVersion
      }`;
      this.$emit('validate-sub-tablename', name)
    }, 800),
    validateColumnName: _.debounce(function(v, uuId) {
      const name = v.target.value.trim();
      this.isColumnCreated = false;
      this.fields.forEach(field => {
        if (field.children) {
          field.children.forEach(subField => {
            if (subField.uuId !== uuId && subField.columnKey == name) {
              this.isColumnCreated = true;
            }
          });
        }
      });
    }, 800)
  }
};
</script>

<style lang="less" src="./style.less">
</style>
