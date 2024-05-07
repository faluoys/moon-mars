<template>
  <n-layout-header
    @mousedown="mousedown"
    class="topBar"
    style="height: 55px;display: flex"

  >
    <div class="flex justify-between items-center w-full">
      <div class="flex flex-1 justify-around max-w-[300px]">
        Electron
      </div>
      <div class="flex-auto text-3xl font-bold font-serif text-center cursor-pointer">
        Electron
      </div>
      <div class="flex justify-around flex-1 max-w-[300px]">
        <n-dropdown
          placement="bottom-start"
          trigger="click"
          size="medium"
          :options="options"
          @select="handleSelect"
        >
          <n-button @click="Languages" text class="text-2xl justify-center">
            <n-icon>
              <Language/>
            </n-icon>
          </n-button>
        </n-dropdown>
        <n-button @click="toggle" text class="text-2xl justify-center">
          <n-icon>
            <component :is="currentIcon"/>
          </n-icon>
        </n-button>
        <n-button @click="settings" text class="text-2xl justify-center">
          <n-icon>
            <Settings/>
          </n-icon>
        </n-button>
        <n-button @click="minimizeScreen" text class="text-2xl justify-center">
          <n-icon>
            <Remove/>
          </n-icon>
        </n-button>
        <n-button @click="toggleFullScreen" text class="text-2xl justify-center">
          <n-icon>
            <component :is="fullScreen"/>
          </n-icon>
        </n-button>
        <n-button @click="closeWin" text class="text-2xl justify-center">
          <n-icon>
            <CloseOutline/>
          </n-icon>
        </n-button>
      </div>
    </div>
  </n-layout-header>
</template>
<script setup lang="ts">
import {ref,reactive, shallowRef,onMounted,computed} from "vue";
import {NIcon, createLocale, useMessage, zhCN,enUS,dateZhCN} from "naive-ui";
import {
  Settings,
  CloseOutline,
  Remove,
  Language,
  MoonOutline as MoonIcon,
  SunnyOutline as SunnyIcon,
  Checkmark,
} from "@vicons/ionicons5";
import {FullscreenOutlined, FullscreenExitOutlined,} from "@vicons/antd";
import {useI18n} from "vue-i18n";
import {renderIcon} from "@/utils";
const { ipcRenderer } = window
const {t,locale} = useI18n();
const iconShow = ref(true);
const options = computed(() => {
    return [
        {
            label: '简体中文',
            key: 'zh-cn',
            icon: iconShow.value ? renderIcon(Checkmark) : null,
        },
        {
            label: 'English',
            key: 'en',
            icon: !iconShow.value ? renderIcon(Checkmark) : null,
        },
    ]
})
const emits = defineEmits(['locale']);
const handleSelect= (key:string)=> {
  iconShow.value = key === 'zh-cn';
  emits('locale', key);
}
onMounted(() => {
    iconShow.value = locale.value === 'zh-cn';
})


const isKeyDown = ref(false);
const lastX = ref(0);
const lastY = ref(0);
const mousedown = (e:MouseEvent) => {
  isKeyDown.value = true;
  lastX.value = e.x
  lastY.value = e.y
  let width = parseInt(window.outerWidth.toString());
  let height = parseInt(window.outerHeight.toString());
  document.onmousemove = (ev) => {
    if (isKeyDown.value) {
      const x = ev.screenX - lastX.value;
      const y = ev.screenY - lastY.value;
      let data = {
        appX: x,
        appY: y,
        width,
        height,
      }
      ipcRenderer.invoke('drag-window', data)
    }
  }
  document.onmouseup = () => {
    isKeyDown.value = false;
  }
}

const props = defineProps({
  toggleTheme: Function,//必传
})
const Languages = () => {

}
const fullScreen = shallowRef(FullscreenOutlined);
const currentIcon = shallowRef(MoonIcon);
const toggle = () => {
  props?.toggleTheme?.();
  currentIcon.value = currentIcon.value === SunnyIcon ? MoonIcon : SunnyIcon;
}
const settings = () => {
  alert(1)
}
const toggleFullScreen = () => {
  fullScreen.value = fullScreen.value === FullscreenOutlined ? FullscreenExitOutlined : FullscreenOutlined;
  ipcRenderer.send('window', {
    name: 'maximize'
  })
}
const minimizeScreen = () => {
  ipcRenderer.send('window', {
    name: 'minimize'
  })
}
const closeWin = () => {
  ipcRenderer.send('window', {
    name: 'close'
  })
}


</script>
<style scoped>
.topBar {
  z-index: 999;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.4);
}
</style>
