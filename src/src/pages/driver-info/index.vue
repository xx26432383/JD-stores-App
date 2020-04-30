<template>
  <div class="container">
    <div>
      <img src="../../assets/u1210.png" alt="">
      <span>滴师傅</span>
    </div>
    <div>
      <img src="../../assets/u1151.png" alt="">
      <span>123465798</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'driver-info',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.container {
  //margin: 15px 30px;
  border-bottom: 1px solid #ddd;
  div:nth-child(1) {
    position: relative;
    top: 10px;
    padding: 0px 10px;
  }
  div:nth-child(2) {
    padding: 5px 10px;
  }
  img {
    padding: 5px 10px;
  }
  span {
    position: relative;
    top: -10px
  }
}
</style>
