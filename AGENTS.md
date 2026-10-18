# 仓库贡献指南

## 项目结构与模块组织

本仓库是邓岳慈的个人学术网站，基于 Jekyll 和 Academic Pages 构建。

- `_pages/about.md` 包含首页、项目介绍和论文卡片；`_pages/cv.md` 提供网页版简历。
- `_data/` 存放结构化内容，包括 `cv.json` 和导航配置；`_includes/` 与 `_layouts/` 存放 Liquid 模板。
- `assets/` 存放 CSS、JavaScript 和字体；`_sass/` 存放主题样式；`images/` 存放媒体资源；`files/` 存放可下载的文档。
- `resume/` 包含可独立编译的 LaTeX 简历；`scripts/` 存放同步和构建辅助脚本。
- `test/` 包含首页回归测试。`_site/` 是构建生成的目录，请勿直接编辑或提交。

## 构建、测试与开发命令

在仓库根目录执行以下命令：

- `bundle install` — 安装 Ruby 依赖。
- `bundle exec jekyll serve --config _config.yml,_config_local.yml` — 启动本地预览，访问 `http://localhost:4000`。
- `bundle exec jekyll build` — 重新生成 `_site/`。
- `node --test test/*.test.js` — 构建后运行回归测试；需使用支持 `node:test` 的较新 Node.js 版本。
- 先执行 `npm install`，再执行 `npm run build:js` — 重新生成 `assets/js/main.min.js`；`npm run watch:js` 用于监听 JavaScript 文件变更。
- `python3 scripts/sync_cv_publications.py` — 将首页论文信息同步到两种格式的简历中。
- `bash scripts/build_cv.sh` — 使用 XeLaTeX 编译并将生成结果保存到 `files/cv.pdf`；需安装 TeX Live 或 MacTeX。

## 代码风格与命名规范

保持与周围代码一致：HTML、CSS、JavaScript 和 YAML 使用两空格缩进，Python 使用四空格缩进。保留 Markdown 文件头部元数据和 Liquid 表达式。网页文件名与 CSS 类名应具有描述性，使用连字符分隔单词；Python 名称使用 snake_case。复用现有主题颜色变量。仓库未配置专用格式化或代码检查工具；避免无关的格式调整，打包后的 JavaScript 应通过构建命令重新生成，不要直接编辑。

## 测试指南

测试使用 Node 内置测试运行器和严格断言。测试文件按 `test/*.test.js` 命名，测试名称应描述可观察的行为。断言会读取 `_site/index.html`，因此测试前必须重新构建。内容变更后，应核实并更新受影响的预期值。仓库未设置测试覆盖率门槛。涉及视觉变更时，请检查桌面端与移动端布局、浅色与深色主题、论文筛选功能和简历链接。

## 提交与拉取请求指南

历史提交采用简短的祈使句标题，例如 `Add RiCo publication to homepage`，有时使用 `fix:` 或 `chore:` 前缀。每次提交应聚焦单一主题。拉取请求（PR）应说明变更内容、关联相关 issue，并提供验证结果；涉及视觉变更时应附上截图。

## 简历内容一致性

先编辑首页论文卡片，再运行同步脚本；不要手动修改自动生成的论文条目。确保 `_data/cv.json` 与 `resume/main.tex` 中的共有信息保持一致。修改相关源文件时，应一并提交重新生成的 `resume/publications.tex` 和 `files/cv.pdf`。
