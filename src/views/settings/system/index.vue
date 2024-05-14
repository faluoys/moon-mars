<script setup lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from 'vue'
import {useI18n} from 'vue-i18n'
import {theme} from "@/theme/theme";
import {lightTheme} from "naive-ui";
import systemBar from "@/components/systemBar/systemBar.vue";
const {t} = useI18n();
const themeColor = computed(() => {
  return theme.value == lightTheme ? 'bg-[#eeeeee]' : 'bg-[#424242]'
})

onMounted(() => {
})

</script>

<template>
  <div class="h-full">
    <div>{{ $t('menu.system') }}</div>
    <div class="flex flex-col justify-center items-center h-full w-full">
      <div
          class="p-6 flex min-h-[300px] flex-col justify-center items-center w-[600px] h-1/2 z-10 shadow-custom transform">
        <div class="shadow-custom rounded-md w-full h-[250px]">
          <div :class="themeColor" class="font-bold rounded-t-[5px] text-lg text-center h-[55px] leading-[50px]">
            {{ $t('system.BeforeExitingTheApplication') }}
          </div>
          <div class="flex p-3 flex-col gap-3">
            <systemBar ref="sysRef"/>
          </div>
        </div>
<!--        <n-button class="w-1/4 mt-4" type="primary">-->
<!--          {{ $t('public.save') }}-->
<!--        </n-button>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.n-space) {
  flex-direction: column !important;
}

.shadow-custom {
  box-shadow: 0px 2px 2px rgba(99, 99, 99, 0.3), /* 上方阴影 */
          0px -1px 3px rgba(128, 128, 128, 0.1), /* 下方阴影 */
          1px 0px 3px rgba(128, 128, 128, 0.2), /* 右侧阴影 */
          -1px 0px 3px rgba(128, 128, 128, 0.2); /* 左侧阴影 */
  border-radius: 5px;
}
</style>