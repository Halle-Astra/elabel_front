# label.online

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
## Bugs  Fixed 

Bug1 :

出现了会肉眼看到闪着有标正负样本点，但是立马又没了，变成了原图。


A:

因为draw\_dot先绘制好了，可是canvas\_show是异步的，所以draw\_dot让标注可视化以后立马又因为异步结束这时才绘制完成。


Q: