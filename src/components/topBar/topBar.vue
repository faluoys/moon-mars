<template>
  <n-layout-header
      @mousedown="mousedown"
      class="topBar min-h-[55px] flex"
  >
    <div class="flex justify-between items-center w-full">
      <div class="flex pl-5 justify-around items-center max-w-[300px]">
        <img class="w-[30px] mr-1.5" src="../../assets/logo.svg" alt="">
        <div>Moon-Mars</div>
      </div>
      <div class="flex-auto text-3xl font-bold font-serif text-center cursor-pointer">
        Moon-Mars
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
        <n-button @click="handleClose" text class="text-2xl justify-center">
          <n-icon>
            <CloseOutline/>
          </n-icon>
        </n-button>
      </div>
    </div>
    <n-modal
        v-model:show="showModal"
        preset="dialog"
        title="Dialog"
    >
      <template #header>
        <div>{{ $t('public.confirmExit') }}</div>
      </template>
      <template class="flex p-3 flex-col gap-3">
        <systemBar />
      </template>
      <template #action>
        <n-button @click="cancel">{{$t('public.cancel')}}</n-button>
        <n-button @click="confirm" type="primary">{{$t('public.confirm')}}</n-button>
      </template>
    </n-modal>
  </n-layout-header>
</template>
<script setup lang="ts">
import {ref, reactive, shallowRef, onMounted, computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import {NIcon} from "naive-ui";
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
import systemBar from "@/components/systemBar/systemBar.vue";

const router = useRouter();
const {ipcRenderer} = window
const {t, locale} = useI18n();
const iconShow = ref(true);
const showModal = ref(false);
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
const handleSelect = (key: string) => {
  iconShow.value = key === 'zh-cn';
  emits('locale', key);
}
onMounted(() => {
  iconShow.value = locale.value === 'zh-cn';
})


const isKeyDown = ref(false);
const lastX = ref(0);
const lastY = ref(0);
const mousedown = (e: MouseEvent) => {
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
const toggle = (e: MouseEvent) => {
  props?.toggleTheme?.(e);
  currentIcon.value = currentIcon.value === SunnyIcon ? MoonIcon : SunnyIcon;
}
const settings = () => {
  router.push({name: 'settings-system'})
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

const handleClose = () => {
  const systemKey = localStorage.getItem('systemKey')
  const remindKey = localStorage.getItem('remindKey') === 'true'
  // console.log(remindKey)
  if (remindKey) {
    if (systemKey == '0') {
      trayHideWin()
    } else if (systemKey == '1') {
      closeWin()
    }
    return;
  }
  showModal.value = true;
}

const confirm = () => {
  const systemKey = localStorage.getItem('systemKey')
  if (systemKey == '0') {
    trayHideWin()
  } else if (systemKey == '1') {
    closeWin()
  }
  if (location.href.includes('/settings/system') && !showModal.value){
    router.go(0)
  }
  cancel()
}
const cancel = () => {
  showModal.value = false;
}
const trayHideWin = () => {
  ipcRenderer.send('window', {
    name: 'hide'
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
:deep(.n-space) {
  flex-direction: column !important;
}
</style>
