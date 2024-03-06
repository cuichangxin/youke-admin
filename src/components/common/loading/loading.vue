<template>
  <div v-if="visible" class="loading">
    <div class="loading-spin">
      <i class="loading-type"></i>
      <p class="loading-text">加载中...</p>
    </div>
  </div>
</template>

<script setup>
const visible = ref(false)

const showLoading = () => {
  visible.value = true
}
const hideLoading = () => {
  setTimeout(() => {
    visible.value = false
  }, 600)
}

defineExpose({
  showLoading,
  hideLoading,
})
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-spin-layer-bg);
  transition: opacity 0.1s cubic-bezier(0, 0, 1, 1);
  user-select: none;
  z-index: 2001;
}
.loading-spin {
  width: 100%;
  position: absolute;
  top: 50%;
  text-align: center;
  margin-top: -20px;
  .loading-type {
    color: rgb(var(--primary-6));
    box-sizing: border-box;
    display: block;
    width: 0;
    height: 0;
    margin: 0 auto 25px auto;
    perspective: 200px;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 20px;
      height: 20px;
      background: transparent;
      animation: Loading 0.5s infinite alternate;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 20px;
      height: 20px;
      background: transparent;
      animation: Loading 0.5s infinite alternate;
      animation-delay: 0.15s;
    }
  }
}
.loading-text {
  color: rgb(var(--primary-6));
  font-size: 14px;
  margin: 3px 0;
}
@keyframes Loading {
  0% {
    box-shadow: 0 0 0 transparent;
    transform: scale(1) translateY(0) rotateX(0deg);
  }
  100% {
    background: rgb(var(--primary-6));
    box-shadow: 0 25px 40px rgba(24, 144, 255, 0.5);
    transform: scale(1.2) translateY(-25px) rotateX(45deg);
  }
}
</style>
