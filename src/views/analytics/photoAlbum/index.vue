<script setup lang="ts">
import {ref} from 'vue'
import ms from '@/assets/ms/1.mp3'

const selectedMusic = ref(ms)
const selectMusic = (e: Event) => {
  const file = (e.target as HTMLInputElement).files[0]
  if (file) {
    // selectedMusic.value = URL.createObjectURL(file);
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      selectedMusic.value = (ev.target as FileReader).result as string;
    }
  }
}
</script>

<template>
  <div>{{ $t('menu._3DPhotoAlbum') }}</div>
  <!--/*����������*/-->
  <div class="wrap">
    <!--	/*��������Ԫ�ص�����*/-->
    <div class="cube">
      <!--ǰ��ͼƬ -->
      <div class="out_front">
        <img src="@/assets/img/1.jpg" class="pic"/>
      </div>
      <!--����ͼƬ -->
      <div class="out_back">
        <img src="@/assets/img/2.jpg" class="pic"/>
      </div>
      <!--��ͼƬ -->
      <div class="out_left">
        <img src="@/assets/img/3.jpg" class="pic"/>
      </div>
      <div class="out_right">
        <img src="@/assets/img/4.jpg" class="pic"/>
      </div>
      <div class="out_top">
        <img src="@/assets/img/5.jpg" class="pic"/>
      </div>
      <div class="out_bottom">
        <img src="@/assets/img/6.jpg" class="pic"/>
      </div>
      <!--С������ -->
      <span class="in_front">
				<img src="@/assets/img/7.jpg" class="in_pic"/>
			</span>
      <span class="in_back">
			     <img src="@/assets/img/8.jpg" class="in_pic"/>
			</span>
      <span class="in_left">
				<img src="@/assets/img/9.jpg" class="in_pic"/>
			</span>
      <span class="in_right">
				<img src="@/assets/img/10.jpg" class="in_pic"/>
			</span>
      <span class="in_top">
				<img src="@/assets/img/11.jpg" class="in_pic"/>
			</span>
      <span class="in_bottom">
				<img src="@/assets/img/12.jpg" class="in_pic"/>
			</span>
    </div>
  </div>
  <div class="audio">
    <audio :autoplay="true" :controls="true" :loop="true" preload="auto"
           :src="selectedMusic">
      你的浏览器版本太低，不支持audio标签
    </audio>
    <input class="ml-5" type="file" @change="selectMusic" accept="audio/*">
  </div>
</template>

<style scoped>
.wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  height: 200px;
  margin: auto;
  z-index: 9;
  transform-style: preserve-3d;
}
.audio{
  display: flex;
  justify-content: center;
  align-items: center;
}

.cube {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(-80deg);
  -webkit-animation: rotate 20s infinite;

  animation-timing-function: linear;
}

@-webkit-keyframes rotate {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

.cube div {
  position: absolute;
  width: 200px;
  height: 200px;
  opacity: 0.8;
  transition: all .4s;
}

.pic {
  width: 200px;
  height: 200px;
}

.cube .out_front {
  transform: rotateY(0deg) translateZ(100px);
}

.cube .out_back {
  transform: translateZ(-100px) rotateY(180deg);
}

.cube .out_left {
  transform: rotateY(90deg) translateZ(100px);
}

.cube .out_right {
  transform: rotateY(-90deg) translateZ(100px);
}

.cube .out_top {
  transform: rotateX(90deg) translateZ(100px);
}

.cube .out_bottom {
  transform: rotateX(-90deg) translateZ(100px);
}

.cube span {
  display: bloack;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50px;
  left: 50px;
}

.cube .in_pic {
  width: 100px;
  height: 100px;
}

.cube .in_front {
  transform: rotateY(0deg) translateZ(50px);
}

.cube .in_back {
  transform: translateZ(-50px) rotateY(180deg);
}

.cube .in_left {
  transform: rotateY(90deg) translateZ(50px);
}

.cube .in_right {
  transform: rotateY(-90deg) translateZ(50px);
}

.cube .in_top {
  transform: rotateX(90deg) translateZ(50px);
}

.cube .in_bottom {
  transform: rotateX(-90deg) translateZ(50px);
}

.cube:hover .out_front {
  transform: rotateY(0deg) translateZ(200px);
}

.cube:hover .out_back {
  transform: translateZ(-200px) rotateY(180deg);
}

.cube:hover .out_left {
  transform: rotateY(90deg) translateZ(200px);
}

.cube:hover .out_right {
  transform: rotateY(-90deg) translateZ(200px);
}

.cube:hover .out_top {
  transform: rotateX(90deg) translateZ(200px);
}

.cube:hover .out_bottom {
  transform: rotateX(-90deg) translateZ(200px);
}
</style>