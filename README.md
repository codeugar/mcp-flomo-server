# MCP-Flomo-Server

## 项目简介

MCP-Flomo-Server 是一个基于 Model Context Protocol (MCP) 的服务器应用，允许 AI 助手（如 Claude）直接将内容记录到 Flomo 笔记应用中。通过这个服务，用户可以在与 AI 对话过程中，轻松地将有价值的信息保存到 Flomo。

## 功能特点

- 提供 MCP 工具接口，支持 AI 助手直接调用
- 将内容通过 Flomo API 发送到用户的 Flomo 账户
- 支持环境变量配置，便于个性化设置
- 使用 TypeScript 开发，提供类型安全

## 安装

### 前提条件

- Node.js (v16 或更高版本)
- npm 或 yarn
- Flomo API 密钥 (通过 Flomo 网页版获取)

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/codeugar/mcp-flomo-server.git
cd mcp-flomo-server
```

2. 安装依赖

```bash
npm install
```

3. 配置 Flomo API

在 `src/index.ts` 文件中，直接修改 `flomo_api` 变量的值：

```typescript
let flomo_api = ""
```


## 使用方法

### 构建项目

```bash
npm run build
```


### 在 AI 助手中使用

当服务器运行后，AI 助手可以通过 MCP 协议调用 `flomo` 工具，将内容记录到您的 Flomo 账户中。

示例调用：

```
记录到 Flomo: "这是一条测试笔记"
```

## 技术栈

- TypeScript
- Node.js
- Model Context Protocol SDK
- Zod (用于数据验证)

## 项目结构

```mcp-flomo-server/
├── src/
│   └── index.ts      # 主要服务器代码
├── build/            # 编译后的 JavaScript 文件
├── package.json      # 项目依赖和脚本
└── tsconfig.json     # TypeScript 配置
```

## 许可证

ISC

## 贡献指南

欢迎提交 Issues 和 Pull Requests 来改进这个项目。

## 常见问题

**Q: 如何获取 Flomo API 密钥？**  
A: 登录 Flomo 网页版，在设置中找到 API 选项，创建一个新的 API 密钥。

**Q: 服务器启动后没有任何输出是正常的吗？**  
A: 是的，服务器启动后会等待 MCP 客户端的连接，没有额外的控制台输出是正常的。

**Q: 如何确认服务器正在正常工作？**  
A: 您可以通过 AI 助手尝试发送一条笔记到 Flomo，然后检查您的 Flomo 账户是否收到了这条笔记。 
