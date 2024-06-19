<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, ref, onMounted, onUnmounted} from "vue";

const {t} = useI18n();
const value = ref(localStorage.getItem('systemKey') || '1')
const remind = ref(localStorage.getItem('remindKey') === 'true' || false)

const songs = computed(() => [
  {
    value: '0',
    label: t('system.MinimizeToSystemTray'),
  },
  {
    value: '1',
    label: t('system.ExitApplication'),
  },
])
const updateRadio = (e: string) => {
  value.value = e
  localStorage.setItem('systemKey', value.value)
}
const updateChecked = (e: boolean) => {
  remind.value = e
  localStorage.setItem('remindKey', remind.value.toString())
}
onMounted(() => {
  localStorage.setItem('systemKey', value.value)
  localStorage.setItem('remindKey', remind.value.toString())
})
defineExpose({
  value,
  remind,
})
</script>

<template>
  <n-radio-group v-model:value="value" @update:value="updateRadio" name="radiogroup" size="large">
    <n-space class="flex flex-col">
      <n-radio v-for="song in songs" :key="song.value" :value="song.value">
        {{ song.label }}
      </n-radio>
    </n-space>
  </n-radio-group>

  <n-space class="flex flex-col">
    <n-checkbox size="large" v-model:checked="remind" @update:checked="updateChecked">
      {{ $t('system.NotPromptingAgain') }}
    </n-checkbox>
  </n-space>
</template>

<style scoped>

</style>