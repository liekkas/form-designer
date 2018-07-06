<template>
    <div>
      <div ref="editor" style="text-align:left"></div>
    </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "editor",
  props: ['disabled'],
  data() {
    return {
      editor: undefined
    };
  },
  watch: {
    disabled(v) {
      console.log('disable editor', v);
      this.editor.$textElem.attr('contenteditable', v)
    }
  },
  mounted() {
    console.log('disable is', this.disabled);
    this.editor = new E(this.$refs.editor);

    //支持v-model
    this.editor.customConfig.onchange = html => {
      this.$emit('input', html)
      this.$emit('update:text', this.editor.txt.text())
    }

    this.editor.customConfig.zIndex = 3
    this.editor.create();
  }
};
</script>

<style scoped>
</style>
