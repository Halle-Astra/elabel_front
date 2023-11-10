<template>
<div>
  <el-aside>
    <el-dialog :visible.sync="dialogVisible">
      <el-img  style="width: 100px;height:100px; object-fit: scale-down;":src="dialogImageUrl" alt=""  lazy=true></el-img>
    </el-dialog>
  </el-aside>
  <el-main>
    <el-upload
      action="http://localhost:5000/label.online/upload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      list-type="picture"
      drag
      multiple
      >
      <!-- <i class="el-icon-plus"></i> -->
      <div id="upload_box">拖拽或点击上传图片</div>
    </el-upload>
  </el-main>
  <el-aside width=20% >aside</el-aside>
</div>
</template>

<script  src="./mainPanel.js">
</script>

<style>
</style>
