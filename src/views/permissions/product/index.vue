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
interface Product {
  key: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

interface Column {
  title: string;
  key: keyof Product;
  width?: number;
}

const columns: Column[] = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Category',
    key: 'category'
  },
  {
    title: 'Price',
    key: 'price'
  },
  {
    title: 'Stock',
    key: 'stock'
  },
  {
    title: 'Description',
    key: 'description',
    width: 210
  }
];

const categories: string[] = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'];

const data: Product[] = Array.from({ length: 37 }).map((_, index) => ({
  key: index,
  name: `Product ${index}`,
  category: categories[Math.floor(Math.random() * categories.length)],
  price: parseFloat((Math.random() * 1000).toFixed(2)), // 随机价格 0.00 到 999.99
  stock: Math.floor(Math.random() * 100), // 随机库存数量 0 到 99
  description: `Description of Product ${index}`
}));
</script>

<template>
  <div>{{ $t('menu.productManagement') }}</div>
  <div>
    <n-data-table :columns="columns" :max-height="tableHeight - 50" striped :data="data" :pagination="paginationReactive" />
  </div>
</template>

<style scoped>

</style>
