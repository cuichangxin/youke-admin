<template>
  <div class="container">
    <div class="info_401">
      <img class="img_401" src="../assets/images/401.png" alt="401" />
      <div class="bullshit">
        <div class="bullshit__oops">401错误！</div>
        <div class="bullshit__headline">您没有权限访问！</div>
        <div class="bullshit__info">对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</div>
        <router-link to="/" class="bullshit__return-home"> 返回首页 </router-link>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img_401 {
  width: 500px;
  height: 450px;
}
.bullshit {
    position: relative;
    float: right;
    width: 300px;
    padding: 30px 0;
    margin: 20px 0 0 20px;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
</style>
