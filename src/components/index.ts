import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from './Category/index.vue'
console.log(ElementPlusIconsVue)
const allGloablComponet: any = { SvgIcon, Pagination, Category }
// import type { App, Component } from 'vue'
// const components: { [name: string]: Component } = { SvgIcon }
export default {
  install(app: any) {
    Object.keys(allGloablComponet).forEach((key) => {
      app.component(key, allGloablComponet[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
