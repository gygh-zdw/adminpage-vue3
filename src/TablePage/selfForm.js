import { h, isRef } from 'vue'
import { ElDatePicker, ElFormItem } from 'element-plus'
import { getBind, getComponent, isVueComponent } from '../utils/index.js'
import { cloneDeep } from 'lodash-es'

export default {
  name: 'selfForm',
  props: {
    searchConfigList: {
      type: Array,
      default: () => []
    },
    queryParams: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['change'],
  render(ctx) {
    const { searchConfigList, queryParams, $emit, $slots } = ctx
    return searchConfigList.map((item) => generateFormItem(item, { queryParams, $emit, $slots }))
  }
}
function generateFormItem(item, { queryParams, $emit, $slots }) {

  if (item.type === 'slot') {
    return createFormItem(item, getSlotObj($slots, item.slotName, queryParams))
  }
  if (item.type === 'times') {
    const startTimeKey = item.startKey || 'startTime'
    const endTimeKey = item.endKey || 'endTime'
    const startItem = { bind: item.startBind, key: startTimeKey }
    const endItem = { bind: item.endBind, key: endTimeKey }
    return createFormItem(item, [
      h(ElDatePicker, getDomBind(queryParams, startItem, ElDatePicker, $emit)),
      ' - ',
      h(ElDatePicker, getDomBind(queryParams, endItem, ElDatePicker, $emit))
    ])
  }
  const component = isVueComponent(item.type) ? item.type : getComponent(item.type)
  return createFormItem(item, h(component, getDomBind(queryParams, item, component, $emit),
    item.childConfig && item.childConfig.type
      ? { default: () => getChildSlot(item) }
      : getSlotObj($slots, item.childSlot, {}, true)))
}
function createFormItem(item, dom) {
  return h(item.noLabel ? 'span' : ElFormItem, { label: item.label }, item.noLabel ? dom : () => dom)
}
function getSlotObj($slots, key, param, defaultFun) {
  if (!key || !$slots[key]) return undefined
  if (defaultFun) {
    return { default: () => $slots[key](param) }
  }
  return $slots[key](param)
}
function getDomBind(queryParams, item, component, $emit) {
  return {
    modelValue: queryParams[item.key],
    'onUpdate:modelValue': (value) => { queryParams[item.key] = value; },
    'onChange': (value) => $emit('change', value),
    ...getBind(item, component)
  }
}
function getChildSlot(item) {
  const {
    childConfig: { keys, list, type, bind }
  } = item
  const keysConfig = keys || { label: 'label', value: 'value' }
  const component = isVueComponent(type) ? type : getComponent(type)
  if (!list) {
    console.error('childList 格式错误：', list, item)
    return new Error('childList 格式错误：', list)
  }
  const childList = isRef(list) ? list.value : list
  const domList = childList.map((child) => {
    let bindData = cloneDeep(bind) || {}
    for (let key in keysConfig) {
      bindData[key] = child[keysConfig[key]]
    }
    return h(component, bindData)
  })
  return domList
}