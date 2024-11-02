import { h, isRef } from 'vue'
import { ElDatePicker, ElFormItem, ElCol } from 'element-plus'
import { getBind, getComponent, isVueComponent } from '../utils/index.js'
import { cloneDeep } from 'lodash-es'
export default {
  name: 'selfForm',
  props: {
    formConfigList: {
      type: Array,
      default: () => []
    },
    queryParams: {
      type: Object,
      default: () => ({})
    },
    span: {
      type: [Number, String],
      default: 6
    },
    showText: Boolean,
    inline: Boolean,
  },
  emits: ['change'],
  render(ctx) {
    const { formConfigList, queryParams, span, inline, showText, $emit, $slots } = ctx
    return formConfigList.map((item) => generateFormItem(item, { queryParams, span, showText, inline, $emit, $slots }))
  }
}
function generateFormItem(item, ctx) {
  const { queryParams, span, inline, $emit, $slots } = ctx
  const showText = typeof item.showText === 'boolean' ? item.showText : ctx.showText
  const createFormItemBindData = { span, showText, queryParams, inline }
  if (item.type === 'slot') {
    return createFormItem(item, getSlotObj($slots, item.slotName, queryParams), createFormItemBindData)
  }
  if (item.type === 'times') {
    const startTimeKey = item.startKey || 'startTime'
    const endTimeKey = item.endKey || 'endTime'
    const startItem = { bind: item.startBind, key: startTimeKey }
    const endItem = { bind: item.endBind, key: endTimeKey }
    return createFormItem(
      item,
      [
        h(ElDatePicker, getDomBind(queryParams, startItem, ElDatePicker, $emit)),
        ' - ',
        h(ElDatePicker, getDomBind(queryParams, endItem, ElDatePicker, $emit))
      ],
      createFormItemBindData
    )
  }
  const component = isVueComponent(item.type) ? item.type : getComponent(item.type)
  return createFormItem(
    item,
    h(
      component,
      getDomBind(queryParams, item, component, $emit),
      item.childConfig && item.childConfig.type
        ? { default: () => getChildSlot(item) }
        : getSlotObj($slots, item.childSlot, {}, true)
    ),
    createFormItemBindData
  )
}
function createFormItem(item, dom, { span, showText, queryParams, inline }) {
  const insideDom = h(
    item.noLabel ? 'span' : ElFormItem,
    { label: item.label || ' ', required: item.notNull, ...item.formBind },
    (() => {
      if (showText && item.type !== 'slot') {
        return { default: () => h('span', {}, { default: () => queryParams[item.key] || '-- --' }) }
      }
      return item.noLabel ? dom : () => dom
    })()
  )
  return h(
    inline ? 'span' : ElCol,
    { span: Number(item.span) || Number(span) || 12 },
    inline ? insideDom : {
      default: () => insideDom
    }

  )
}
function getSlotObj($slots, key, param, defaultFun) {
  if (!key || !$slots[key]) return undefined
  if (defaultFun) {
    return { default: () => $slots[key](param) }
  }
  return $slots[key](param)
}
function getChildSlot(item) {
  const {
    childConfig: { keys, list, type, bind }
  } = item
  const keysConfig = keys || { label: 'label', value: 'value' }
  const component = isVueComponent(type) ? type : getComponent(type)
  if (!list) {
    console.error('childConfig list 格式错误：', list, item)
    return new Error('childConfig list 格式错误：', list)
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
function getDomBind(queryParams, item, component, $emit) {
  return {
    modelValue: queryParams[item.key],
    'onUpdate:modelValue': (value) => {
      queryParams[item.key] = value
    },
    onChange: (value) => $emit('change', value),
    ...getBind(item, component)
  }
}
