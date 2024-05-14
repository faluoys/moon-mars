<script setup lang="ts">
import { defineComponent, reactive } from 'vue'
import {useTableHeight} from "@/hooks/useTableHeight";
const {tableHeight} = useTableHeight()
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30],
  showQuickJumper: true,
  displayOrder: ['size-picker', 'pages', 'quick-jumper'],
  onChange: (page:number) => {
    paginationReactive.page = page
  },
  onUpdatePageSize: (pageSize:number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
  }
})
const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
]
const data = Array.from({ length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`
}))
</script>

<template>
  <div>{{$t('menu.userManagement')}}</div>
  <n-data-table :columns="columns" :data="data" :pagination="paginationReactive" />
</template>

<style scoped>
:deep(.n-data-table-wrapper) {
  max-height: v-bind(tableHeight+'px');
  overflow-y: scroll!important;
}
</style>
