import * as ElementPlus from 'element-plus'
import { toRaw } from 'vue'
const defTmBindData = {
  style: 'width: 190px',
  type: 'datetime',
  placeholder: '请选择时间',
  format: 'YYYY-MM-DD HH:mm:ss',
  valueFormat: 'YYYY-MM-DD HH:mm:ss'
}
export function getBind(configItem, component) {
  const defBindData = {
    placeholder: configItem.label || '',
    clearable: true,
    style: 'width: 200px'
  }
  const bindData = { ...(configItem.bind || {}) }
  if (component === ElementPlus.ElDatePicker) {
    return { ...defTmBindData, ...bindData }
  }
  return { ...defBindData, ...bindData }
}
function getBindDataForProps(bindData, component) {
  if (!bindData) return {}
  const obj = {}
  const { props } = component
  Object.keys(bindData).forEach((key) => {
    // 原始：props && props[key]
    const propsItem = toRaw(props && props[key])?.type ?? toRaw(props && props[key])
    const bindDataItem = bindData[key]
    if (!propsItem) {
      if (typeof bindDataItem === 'function') {
        obj[key] = bindDataItem()
      } else {
        obj[key] = bindDataItem
      }
      return
    }
    // 直接是函数
    if (typeof propsItem === 'function') {
      getBindDataForPropsTypeData(bindDataItem, propsItem, { obj, key })
      return
    }
    // 对象捕捉
    if (typeof propsItem === 'object') {
      // 数组多类型参数捕捉
      // if (Array.isArray(propsItem.type)) {
      //   // 数组含函数优先级最高
      //   const FunctionType = propsItem.type.find((item) => item.name === 'Function')
      //   if (FunctionType) {
      //     getBindDataForPropsTypeData(bindDataItem, FunctionType, { obj, key })
      //     return
      //   }
      //   //无函数处理
      //   if (typeof bindDataItem === 'function') {
      //     obj[key] = bindDataItem()
      //   } else {
      //     obj[key] = bindDataItem
      //   }
      //   return
      // }
      // 数组多类型参数捕捉
      if (Array.isArray(propsItem)) {
        // 数组含函数优先级最高
        const FunctionType = propsItem.find((item) => item.name === 'Function')
        if (FunctionType) {
          getBindDataForPropsTypeData(bindDataItem, FunctionType, { obj, key })
          return
        }
        //无函数处理
        if (typeof bindDataItem === 'function') {
          obj[key] = bindDataItem()
        } else {
          obj[key] = bindDataItem
        }
        return
      }
      // 非数组参数捕捉
      getBindDataForPropsTypeData(bindDataItem, propsItem.type, { obj, key })
      return
    }
  })
  return obj
}
function getBindDataForPropsTypeData(bindDataItem, propsItemType, { obj, key }) {
  if (propsItemType.name === 'Function') {
    if (typeof bindDataItem === 'function') {
      obj[key] = bindDataItem
    } else {
      obj[key] = () => bindDataItem
    }
  } else {
    if (typeof bindDataItem === 'function') {
      obj[key] = bindDataItem()
    } else {
      if (['String', 'Number', 'Boolean'].includes(propsItemType.name)) {
        obj[key] = propsItemType(bindDataItem)
      } else {
        obj[key] = bindDataItem
      }
    }
  }
}
export function getComponentName(name = 'input') {
  const nameStr = name || 'input'
  const nameSplitList = nameStr.split('-').map((str) => str.charAt(0).toUpperCase() + str.slice(1))
  if (nameSplitList[0] !== 'El' && nameSplitList[0].slice(0, 2) !== 'El') {
    nameSplitList.unshift('El')
  }
  return nameSplitList.join('')
}

export function getComponent(configItemType) {
  if (configItemType === null) return 'div'
  const componentName = getComponentName(configItemType || 'input')
  if (ElementPlus[componentName]) {
    return ElementPlus[componentName]
  }
  return ElementPlus['ElInput']
}
function getSlotAndChildSlot(item, list = [], slotKeyList = []) {
  slotKeyList.forEach((key) => {
    if (item[key]) {
      list.push(item[key])
    }
  })
  if (item.child && item.child.length !== 0) {
    item.child.forEach((child) => {
      getSlotAndChildSlot(child, list)
    })
  }
  return list
}
export function getSlotList(list, slotKeyList = []) {
  if (!list) return []
  return list.map((item) => getSlotAndChildSlot(item, [], slotKeyList)).flatMap((item) => item)
}
export function rowScopeToRaw(row) {
  const data = {
    $index: row.$index,
    cellIndex: row.cellIndex,
    column: row.column,
    expanded: row.expanded,
    row: row.row
  }
  return data
}

//判断是否为vue组件
export function isVueComponent(obj) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (
      ((obj.render || obj.install) && // Vue 3的响应式标记
        (typeof obj.render === 'function' || typeof obj.install === 'function') // 确保有渲染函数
      )
      || obj.setup
    )
  )
}
export function getDataOfKeyText(data, keyText) {
  if (!keyText || !data) return ''
  // 将属性路径分割成数组
  const propsArr = keyText ? keyText.split('.') : []

  // 定义一个递归函数来获取嵌套的值
  function getValue(obj, propsArr, index = 0) {
    // 如果我们已经到达属性数组的末尾，返回当前对象
    if (index === propsArr.length) {
      return obj
    }

    // 如果当前对象没有下一个属性，返回undefined
    if (!obj || !Object.prototype.hasOwnProperty.call(obj, propsArr[index])) {
      return undefined
    }

    // 递归调用以获取下一个属性的值
    return getValue(obj[propsArr[index]], propsArr, index + 1)
  }

  // 调用递归函数并返回结果
  return getValue(data, propsArr)
}
