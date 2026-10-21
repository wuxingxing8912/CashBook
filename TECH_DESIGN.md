# 记账应用技术设计

## 技术栈
- 前端：React + TypeScript + Vite
- 样式：Tailwind CSS
- 数据存储：LocalStorage
- 部署：Vercel

## 项目结构

src/
    components/     # 组件
    pages/          # 页面
    hooks/          # 自定义Hooks
    utils/          # 工具函数
    types/          # 类型定义

## 数据模型

### transaction（交易记录）
- id:string
- amount:number
- type:'income'|'expense'
- category:string
- note:string
- date:string

## 关键技术点
1. 使用LocalStorage存储数据
2. 使用React Hooks管理状态
3. 使用日期库处理日期（date-fns）

