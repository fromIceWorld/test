# drag
- [x] click事件与控制台联动 ❌ [ js无法模拟按键 ]

# 布局

```
1. combo作为布局的容器[1.内置，2.动态画]

```

# G6 bug

```
1.【删除node，使用旧node的model再创建一个新的一样的node】，
	当删除的node在创建combo时就存在于combo，需要先添加新的node，再删除旧的node，combo才可以渲染正确；
	当先删除旧的node，再创建新的node，combo会渲染错误
```

