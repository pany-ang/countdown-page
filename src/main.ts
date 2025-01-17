/* eslint-disable perfectionist/sort-imports */

// core
import { router } from "@/router"
import App from "@/App.vue"
// css
import "normalize.css"
import "@@/assets/styles/index.scss"

// 创建应用实例
const app = createApp(App)

// 安装 router
app.use(router)

// router 准备就绪后挂载应用
router.isReady().then(() => {
  app.mount("#app")
})
