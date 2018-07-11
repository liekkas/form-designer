# form-designer
 基于Vue、iView的一款表单设计器
## 安装使用

``` bash
# install dependencies
npm install form-designer iview
```
在main.js中引入
```
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import 'form-designer/dist/form-designer.min.css';

Vue.use(iView)
```
in App.vue
```
<template>
  <div id="app">
    <Tabs value="design">
      <TabPane label="表单设计" name="design">
        <newForm ref="form" :data="data"/>
      </TabPane>
      <TabPane label="表单呈现" name="show">
        <formView ref="form" :data="data.fields"></formView>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import newForm from './form/newForm'
import formView from './form/formView'
import demo from './demo.json';
export default {
  name: 'App',
  components: {
    newForm, 
    formView
  },
  data() {
    return {
      data: demo
    }
  },
}
</script>
<style>
  #app {
    margin: 24px;
  }
</style>
```
## Online Demo
- [在线演示](https://backtrue.com/form-designer/)

## Snapshots
### 表单设计
![image](https://raw.githubusercontent.com/liekkas/form-designer/master/snap/form-design.jpg)
### 表单呈现
![image](https://raw.githubusercontent.com/liekkas/form-designer/master/snap/form-show.jpg)


## 功能
### 1. 主次表单
		整张表单由一个主表单和任意个子表单组成。主表单存放主要信息，子表单存放详情或其他信息。保存时主次表单都会生成一个独立的数据库表用以存放各自的表单数据。操作上主表单不能删除，子表单可以添加、修改、删除。
		子表单的字段组成有两种形态：属性型和列表型。当子表单是属性型时，表现跟主表单一样，一个字段一个输入框。当子表单选为列表型时，子表单里的所有字段会以表格方式呈现，此时可以添加多项数据。比如在报销单时可以报销多行事项。

### 2. 表单组件
		表单组件分两大类：布局类和字段类。
		布局类有表单区域、子表单区域组件，用来规定表单的范围。子表单只允许一个表单区域，添加子表单时会默认生成一个子表单区域组件。主表单允许多个表单区域，所以要自己拖拽表单区域组件进来。
		字段类分通用型和复杂的业务型。
		通用型字段提供文本、多行文本、数字、日期、下拉框、单选框、复选框、开关项、富文本、附件上传、评级等组件。这些是基本组件。业务型字段则是根据业务需求自定义出的一类组件。字段类组件都需要拖拽到布局组件中进行消费。
    
### 3. 表单预览
		定制表单时可以随时点击预览按钮进行实时预览。在预览界面可以看到最终呈现的效果。同时还提供表单验证功能，用于验证必填字段的校验。数据预览则可以看到表单的整个数据结构。
	
### 4. 表单保存和展现
		整个表单的数据结构以JSON串方式保存，根据JSON串反解析再渲染出整张表单。同时会配合流程节点中的权限定义来决定哪些字段是否必填，是否隐藏