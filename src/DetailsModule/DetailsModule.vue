<template>
  <div v-for="(item, index) in showConfig" :key="index">
    <div class="title">{{ item.title }}</div>
    <el-row class="info">
      <template v-for="obj in item.list" :key="obj.key">
        <el-col :span="3" class="label">{{ obj.label }}</el-col>
        <el-col :span="valueSpan(obj)" class="value">
          <slot v-if="obj.slotName" :name="obj.slotName"></slot>
          <span v-if="!obj.slotName" class="valueText">
            {{ showDataText(item, obj) }}
          </span>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script setup>
import { ElRow, ElCol } from 'element-plus'
import { computed } from 'vue'
import { getDataOfKeyText } from '../utils/index'

const props = defineProps({
  config: {
    type: [Array, Object],
    default: () => [],
  },
  data: {
    type: Object,
    default: () => {},
  },
  nullText: {
    type: String,
    default: '',
  },
})
function valueSpan(obj) {
  if (!obj.column) return 3
  if (!/^\d$/.test(obj.column)) return 3
  return obj.column * 3
}
function showDataText(item, obj) {
  let key
  if (item.moduleKey) {
    key = `${item.moduleKey}.${obj.key}`
  } else {
    key = obj.key
  }
  const text = getDataOfKeyText(props.data, key)
  let nullText = ''
  if (props.nullText !== undefined) {
    nullText = props.nullText
  }
  if (item.nullText !== undefined) {
    nullText = item.nullText
  }
  if (obj.nullText !== undefined) {
    nullText = obj.nullText
  }
  return text || nullText
}
const showConfig = computed(() => {
  if (!Array.isArray(props.config)) {
    return [props.config]
  }
  return props.config
})
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 10px;
}
.label,
.value {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  word-wrap: break-word;
  width: 100%;
}
.label {
  background: #f2f2f2;
  padding: 10px 0;
}
.info {
  margin-bottom: 20px;
}
</style>
