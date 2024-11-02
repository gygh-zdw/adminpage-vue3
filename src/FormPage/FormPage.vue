<template>
  <el-form :label-width="props.inline ? '' : 'auto'" v-bind="$attrs" style="display: flex; flex-wrap: wrap; width: 100%">
    <el-row>
      <selfForm :formConfigList="props.formConfig" :span="props.span" :inline="props.inline" :showText="props.showText"
        v-model:queryParams="formParams">
        <template v-for="slotName in getSlotList(props.formConfig, [
          'slotName',
          'childSlot',
        ])" v-slot:[slotName]="scope" :key="slotName">
          <slot :name="slotName" :params="formParams" v-bind="{ ...scope }" />
        </template>
      </selfForm>
    </el-row>
  </el-form>
</template>
<script setup>
import { getSlotList, getComponentName } from '../utils/index.js'
import selfForm from './selfForm.js'
// import 'element-plus/theme-chalk/index.scss'
import { ElRow, ElForm } from 'element-plus'
import { computed, watch } from 'vue'
import validateDate from './validateDate.js'
const props = defineProps({
  formConfig: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: () => { },
  },
  span: {
    type: [Number, String],
    default: 24,
  },
  validateHandle: {
    type: Function,
    default: () => '',
  },
  showText: Boolean,
  inline: Boolean,
})
const emits = defineEmits(['update:modelValue', 'change'])
const formParams = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

const searchParams = computed(() => {
  const obj = {}
  props.formConfig.forEach((item) => {
    if (item.type === 'slot') return
    if (item.type === null) return
    let defaultValue = ''
    if (
      typeof item.type === 'string' &&
      getComponentName(item.type) === 'ElCheckboxGroup'
    ) {
      defaultValue = []
    }
    if (
      typeof item.type === 'string' &&
      getComponentName(item.type) === 'ElInputNumber'
    ) {
      defaultValue = 0
    }
    if (item.type === 'times') {
      const startTimeKey = item.startKey || 'startTime'
      const endTimeKey = item.endKey || 'endTime'
      obj[startTimeKey] = item.startDefaultValue || defaultValue
      obj[endTimeKey] = item.endDefaultValue || defaultValue
      return
    }
    if (!obj[item.key]) {
      obj[item.key] = item.defaultValue || defaultValue
    }
  })
  return obj
})
watch(
  () => searchParams,
  () => {
    formParams.value = { ...searchParams.value, ...formParams.value }
  },
  {
    immediate: true,
  }
)
async function validate(callback) {
  return await validateDate(callback, props, formParams)
}
const formItemMarginLeft = computed(() => (props.inline ? '20px' : '0'))
function setInitParams() {
  formParams.value = { ...searchParams.value }
}
defineExpose({
  validate,
  setInitParams,
})
</script>
<style lang="scss" scoped>
:deep(.el-form-item--default) {
  margin-left: v-bind(formItemMarginLeft);
}
</style>
