<template>
  <el-header>
    <el-row id="navi" :gutter="10">
      <el-col v-for="header in headers"  :key="header.name" :lg="2" :md="6"> <!-- 为什么非得要加冒号和引号呢， 可能加了：就会把引号里的东西当变量，而数字不是变量，就变成数字而非字符串了 -->
        <el-card shadow="hover">  <a v-bind:href="header.href">{{header.name}}</a></el-card>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default{
  data(){
    return {
      headers
      }
    },
  name:'navi'
}

// 定义头栏目需要的信息
  const headers=[
    {
      "name": "主页",
      "href": "https://love-meiyan.cn"
    },
    {
      "name":"此页",
      href:"https://v.mathmodelling.cn"
    }];



</script>

<style>
  #navi {
    /* background-color: #409EFF; */
    /* display:grid; */
    /* place-items:center; */
  }
  #navi   .el-card{
    border-radius: 10px;
    /* padding: 10px 0; */
  }
  .el-upload-list__item-thumbnail{ /*可算解决了resize形变问题*/
    object-fit: scale-down;
  }

  .el-card__body {
    text-align: center;
  }
</style>
