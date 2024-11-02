import { ElMessage } from 'element-plus'

const INT_PATTERN = /^\d+$/
const NUMBER_PATTERN = /^\d+(\.\d+)?$/
const MINUS_NUMBER_PATTERN = /^(-?)\d+(\.\d+)?$/
function isIntegerString(n) {
  const pattern = INT_PATTERN // 匹配整数
  return pattern.test(n)
}
function isNumber(n, lengthNum) {
  if (typeof lengthNum === 'boolean') {
    const pattern = NUMBER_PATTERN // 匹配数值
    return pattern.test(n)
  }
  const patternStr = `^\\d+(\\.\\d{1,${lengthNum}})?$` // 匹配小值
  const pattern = new RegExp(patternStr)
  return pattern.test(n)
}
function isMinusNumber(n, lengthNum) {
  if (typeof lengthNum === 'boolean') {
    const pattern = MINUS_NUMBER_PATTERN // 匹配数值
    return pattern.test(n)
  }
  const patternStr = `^(-?)\\d+(\\.\\d{1,${lengthNum}})?$` // 匹配小值
  const pattern = new RegExp(patternStr)
  return pattern.test(n)
}
export default async function validateDate(callback, props, formParams) {
  const { formConfig, validateHandle } = props
  const formData = formParams.value
  const newLineStr = '<br/>'
  let errStr = ''
  formConfig.map((item) => {
    if (item.notNull) {
      if (item.type === 'times') {
        if (!formData.startTime || !formData.startTime) {
          errStr += `【${item.label} 未填写】${newLineStr}`
          return
        }
      } else {
        if (!formData[item.key]) {
          errStr += `【${item.label} 未填写】${newLineStr}`
          return
        }
        if (
          Array.isArray(formData[item.key]) &&
          formData[item.key].length == 0
        ) {
          errStr += `【${item.label} 未填写】${newLineStr}`
          return
        }
      }
    }

    if (formData[item.key] && item.validateRegExp) {
      if (item.validateRegExp instanceof RegExp) {
        if (!item.validateRegExp.test(formData[item.key])) {
          errStr += `【${item.label} 格式不正确】${newLineStr}`
          return
        }
      }

      if (typeof item.validateRegExp === 'object') {
        if (item.validateRegExp.RegExp && (item.validateRegExp.RegExp instanceof RegExp)) {
          if (!item.validateRegExp.RegExp.test(formData[item.key])) {
            if (item.validateRegExp.errText) {
              errStr += `【${item.validateRegExp.errText}】${newLineStr}`
            } else {
              errStr += `【${item.label} 格式不正确】${newLineStr}`
            }
            return
          }
        }
      }
    }
    if (
      formData[item.key] &&
      item.isInt &&
      !isIntegerString(formData[item.key])
    ) {
      errStr += `【${item.label}应当为整数】${newLineStr}`
      return
    }
    if (
      formData[item.key] &&
      item.isNumber &&
      !isNumber(formData[item.key], item.isNumber)
    ) {
      if (typeof item.isNumber === 'boolean') {
        errStr += `【${item.label}应当为数值】${newLineStr}`
      }
      if (typeof item.isNumber === 'number') {
        errStr += `【${item.label}应当为${item.isNumber}位小数，且不能为负数】${newLineStr}`
      }
      return
    }
    if (
      formData[item.key] &&
      item.isMinusNumber &&
      !isMinusNumber(formData[item.key], item.isMinusNumber)
    ) {
      if (typeof item.isMinusNumber === 'boolean') {
        errStr += `【${item.label}应当为数值】${newLineStr}`
      }
      if (typeof item.isMinusNumber === 'number') {
        errStr += `【${item.label}应当为${item.isMinusNumber}位小数】${newLineStr}`
      }
      return
    }
  })
  const validateData = await validateHandle(formData)
  if (validateData) {
    if (typeof validateData === 'string') {
      errStr += `【${validateData}】${newLineStr}`
    }
    if (Array.isArray(validateData)) {
      validateData.forEach((item) => {
        if (typeof item === 'string') {
          errStr += `【${item}】${newLineStr}`
        }
      })
    }
  }
  if (errStr) {
    ElMessage.error({
      message: `请修复以下问题：${newLineStr} ${errStr}`,
      duration: Math.min(Math.max(errStr.length * 200, 3000), 8000), // 限制在3~8秒
      dangerouslyUseHTMLString: true,
      type: 'error',
    })
    return false
  }
  return true
}