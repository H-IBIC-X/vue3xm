/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-17 14:32:02
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-22 22:08:06
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入自定义插件对象：注册整个项目全局组件
import router from '@/router'
import pinia from './store'
import 'element-plus/theme-chalk/el-notification.css'

const app = createApp(App)
// isHasButton(app)

app.use(ElementPlus, {
  // locale: zhCn,
})
app.use(globalComponent)
// app.component('SvgIcon',SvgIcon);
app.use(router)
app.use(pinia)
// 引入路由鉴权文件
import './permisstion'

app.mount('#app')
