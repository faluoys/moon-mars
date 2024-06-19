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
  role: Role;
  email: string;
  permissions: string;
}

type Role = 'Admin' | 'User' | 'Editor' | 'Viewer';

const columns: Array<{ title: string, key: keyof User,width?: number }> = [
  {
    title: 'Name',
    key: 'name',
    width: 80
  },
  {
    title: 'Role',
    key: 'role',
    width: 80
  },
  {
    title: 'Email',
    key: 'email'
  },
  {
    title: 'Permissions',
    key: 'permissions'
  }
];

const roles: Role[] = ['Admin', 'User', 'Editor', 'Viewer'];
const permissions: string[] = ['read', 'write', 'execute', 'delete'];

const getRandomRole = (): Role => roles[Math.floor(Math.random() * roles.length)];

const getRandomPermissions = (): string => {
  const perms: string[] = [];
  permissions.forEach(perm => {
    if (Math.random() > 0.5) {
      perms.push(perm);
    }
  });
  return perms.join(', ');
};

const data: User[] = Array.from({ length: 12 }).map((_, index) => ({
  key: index,
  name: `User ${index}`,
  role: getRandomRole(),
  email: `user${index}@example.com`,
  permissions: getRandomPermissions()
}));
</script>
<template>
  <div>{{ $t('menu.roleManagement')}}</div>
  <div>
    <n-data-table :columns="columns" :max-height="tableHeight - 50" striped :data="data" :pagination="paginationReactive" />
  </div>
</template>

<style scoped>
</style>
