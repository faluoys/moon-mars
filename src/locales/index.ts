import {createI18n} from 'vue-i18n'

import zh from './lang/zh-cn.js'
import en from './lang/en.js'

//语言包
import {zhCN, enUS, dateZhCN, dateEnUS} from 'naive-ui'

const messages = {
  'zh-cn': {
    el: zhCN,
    ...zh
  },
  'en': {
    el: enUS,
    ...en
  }
}

interface LocaleMessages {
  [key: string]: {
    el: Record<string, unknown>; // Assuming 'el' is an object with string keys
    [key: string]: string | Record<string, unknown>; // Other properties can be strings or objects
  };
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('lang') || 'zh-cn',
  fallbackLocale: localStorage.getItem('lang') || 'zh-cn',
  messages: messages as LocaleMessages, // You might need to assert here
});

export default i18n
