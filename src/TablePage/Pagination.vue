<template>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    layout="prev, pager, next, jumper, ->, total, sizes"
    :total="props.total"
    v-bind="$attrs"
  />
</template>
<script setup>
import { computed } from 'vue'
import { ElPagination } from 'element-plus'
// import 'element-plus/theme-chalk/el-pagination.css'

// eslint-disable-next-line no-undef
const props = defineProps({
  limit: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:page', 'update:limit', 'changePagination'])
const currentPage = computed({
  get() {
    return props.page
  },
  set(val) {
    emit('update:page', val)
    emitChangeFun(props.val, props.limit)
  },
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set(val) {
    emit('update:page', 1)
    emit('update:limit', val)
    emitChangeFun(1, props.limit)
  },
})
function emitChangeFun(page, limit) {
  emit('changePagination', { page, limit })
}
</script>
