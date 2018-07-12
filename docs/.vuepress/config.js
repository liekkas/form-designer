module.exports = {
  title: '表单设计器',
  description: '一款采用Vue框架基于iView组件库的表单设计器',
  base: '/form-designer/wiki/',
  dest: './wiki/',
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  themeConfig: {
    docsDir: 'docs',
    nav: [
      {text: '入门手册',link: '/start/'},
      { text: 'Demo', link: 'https://backtrue.com/form-designer/' },
      { text: 'GitHub', link: 'https://github.com/liekkas/form-designer' },
    ]
  }
}