<template>
  <el-popconfirm :title="title" @confirm="deleteHandle">
    <template #reference>
      <slot name="reference">
        <el-button link type="danger" v-bind="$attrs">
          {{ props.buttonText }}
        </el-button>
      </slot>
    </template>
  </el-popconfirm>
</template>
<script setup>
import { ElPopconfirm, ElButton } from 'element-plus'

import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: '确定删除？',
  },
  buttonText: {
    type: String,
    default: '删除',
  },
})
const emit = defineEmits(['delete'])

/**
 * @description: 确认删除事件，此时用户已经二次确认删除，执行删除相关处理流程
 * @return {*}
 */
function deleteHandle() {
  emit('delete', true)
}
</script>
