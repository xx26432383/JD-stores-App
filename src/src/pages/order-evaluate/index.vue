<template>
  <div class="container">
    <div class="comm">
      <img src="../../assets/book1.jpg" alt="">

      <div class="star" :style="{backgroundPosition: `${180 - 5 * 36}px 0`}"></div>
    </div>

    <div class="title">分享你的使用体验吧</div>

    <el-input style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="8"></el-input>

    <el-button class="submit-btn" type="primary">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'order-evaluate',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;

  .comm {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    background: #fff;

    img {
      width: 150px;
      height: 180px;
    }

    .star {
      width: 180px;
      height: 36px;
      background: url('../../assets/stars.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }

  .title {
    padding-left: 10px;
    line-height: 40px;
  }

  .submit-btn {
    display: block;
    width: 95%;
    margin: 10px auto 0;
    height: 40px;
    line-height: 40px;
  }
}
</style>
