<template>
  <transition name="modal" appear>
    <div class="balloon balloon-overlay" @click.self="$emit('close')">
      <div class="balloon-window">
    <p class="input-balloon">
          <slot/>
          </p>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.input-balloon {
  position: absolute;
  top:-80px;
  left:0;
  width:150px;
  height:50px;
  background: #fff;
  border-radius: 8px;
  border:6px solid rgba(140, 181, 241);
}
.input-balloon::after{
  content: '';
  position: absolute;
  left: 14px;
  top:40px;
  display: block;
  width: 0;
  height: 0;
  border-right: 15px solid transparent;
  border-top: 17px solid rgba(140, 181, 241);
  border-left: 15px solid transparent;
}
  .balloon.balloon-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 30;
    width: 100%;
    height: 100%;
  }

  .balloon-window {
    background: #fff;
  }

  .balloon-content {
    padding: 10px 20px;
    border-radius: 0;
  }
</style>