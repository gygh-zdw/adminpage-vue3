<template>
  <div>
    <div v-if="!noTitle" class="TablePage-title">
      {{ props.title || routeTitle }}
    </div>
    <FormPage
      v-if="!props.noSearchModel"
      ref="FormPageRef"
      :formConfig="formConfigShow"
      v-model="inputQueryParams"
      @change="changeQueryParams"
      inline
      style="display: flex; flex-wrap: wrap"
      v-bind="props.formProps"
    >
      <template
        v-for="slotName in getSlotList(props.formConfig, [
          'slotName',
          'childSlot',
        ])"
        v-slot:[slotName]="scope"
        :key="slotName"
      >
        <slot
          :name="slotName"
          :params="inputQueryParams"
          v-bind="{ ...scope }"
        />
      </template>
      <template #buttonModule>
        <el-button @click="resetHandler">重置</el-button>
        <el-button type="primary" @click="searchHandler">查询</el-button>
        <slot name="buttonModule"></slot>
      </template>
    </FormPage>
    <slot name="tableTopModule"></slot>

    <el-table
      :data="tableList"
      border
      style="width: 100%"
      :height="props.tableHeight"
      v-bind="$attrs"
      v-loading="props.loading || tableLoading"
      ref="TableRef"
    >
      <slot name="default">
        <slot name="tableShow">
          <selfColumn :tableColumnList="props.tableColumnList">
            <template
              v-for="slotName in getSlotList(props.tableColumnList, [
                'slotName',
              ])"
              v-slot:[slotName]="scope"
              :key="slotName"
            >
              <slot :name="slotName" v-bind="{ ...rowScopeToRaw(scope) }" />
            </template>
          </selfColumn>
        </slot>
      </slot>
    </el-table>
    <div class="TablePage-pagination mt-5" v-if="!props.noPage">
      <pagination
        v-bind="props.paginationProps"
        :total="total"
        v-model:page="page.pageNum"
        v-model:limit="page.pageSize"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed, toRaw } from 'vue'
import { getSlotList, getComponentName, rowScopeToRaw } from '../utils/index.js'
import Pagination from './Pagination.vue'
import selfColumn from './selfColumn.js'
import selfForm from './selfForm.js'
import { useRoute } from 'vue-router'
import { ElTable, ElButton, ElFormItem, ElForm, ElLoading } from 'element-plus'
import FormPage from '../FormPage/FormPage.vue'
// import 'element-plus/theme-chalk/index.scss'
import { cloneDeep } from 'lodash-es'

const vLoading = ElLoading.directive
const title = useRoute()?.meta?.title
const routeTitle = ref(title)
// eslint-disable-next-line no-undef
const props = defineProps({
  title: String, // 标题
  noTitle: Boolean, // 无标题标识
  noPage: Boolean, // 不分页标识
  noMountedGetData: Boolean, //onMounted 不获取数据标识
  loading: Boolean, // loading
  noSearchModel: Boolean, // 无表单搜索标识
  changeToSearch: Boolean, // 表单change事件是否触发搜索
  searchOver: {
    // 搜索完成触发
    type: Function,
    default: () => {},
  },
  tableHeight: {
    // 表格高度
    type: [Number, String],
    default: 550,
  },
  tableApi: {
    // 表格api
    type: Function,
    default: () => Promise.reject(),
  },
  formConfig: {
    // 搜索项设置
    type: Array,
    default: () => [],
  },
  changeParams: {
    // 参数预处理
    type: Function,
    default: (value) => value,
  },
  resetFun: {
    // 重置触发
    type: Function,
    default: () => {},
  },
  tableFileter: {
    // 表格过滤函数
    type: Function,
    default: (list) => list,
  },
  props: {
    // 配置选项
    type: Object,
    default: () => {},
  },
  paginationProps: {
    // 分页器配置选项
    type: Object,
    default: () => {},
  },
  formProps: {
    // 表单配置选项
    type: Object,
    default: () => {},
  },
  tableColumnList: {
    // 表格列list
    type: Array,
    default: () => [],
  },
})
const defaultProps = {
  pageNumKey: 'page',
  pageSizeKey: 'limit',
  totalKey: 'count',
  dataKey: 'data',
  pageNumInit: 1,
  pageSizeInit: 10,
}
const propsData = computed(() => {
  return { ...defaultProps, ...props.props }
})

const inputQueryParams = ref({})
const queryParams = ref({})
const total = ref(0)
// 分页器参数对象
const page = reactive({
  pageNum: propsData.value.pageNumInit,
  pageSize: propsData.value.pageSizeInit,
})
// 监听器=>分页器变化=>触发数据列表更新
watch(page, () => {
  getList()
  setQueryParamsToInput()
})
const isInitPage = computed(
  () =>
    page.pageNum === propsData.value.pageNumInit &&
    page.pageSize === propsData.value.pageSizeInit
)
const FormPageRef = ref(null)
async function searchHandler() {
  const isOk = await FormPageRef.value.validate()
  if (!isOk) return
  const isInitPageNow = isInitPage.value
  setInputToQueryParams()
  page.pageNum = propsData.value.pageNumInit
  page.pageSize = propsData.value.pageSizeInit
  isInitPageNow && getList()
}
function setInputToQueryParams() {
  queryParams.value = cloneDeep(inputQueryParams.value)
}
function setQueryParamsToInput() {
  inputQueryParams.value = cloneDeep(queryParams.value)
}
async function resetHandler() {
  const isInitPageNow = isInitPage.value
  FormPageRef.value.setInitParams()
  setInputToQueryParams()
  page.pageNum = propsData.value.pageNumInit
  page.pageSize = propsData.value.pageSizeInit
  await props.resetFun()
  isInitPageNow && getList()
}
const TableRef = ref(null)

const tableList = ref([])
const tableLoading = ref(false)
async function getList() {
  tableList.value = []
  tableLoading.value = true
  const params = await props.changeParams(cloneDeep(getParams.value))
  try {
    const resData = await props.tableApi(params || getParams.value)
    const { dataKey, totalKey } = propsData.value
    const dataList = await props.tableFileter(resData[dataKey])
    tableList.value = dataList || resData[dataKey]
    total.value = resData[totalKey] || 0
    props.searchOver(params || getParams.value)
  } finally {
    tableLoading.value = false
  }
}
const getParams = computed(() => {
  const params = { ...queryParams.value }
  if (!props.noPage) {
    params[propsData.value.pageNumKey] = page.pageNum
    params[propsData.value.pageSizeKey] = page.pageSize
  }
  return params
})
async function updateHandler() {
  await getList()
}
const formConfigShow = computed(() => {
  return [
    ...props.formConfig,
    {
      type: 'slot',
      label: ' ',
      slotName: 'buttonModule',
    },
  ]
})
onMounted(() => {
  if (props.noMountedGetData) return
  setInputToQueryParams()
  getList()
})
function changeQueryParams() {
  props.changeToSearch && searchHandler()
}
// eslint-disable-next-line no-undef
defineExpose({
  searchHandler, // 执行数据获取
  resetHandler, // 执行重置逻辑
  updateHandler, // 执行更新逻辑（searchHandler会返回第一页，updateHandler留在当前页）
  queryParams, // 获取form对象
  inputQueryParams, // 获取inputForm对象
  getParams, // 获取参数
  tableList, // 获取表格数据
  TableRef, // 获取tableRef对象
})
</script>
<style scoped>
.TablePage-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #545454;
  padding-bottom: 10px;
}
.TablePage-title::before {
  content: '';
  width: 4px;
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
  box-shadow: 1px 0px 1px 0px #6270ee;
  background: #6270ee;
}
.TablePage-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
