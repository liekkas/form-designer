<template>
  <div id="app">
    <Tabs value="design">
      <TabPane label="表单设计" name="design">
        <newForm ref="form" :data="data"/>
      </TabPane>
      <TabPane label="表单呈现" name="show">
        <formView ref="form" :data="data"></formView>
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
    newForm, formView
  },
  data() {
    return {
      data: demo.fields
    }
  },
}
</script>
<style>
  #app {
    margin: 24px;
  }
</style>


