import { h } from 'vue'
import TableColumn from './TableColumn/TableColumn.vue'

export default {
  name: 'selfColumn',
  props: {
    tableColumnList: {
      type: Array,
      default: () => []
    }
  },
  render(ctx) {
    const { tableColumnList } = ctx
    const tableColumnListStor = getTableColumnList(ctx, tableColumnList)
    return tableColumnListStor
  }
}
function getTableColumnList(ctx, list) {
  return list.map((item) => {
    const props = { align: 'center', minWidth: 100, ...item }
    if (!item.slotName && (!item.child || item.child.length === 0)) {
      //默认展示
      return h(TableColumn, props)
    }
    if (item.slotName) {
      //插槽展示
      return h(TableColumn, props, (scope) => ctx.$slots[item.slotName] && ctx.$slots[item.slotName](scope))
    }
    if (!item.slotName && item.child && item.child.length !== 0) {
      //递归展示
      return h(TableColumn, props, getTableColumnList(ctx, item.child))
    }
    return h(TableColumn, props)
  })
}
