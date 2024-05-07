<template>
  <n-config-provider class="w-full" :theme="theme" :locale="locale" :date-locale="dateZhCN">
    <n-message-provider>
      <div class="w-full h-screen">
        <n-space class="w-full h-screen" vertical>
          <n-layout class="h-screen overflow-hidden">
            <topBar :toggleTheme="toggleTheme" @locale="toggleLanguages"/>
            <n-layout has-sider>
              <n-layout-sider
                  show-trigger
                  collapse-mode="width"
                  :collapsed-width="64"
                  :width="210"
                  :native-scrollbar="false"
                  class="sider"
              >
                <n-menu
                    class="h-auto"
                    accordion
                    :collapsed-width="64"
                    :collapsed-icon-size="22"
                    @update:value="onChange"
                    :options="menuOptions"
                />
              </n-layout-sider>
              <n-layout-content

                  ref="contentRef"
                  content-style="padding: 24px;"
                  :native-scrollbar="false"
              >
                <router-view name="menu"/>
              </n-layout-content>
            </n-layout>
            <n-layout-footer class="footer">
              {{ $t('login.slogan') }}
            </n-layout-footer>
          </n-layout>
        </n-space>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import {
  h,
  ref,
  reactive,
  shallowRef,
  watch,
  watchEffect,
  onUnmounted,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  computed
} from "vue";
import {useRouter} from "vue-router";
import topBar from '../components/topBar/topBar.vue'
import {darkTheme, lightTheme, NIcon, dateZhCN,MenuOption} from 'naive-ui'
import {
  Home,
  DesktopSharp,
  AnalyticsOutline as AnalyticsIcon,
  DocumentsSharp,
  SettingsSharp,
} from "@vicons/ionicons5";
import {ShopFilled, UserAddOutlined, ProfileFilled,AccountBookFilled,UsergroupDeleteOutlined, DashboardFilled as DashboardIcon,} from "@vicons/antd";
import {useI18n} from 'vue-i18n'
import i18n from "@/locales";
import {renderIcon} from "@/utils";
let { proxy } = getCurrentInstance() as ComponentInternalInstance;

let locale = computed(() => {
  const locales = (proxy?.$i18n?.locale || 'en') as string;
  return i18n.global.messages.value[locales]?.el || '';
})
const {t} = useI18n();
const toggleLanguages = (val: string) => {
  if (proxy?.$i18n) {
    proxy.$i18n.locale = val;
  }
  localStorage.setItem('lang', val);
};
const theme = shallowRef(lightTheme)
const toggleTheme = () => {
  theme.value = theme.value === lightTheme ? darkTheme : lightTheme
}
const router = useRouter();
const onChange = (key:string, option:MenuOption) => {
  console.log(key, option)
  router.push({name: key})
}


const menuOptions = computed(() => {
  return [
    {
      label: t('menu.home'),
      key: "home",
      icon: renderIcon(Home),
    },
    {
      label: t('menu.permission'),
      key: "/permissions",
      icon: renderIcon(DesktopSharp),
      children: [
        {
          label: t('menu.productManagement'),
          key: "permissions-index",
          icon: renderIcon(ShopFilled)
        },
        {
          label: t('menu.roleManagement'),
          key: "permissions-roles",
          icon: renderIcon(UsergroupDeleteOutlined)
        },
        {
          label: t('menu.userManagement'),
          key: "permissions-users",
          icon: renderIcon(UserAddOutlined)
        },
      ]
    },
    {
      label: t('menu.analytics'),
      key: "/analytics",
      icon: renderIcon(AnalyticsIcon),
      children: [
        {
          label: t('menu.dashboard'),
          key: "analytics-dashboard",
          icon: renderIcon(DashboardIcon)
        },
        {
          label: t('menu.reports'),
          key: "analytics-reports",
          icon: renderIcon(DocumentsSharp)
        },
        // 可以添加更多的分析功能子菜单项
      ]
    },
    {
      label: t('menu.settings'),
      key: "/settings",
      icon: renderIcon(SettingsSharp),
      children: [
        {
          label: t('menu.profile'),
          key: "settings-profile",
          icon: renderIcon(ProfileFilled)
        },
        {
          label: t('menu.account'),
          key: "settings-account",
          icon: renderIcon(AccountBookFilled)
        },
        // 可以添加更多的设置选项子菜单项
      ]
    },
    // 可以添加更多的顶级菜单项
  ]

});

const contentRef = ref(null);
onMounted(() => {

})
onUnmounted(() => {
})
</script>
<style scoped>
:deep(.n-layout-scroll-container) {
  display: flex;
  flex-direction: column;
}

.sider {
  z-index: 100;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
}

.footer {
  text-align: center;
  line-height: 49px;
  z-index: 999;
  height: 50px;
  box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.1);
}
</style>
