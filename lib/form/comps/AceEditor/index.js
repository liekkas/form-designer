var ace = require('brace');

module.exports = {
    render: function render(h) {
        var height = this.height ? this.px(this.height) : '100%';
        var width = this.width ? this.px(this.width) : '100%';
        return h('div', {
            attrs: {
                style: "height: " + height + '; width: ' + width
            }
        });
    },
    props: {
        value: {
            type: String,
            required: true
        },
        lang: String,
        theme: String,
        height: true,
        width: true,
        options: Object
    },
    data: function data() {
        return {
            editor: null,
            contentBackup: ""
        };
    },
    methods: {
        px: function px(n) {
            if (/^\d*$/.test(n)) {
                return n + "px";
            }
            return n;
        }
    },
    watch: {
        value: function value(val) {
            if (this.contentBackup !== val) this.editor.setValue(val, 1);
        },
        theme: function theme(newTheme) {
            this.editor.setTheme('ace/theme/' + newTheme);
        },
        lang: function lang(newLang) {
            this.editor.getSession().setMode('ace/mode/' + newLang);
        },
        options: function options(newOption) {
            this.editor.setOptions(newOption);
        },
        height: function height() {
            this.$nextTick(function () {
                this.editor.resize();
            });
        },
        width: function width() {
            this.$nextTick(function () {
                this.editor.resize();
            });
        }
    },
    mounted: function mounted() {
        var vm = this;
        var lang = this.lang || 'text';
        var theme = this.theme || 'chrome';

        require('brace/ext/emmet');

        var editor = vm.editor = ace.edit(this.$el);

        this.$emit('init', editor);

        editor.$blockScrolling = Infinity;
        editor.setOption("enableEmmet", true);
        editor.setOption("showPrintMargin", false);
        editor.getSession().setMode('ace/mode/' + lang);
        editor.setTheme('ace/theme/' + theme);
        editor.setValue(this.value, 1);

        editor.on('change', function () {
            var content = editor.getValue();
            vm.$emit('input', content);
            vm.contentBackup = content;
        });
        if (vm.options) editor.setOptions(vm.options);
    }
};