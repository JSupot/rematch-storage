## rematch-storage

### 安装

> npm install rematch-storage --save

> yarn add rematch-storage

### 介绍

把model的值同步到sessionStorage或者localStorage中，使得页面刷新的时候能从storage中取出对应的值进行数据的初始化

### 使用


```
example

const countModel = {
    state: 0,
    reducers: {
        increment: state => state + 1,
        decrement: state => state - 1,
    },
    effects: {
        async asyncIncrement() {
          await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
          console.log('this click', this);
          this.increment();
        },
    },
    useSession: true,
    useLocal: true,
};


init

import storagePlugin from 'rematch-storage';

const store = init({
    ...
    
    models,
    plugins: [storagePlugin],
    
    ...
    
});
```

- useSession: 将值同步到sessionStorage中
- useLocal: 将值同步到localStorage中

sessionStorage的优先级高于localStorage，最好使用两者中的一个，如果两个值同时设置了，会优先使用sessionStorage。