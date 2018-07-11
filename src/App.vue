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
    <a style="position: absolute; right: 20px; top: 12px;" href="https://github.com/liekkas/form-designer">
      <Icon type="social-github" size="28"></Icon>
    </a>
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


