## 简介

只有倒计时功能的页面

## 使用

<details>
<summary>推荐环境</summary>

<br>

- 新版 `Visual Studio Code`
- 安装 `.vscode/extensions.json` 文件中推荐的插件
- `node` 20.x 或 22+
- `pnpm` 9+

</details>

<details>
<summary>本地开发</summary>

<br>

```bash
# 安装依赖
pnpm i

# 启动服务
pnpm dev
```

</details>

<details>
<summary>打包构建</summary>

<br>

```bash
# 打包构建生产环境
pnpm build
```

</details>

<details>
<summary>本地预览</summary>

<br>

```bash
# 先执行打包构建命令生成 dist 目录后再执行以下预览命令
pnpm preview
```

</details>

<details>
<summary>代码检查</summary>

<br>

```bash
# 代码校验与格式化
pnpm lint
```

</details>

<details>
<summary>代码提交规范</summary>

<br>

`feat` 新功能

`fix` 修复错误

`perf` 优化

`refactor` 重构代码

`docs` 文档和注释

`types` 类型相关

`ci` 持续集成、工作流

`revert` 撤销更改

`chore` 琐事（更新依赖、修改配置等）

</details>

## 技术栈

**Vue3**：采用 Vue3 + script setup 最新的 Vue3 组合式 API

**Vite**：真的很快

**Vue Router**：路由路由

**TypeScript**：JavaScript 语言的超集

**pnpm**：更快速的，节省磁盘空间的包管理工具

**Scss**：和 Element Plus 保持一致

**CSS 变量**：主要控制项目的布局和颜色

**ESlint**：代码校验与格式化
