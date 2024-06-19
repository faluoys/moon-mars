<script setup lang="ts">
import { defineComponent, reactive } from 'vue'
import {useTableHeight} from "@/hooks/useTableHeight";
const {tableHeight} = useTableHeight()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
interface ItemCountProps {
  itemCount: number;
}
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30],
  showQuickJumper: true,
  displayOrder: ['size-picker', 'pages', 'quick-jumper'],
  prefix ({ itemCount }: ItemCountProps) {
    return `${t('public.total')} ${itemCount}`
  },
  onChange: (page:number) => {
    paginationReactive.page = page
  },
  onUpdatePageSize: (pageSize:number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
  }
})
interface User {
  key: number;
  name: string;
  age: number;
  address: string;
  email: string;
  phone: string;
  role: Role;
}

type Role = 'Admin' | 'User' | 'Editor' | 'Viewer';

interface Column {
  title: string;
  key: keyof User;
  width?: number;
}

const columns: Column[] = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age',
    width: 80
  },
  {
    title: 'Address',
    key: 'address',
    width: 210
  },
  {
    title: 'Email',
    key: 'email',
    width: 210
  },
  {
    title: 'Phone',
    key: 'phone'
  },
  {
    title: 'Role',
    key: 'role'
  }
];

const roles: Role[] = ['Admin', 'User', 'Editor', 'Viewer'];

const data: User[] = Array.from({ length: 16 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: Math.floor(Math.random() * 60) + 18, // 随机年龄 18 到 77
  address: `London, Park Lane no. ${index}`,
  email: `edward.king${index}@example.com`,
  phone: `+44 20 7946 ${String(index).padStart(4, '0')}`,
  role: roles[Math.floor(Math.random() * roles.length)]
}));
</script>

<template>
  <div>{{$t('menu.userManagement')}}</div>
  <div>
    <n-data-table :columns="columns" :scroll-x="1000" :max-height="tableHeight - 50" striped :data="data" :pagination="paginationReactive" />
  </div>
</template>

<style scoped>
</style>
