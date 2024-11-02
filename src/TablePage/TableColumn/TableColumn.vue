<template>
  <ElTableColumn
    align="center"
    show-overflow-tooltip
    minWidth="90"
    v-bind="$attrs"
    :prop="props.prop"
  >
    <template v-for="name in Object.keys($slots)" :key="name" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
    <template #default="{ row }" v-if="isShowFilterTemplate">
      {{ showText(row) }}
    </template>
  </ElTableColumn>
</template>
<script setup>
import { ElTableColumn } from 'element-plus'
import { computed } from 'vue'
import { getDataOfKeyText } from '../../utils/index'
const props = defineProps({
  cellFilter: Function,
  prop: String,
})
const isShowFilterTemplate = computed(() => !!props.cellFilter)

function showText(row) {
  if (!props.cellFilter) return getDataOfKeyText(row, props.prop)
  return props.cellFilter(getDataOfKeyText(row, props.prop))
}
</script>
