# 地址

[github 地址](https://github.com/gygh-zdw/tablePage-vue3)

[npm 地址](https://www.npmjs.com/package/tablepage-vue3)

[CSDN 地址](https://blog.csdn.net/weixin_44599143/article/details/137723609)

# 赞赏

<img src="https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E8%B5%9E%E8%B5%8F%E7%A0%81.jpg" width="210px">

# 引入

```javascript
npm i element-plus
npm i tablepage-vue3
```

# 思路介绍

本组件是基于 element-UI 进行快速搭建搜索列表页的依赖，主干思路为：将异步接口声明到组件的`tableApi`属性，并将搜索项通过`searchConfig`声明给组件，将搜索、重置、分页的逻辑均交给组件内部去处理，达到最简化的代码实现，对于标准搜索列表页能够进行快速开发。
如下所示，便完成了一个标准搜索列表页的开发

```html
<template>
  <table-page :searchConfig="searchConfig" :tableApi="getMessageList">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column
        prop="recieveUserName"
        label="接收人姓名"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="recieveUserPhone"
        label="接收人电话"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="content"
        label="内容"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        label="提交时间"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="sendTime"
        label="发送时间"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="recieveTime"
        label="送达时间"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="recieveStatusVal"
        label="送达状态"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times',
    },
    {
      label: '电话',
      key: 'phone',
    },
  ]
</script>
<style lang="scss" scoped></style>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%9F%BA%E7%A1%80%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA.jpg)

# 全文档模拟接口的数据结构

```JavaScript
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' })
  })
```

# TablePage-vue3 API 汇总

## 属性

| 属性名                                    | 说明                                                                                                         | 类型          | 默认值                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------- | ------------------------- |
| tableApi                                  | [<font color=red>必填</font >]表格 api【可异步】                                                             | Function      | Promise.reject()          |
| title                                     | 标题                                                                                                         | String        | 当前 route 的 meta?.title |
| noTitle                                   | 无标题标识                                                                                                   | Boolean       | -                         |
| noPage                                    | 不显示分页器标识                                                                                             | Boolean       | -                         |
| noMountedGetData                          | onMounted 不获取数据标识 ，为 true 时不会默认调用 api 接口，需要外部触发 getList，但是分页和搜索仍会调用接口 | Boolean       | -                         |
| loading                                   | 外部 loading 传入，与内部 loading 为<或>的关系                                                               | Boolean       | -                         |
| noSearchModel                             | 无表单搜索标识                                                                                               | Boolean       | -                         |
| changeToSearch                            | 表单 change 事件是否触发搜索                                                                                 | Boolean       | -                         |
| tableHeight                               | 表格高度                                                                                                     | Number/String | 550                       |
| [searchConfig](#searchConfig-domId)       | 搜索项设置                                                                                                   | Array         | []                        |
| changeParams                              | 参数预处理【可异步】                                                                                         | Function      | (value) => value          |
| resetFun                                  | 重置触发【可异步】                                                                                           | Function      | () => {}                  |
| tableFileter                              | 表格过渡效果【可异步】                                                                                       | Function      | (list) => list            |
| searchOver                                | 搜索完成触发函数                                                                                             | Function      | ()=>{}                    |
| [props](#props-domId)                     | 配置选项                                                                                                     | Object        | {}                        |
| [tableColumnList](#tableColumnList-domId) | 表格列 list【当 default 或 tableShow 插槽使用时，将不会使用 tableColumnList 进行渲染】                       | Array         | []                        |
| paginationProps                           | 分页器配置选项【将 element-ui 中的 pagination 相关属性写进该对象里即可】                                     | Object        | {}                        |
| formProps |该属性可参考属性 paginationProps 是将声明到本属性的对象，绑定到组件内部的ElForm标签上接收对象     | Object   | {}     |

## 插槽

| 插槽名              | 说明                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------- |
| buttonModule        | 按钮                                                                                    |
| default / tableShow | 表格展示插槽【当 default 或 tableShow 插槽使用时，将不会使用 tableColumnList 进行渲染】 |
| tableTopModule | 本插槽位置位于table上方，搜索项下方|
| [你设定的 slotName] | 本组件内部使用了大量的动态组件，方便配置，可阅读文档自行设置插槽名                      |

## Exposes

| 值名             | 说明             |
| ---------------- | ---------------- |
| searchHandler()  | 执行数据获取     |
| resetHandler()   | 执行重置逻辑     |
| queryParams      | 获取页面搜索参数 |
| inputQueryParams | 页面输入参数     |
| getParams        | 接口查询参数     |
| tableList        | 获取表格数据     |
| TableRef         | tableRef 对象    |

## 自定义对象

### <span id="searchConfig-domId">searchConfig</span>(array<object\> 类型)

| 属性名       | 说明                                                                                                                           | 类型                 | 默认值                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| key          | 字段 key 值，该值将作用于表单搜索时向接口所发送的字段 key，当 type 为 times 时详见[当 type=times 时](#type-isTimesValue-domId) | String               | -                                                                                                                                         |
| type         | 详见下文 [searchConfig-type](#searchConfig-type-domId)                                                                         | String/vue3Component | ‘input’                                                                                                                                   |
| label        | 搜索表单标签文本                                                                                                               | String               | -                                                                                                                                         |
| noLabel      | 搜索表单无标签文本标识，为 true 时将不显示标签文本                                                                             | Boolean              | false                                                                                                                                     |
| bind         | 搜索表单搜索项属性绑定，将直接作用于搜索表单筛选框的绑定，当 type 为 times 时详见[当 type=times 时](#type-isTimesValue-domId)  | Object               | 默认值可详见[当 type 不为时间类型时 bind 默认值](#type-notTime-bind-domId) 与 [当 type 为时间类型时 bind 默认值](#type-isTime-bind-domId) |
| defaultValue | 默认参数，当 type 为 times 时详见[当 type=times 时](#type-isTimesValue-domId)                                                  | String               | -                                                                                                                                         |
| slotName     | 插槽名称 将整个搜索项暴露给父页面进行使用                                                                                      | String               | -                                                                                                                                         |
| childSlot    | 子插槽名，当组件结构为<el-select\><el-option\><\el-option>\</el-select>时，可将 type 设置为 select，通过子插槽渲染 option      | String               | -                                                                                                                                         |

#### <span id="searchConfig-type-domId">searchConfig-type</span>

| 值 / 值类型         | 值详情                                                                                                                 | 说明                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ‘times’             | 文本 times                                                                                                             | 将渲染分开为两个的时间筛选器，key、bind、defaultValue 详见[当 type=times 时](#type-isTimesValue-domId) |
| ‘slot’              | 文本 slot                                                                                                              | 该搜索项将索引页面插槽进行渲染                                                                         |
| String              | element 相关组件标签文本（以<el-time-picker\>为例：‘el-time-picker’\|‘time-picker’\|‘ElTimePicker’\|‘TimePicker’均可） | 将捕获 element-UI 相关组件，并通过 v-model 将值与页面搜索项进行绑定                                    |
| 类型为 VueComponent | vue3 组件对象                                                                                                          | 将该组件进行绑定并通过 v-model 绑定值，逻辑与主要处理的 element-ui 的相关标签保持一致                  |

#### <span id="type-isTimesValue-domId">当 type=times 时</span>

| 属性名            | 说明                                                                                | 类型     | 默认值                                                           |
| ----------------- | ----------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| key               | 字段 key 值，该值将作用于表单搜索时向接口所发送的字段 key，当 type=times 时字段固定 | 无法修改 | startTime,endTime                                                |
| startDefaultValue | 开始时间默认参数                                                                    | String   | -                                                                |
| endDefaultValue   | 结束时间默认参数                                                                    | String   | -                                                                |
| startBind         | 开始时间属性绑定                                                                    | Object   | 详见 [当 type 为时间类型时 bind 默认值](#type-isTime-bind-domId) |
| endBind           | 结束时间属性绑定                                                                    | Object   | 详见 [当 type 为时间类型时 bind 默认值](#type-isTime-bind-domId) |

#### <span id="type-notTime-bind-domId">当 type 不为时间类型时的 bind 默认值（Object 类型）</span>

| 属性名      | 默认值       |
| ----------- | ------------ |
| placeholder | label 的值   |
| clearable   | true         |
| style       | width: 200px |

#### <span id="type-isTime-bind-domId">当 type 为时间类型时的 bind 默认值（Object 类型）</span>

| 属性名      | 默认值              |
| ----------- | ------------------- |
| style       | width: 190px        |
| type        | datetime            |
| placeholder | 请选择时间          |
| format      | YYYY-MM-DD HH:mm:ss |
| valueFormat | YYYY-MM-DD HH:mm:ss |

### <span id="props-domId">props</span>（object 类型）

| 属性名       | 说明                             | 类型   | 默认值 |
| ------------ | -------------------------------- | ------ | ------ |
| pageNumKey   | 接口调用时的当前页码字段         | String | page   |
| pageSizeKey  | 接口调用时的每页显示条目个数字段 | String | limit  |
| totalKey     | 接口调用时的总页数字段           | String | count  |
| dataKey      | 接口调用时的列表数据字段         | String | data   |
| pageNumInit  | 列表默认当前页码                 | Number | 1      |
| pageSizeInit | 列表默认每页显示条目个数         | Number | 10     |

### <span id="tableColumnList-domId">tableColumnList</span>(array<object\> 类型)

| 属性名   | 说明                                                 | 类型   | 默认值 |
| -------- | ---------------------------------------------------- | ------ | ------ |
| slotName | 使用插槽嵌入 tableColumn，并使用 slotName 为插槽 key | String | -      |
| align    | element-UI 的 tableColumn 中 align 字段复写默认值    | String | center |
|          | element-UI 的 tableColumn 中的字段均可直接声明       |        |        |
| child    | 子 tableColumn，嵌套 tableColumn 使用                | Array  | -      |

# 搜索及数据获取配置项

## 属性： noSearchModel（无表单搜索标识）

该属性为 true 时，将不会显示表单项（以及属于表单的按钮项也不会显示），但是列表和属于列表的分页器将正常展示

```javascript
<template>
  <table-page noSearchModel :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column prop="recieveUserName" label="接收人姓名" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveUserPhone" label="接收人电话" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="content" label="内容" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="createTime" label="提交时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="sendTime" label="发送时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveTime" label="送达时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveStatusVal" label="送达状态" align="center" min-width="90" show-overflow-tooltip />
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/noSearchModel.jpg)

## 属性：changeToSearch（表单 change 事件是否触发搜索 ）

<span id="changeToSearch-domId"></span >
此属性为 true 时，当搜索项被触发 change 事件时，将会立即执行搜索逻辑，无需用户手动点击搜索按钮

```javascript
<template>
  <table-page changeToSearch :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```

## 属性： changeParams（参数预处理【可异步】 ）

该属性接收函数，将传入即将用于搜索的数据，数据经过该函数处理后需要返回，否则将仍使用原始数据进行搜索

```javascript
<template>
  <table-page :changeParams="changeParams":searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
  function changeParams(data) {
    data.changeParams = true
    return data
  }
</script>
```

| 模式         | 函数处理                                                                                                           | 数据结构                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 无处理       | <table-page :searchConfig="searchConfig" :tableApi="getMessageList" \>                                             | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E6%97%A0%E5%A4%84%E7%90%86.jpg)                   |
| 同步处理返回 | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E8%BF%94%E5%9B%9E%E5%80%BC.jpg)          | ![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%90%8C%E6%AD%A5%E5%A3%B0%E6%98%8E%E5%80%BC.jpg)     |
| 异步处理返回 | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86.jpg) | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%BC%82%E6%AD%A5%E5%A3%B0%E6%98%8E%E5%80%BC.jpg) |
| 无返回       | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E6%97%A0%E8%BF%94%E5%9B%9E%E5%80%BC.jpg) | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E6%97%A0%E5%A4%84%E7%90%86.jpg)                   |

## 属性： resetFun（重置触发【可异步】）

当需要重置时处理其他业务时，可声明 resetFun 属性，该属性接收函数，可异步处理，待处理完成后继续向下执行搜索逻辑
该函数触发时机为：搜索字段已完成重置，尚未请求接口时
即：

```javascript
重置字段初始值
resetFun（）
请求接口
```

```javascript
<template>
  <table-page :resetFun="resetFun":searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
  function resetFun() {
  	// 处理业务逻辑
  }
</script>

```

## 属性： tableFileter（表格过渡效果【可异步】）

该属性接收函数，传入接口返回的数据列表，经该函数处理后将渲染至页面，函数可为异步函数，当函数不返回数据时，将使用接口数据进行渲染

```javascript
<template>
  <table-page :tableFileter="tableFileter" :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
  async function tableFileter(list) {
    await new Promise((resolve) => setTimeout(() => resolve(), 5000)) //等待五秒后向下执行
    return list.map((item, index) => ({ ...item, recieveUserName: index % 2 ? '张三' : '李四' }))
  }
</script>

```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E8%BF%87%E6%BB%A4%E5%87%BD%E6%95%B0.jpg)

## 属性： searchOver（搜索完成触发）

搜索完成触发，此时 tableList 已经赋值完成

```javascript
<template>
  <table-page :searchOver="searchOver" :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
 function searchOver() {
  	// 处理业务逻辑
  }
</script>
```

## 插槽： buttonModel

本插槽位置位于搜索按钮右侧，方便放置业务按钮

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #buttonModel>
      <el-button type="primary">buttonModel</el-button>
    </template>
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column prop="recieveUserName" label="接收人姓名" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveUserPhone" label="接收人电话" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="content" label="内容" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="createTime" label="提交时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="sendTime" label="发送时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveTime" label="送达时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveStatusVal" label="送达状态" align="center" min-width="90" show-overflow-tooltip />
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/buttonModelSlot.jpg)


## 插槽：tableTopModule
本插槽位置位于table上方，搜索项下方

```javascript
<template>
  <table-page :searchConfig="searchConfig" :tableApi="getMessageList">
    <template #tableTopModule>
      <div style="margin-bottom: 10px">
        <el-button type="primary">导出</el-button>
      </div>
    </template>
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column prop="name" label="接收人姓名" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="phone" label="接收人电话" align="center" min-width="90" show-overflow-tooltip />
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' })
  })
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      key: 'phone'
    }
  ]
</script>

```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/tableTopModule.jpg)



## 属性: searchConfig（搜索项设置）

搜索项设置接收数组类型，每项设置均为对象，结构为

```javascript
{
  key:'test',
  label:'测试',
  type:'input',// type:'input' || type:ElInput || type:'times' || type:'slot'
  noLabel:false,
  defaultValue:'text',
  bind:{
  	style:'color:red',
  	clearable:true
  	...
  	...
  	...
  },
  slotName:'slotInput',
  childSlot:'childSlot',
}
```

### key

本字段将设置为搜索时的属性 key 字段，当 type=times 时，将固定为 startTime 与 endTime
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/key.jpg)

### label

将作为表单 label 进行渲染
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/label.jpg)

### noLabel

声明本字段，将取消显示该项的 label

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      noLabel: true,
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/noLabel.jpg)

### defaultValue

声明本字段默认值，首次加载时，初始渲染时均将该项设为该值，该值也将在重置按钮触发时赋值

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      defaultValue: '130000000000',
      key: 'phone'
    }
  ]
</script>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%80%BC.jpg)

### bind

本属性将直接作用于搜索项表单，例如

```javascript
{
    label: '电话',
    type:'input',
    key: 'phone',
    bind:{
    	type:'textarea',
    	placeholder:'占位文本',
    	style:'color:red',
    	class:'testClass'
	}
}
```

将渲染为·`<el-input v-model="phone" type="textarea" placeholder="占位文本" style="color:red" class="testClass" />`

示例代码如下

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      defaultValue: '130000000000',
      key: 'phone'
    },
    {
      label: '电话bind',
      type: 'input',
      key: 'phone',
      bind: {
        type: 'textarea',
        placeholder: '占位文本',
        style: 'color:red',
        class: 'testClass'
      }
    }
  ]
</script>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/bind.jpg)
非时间类型的 bind 默认属性为：

```javascript
{
    placeholder: label || '',
    clearable: true,
    style: 'width: 200px'
  }
```

时间类型的默认属性为：

```javascript
{
  style: 'width: 190px',
  type: 'datetime',
  placeholder: '请选择时间',
  format: 'YYYY-MM-DD HH:mm:ss',
  valueFormat: 'YYYY-MM-DD HH:mm:ss'
}
```

### childSlot

`本属性为插槽名称，动态插槽渲染。`
主要用于 elementUI 中`el-select`、`el-checkbox-group`、`el-radio-group`等此类组件中需要声明子组件的情形，例如`el-select`内部需要配置`el-option`，本示例也将以 el-select 为例

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #selectChildSlot>
      <el-option label="2024-01-01" value="2024-01-01" />
      <el-option label="2023-01-01" value="2023-01-01" />
      <el-option label="2022-01-01" value="2022-01-01" />
      <el-option label="2021-01-01" value="2021-01-01" />
    </template>
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column prop="recieveUserName" label="接收人姓名" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveUserPhone" label="接收人电话" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="content" label="内容" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="createTime" label="提交时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="sendTime" label="发送时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveTime" label="送达时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveStatusVal" label="送达状态" align="center" min-width="90" show-overflow-tooltip />
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      key: 'selectDate',
      type: 'select',
      childSlot: 'selectChildSlot'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/childSlot-2.jpg)
匹配字段设置如下
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/childSlot-1.jpg)

### type

本属性是搜索项主要配置项，默认值为`ElInput`
用于各搜索项配置类型及特殊处理声明

#### String 类型数据（除 times 与 slot ）

String 类型传入 type 是较为常用的情景，主要是将 element-UI 组件标签文本传入 type 内，交由 type 进行渲染交互，对于 element-UI 标签可传入驼峰式或-分割，下文将使用`el-input-number`标签进行演示，因`el-input-number`标签文本结构较为复杂，能够清晰表达出作者对于 type 接收值的处理
注意：times 与 slot 被排除在外，当文本类型无法捕获 element-UI 时，将使用默认的`ElInput`，没有传 type 时也将使用`ElInput`

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: 'test1',
      key: 'test1',
      type: 'el-input-number'
    },
    {
      label: 'test2',
      key: 'test2',
      type: 'el-inputNumber'
    },
    {
      label: 'test3',
      key: 'test3',
      type: 'input-number'
    },
    {
      label: 'test4',
      key: 'test4',
      type: 'El-Input-Number'
    },
    {
      label: 'test5',
      key: 'test5',
      type: 'inputNumber'
    },
    {
      label: 'test6',
      key: 'test6',
      type: 'elInputNumber'
    },
    {
      label: 'test7',
      key: 'test7',
      type: 'ElInputNumber'
    },
    {
      label: 'test8',
      key: 'test8',
      type: 'InputNumber'
    }
  ]
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/typeString.jpg)
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/typeString-2.jpg)

#### 字符串 times

当 type = 'times' 将会分别展示开始时间与结束时间，字段将强制设为`startTime`与`endTime`
如：`{ label: '时间', type: 'times'}`就将渲染为![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/times.jpg)
接口中也将携带为![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/times-2.jpg)

```javascript
<template>
  <table-page :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    }
  ]
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/times-3.jpg)

#### 字符串 slot （及 配套 slotName 属性）

当 type ='slot' 时，意味着你将要对该搜索项手动处理，组件将根据你设置的 slotName 进行暴露插槽，便于业务处理

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #slotModules> 插槽开发 </template>
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column prop="recieveUserName" label="接收人姓名" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveUserPhone" label="接收人电话" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="content" label="内容" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="createTime" label="提交时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="sendTime" label="发送时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveTime" label="送达时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveStatusVal" label="送达状态" align="center" min-width="90" show-overflow-tooltip />
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: 'slot测试',
      key: 'slotData',
      defaultValue: 'ok',
      type: 'slot',
      slotName: 'slotModules'
    }
  ]
</script>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/slotName.jpg)
匹配流程如下
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/slotName-2.jpg)
注：可以手动在`changeParams`函数内进行接口参数处理，亦可以传入整个组件给 type，并通过`v-model`进行绑定，而无需通过插槽使用自定义组件详见 [type-vue 组件类型 VueComponent](#VueComponent-domId)

#### <span id="VueComponent-domId">vue 组件类型 VueComponent</span>

最后，type 也可以接收 vue3 的相关组件，并仍可使用 bind 字段进行属性绑定，传入组件建议可通过`v-model`进行双向绑定，因内部实现方法为`modelValue`与`onUpdate:modelValue`进行的`v-mode`绑定，
另：如配置了[属性： changeToSearch（表单 change 事件是否触发搜索 ）](#changeToSearch-domId)，请在组件内部暴露 change 事件，该属性底层为捕获`onChange`事件
既：自开发组件

- 满足`<componentName v-model="data">`时，即可满足其基本条件
- 满足`<componentName v-model="data" @change="change">`时，即可满足其全部条件

为方便，作者复用 elementUI 的`ElInput`组件作为传入组件

```javascript
<template>
  <table-page :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  import { ElInput } from 'element-plus'//可以用你写的组件
  const searchConfig = [
   {
      label: '自定义组件',
      key: 'DIY',
      type: ElInput,
      bind: {
        type: 'textarea'
      }
    }
  ]
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/type-obj.jpg)

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/type-obj2.jpg)

# 列表项及分页器配置

## 属性 tableHeight

本属性与 elementUI-table 的 tableHeight 一致，所不同的是，本组件设置 tableHeight 默认值为 550

## 属性 tableColumnList 与 插槽 default / 插槽 tableShow

### 属性 tableColumnList

本组件可以通过 tableColumnList 属性配置分页器，达到 dom 最简化的效果，同时本配置项支持嵌套多层级效果
对于需要绑定到`ElTableColumn`标签上的属性，可以直接声明到对应对象内

```html
<template>
  <TablePage :tableApi="getMessageList" :tableColumnList="tableColumnList" />
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' }),
  })
  const tableColumnList = [
    { type: 'index', label: '序号', width: '90' },
    { prop: 'name', label: '姓名',  showOverflowTooltip: true },
    { prop: 'phone', label: '电话', showOverflowTooltip: true },
  ]
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/tableColumnList.jpg)
其效果等效于

```html
<template>
  <TablePage :tableApi="getMessageList">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        min-width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
        min-width="100"
        show-overflow-tooltip
      />
    </template>
  </TablePage>
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' }),
  })
</script>
```

#### 嵌套多层级 child

当需要多层级表单时，可以使用 child 属性，其内部结构与 tableColumnList 一致，但是他将被包裹在父级的`ElTableColumn`里，以达成嵌套效果

```html
<template>
  <TablePage :tableApi="getMessageList" :tableColumnList="tableColumnList" />
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' }),
  })
  const tableColumnList = [
    { type: 'index', label: '序号', width: '90' },
    {
      label: '用户信息',
      child: [
        {
          prop: 'name',
          label: '姓名',
          minWidth: '90',
          showOverflowTooltip: true,
        },
        {
          prop: 'phone',
          label: '电话',
          minWidth: '90',
          showOverflowTooltip: true,
        },
      ],
    },
    { prop: 'tm', label: '时间', minWidth: '180', showOverflowTooltip: true },
  ]
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/tableColumnList-child.jpg)
既等效于

```html
<template>
  <TablePage :tableApi="getMessageList">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column label="用户" align="center">
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          min-width="90"
          show-overflow-tooltip
        />
        <el-table-column
          prop="phone"
          label="电话"
          align="center"
          min-width="90"
          show-overflow-tooltip
        />
      </el-table-column>
      <el-table-column
        prop="tm"
        label="时间"
        align="center"
        min-width="180"
        show-overflow-tooltip
      />
    </template>
  </TablePage>
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' }),
  })
</script>
```

#### 插槽 slotName

当某项需要使用插槽时，可以单独传入 slotName 声明插槽名，组件也将`ElTableColumn`传给 row 的相关字段传给该插槽

```html
<template>
  <TablePage
    border
    :tableApi="getMessageList"
    :tableColumnList="tableColumnList"
  >
    <template #columnSlot="{ row }"> {{ row }} </template>
  </TablePage>
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5)
      .fill({ name: '张三', phone: '13x-xxxx-xxxx' })
      .map((item, index) => ({ ...item, index })),
  })
  const tableColumnList = [
    { type: 'index', label: '序号', width: '90' },
    { prop: 'name', label: '姓名', minWidth: '90', showOverflowTooltip: true },
    { slotName: 'columnSlot', label: '插槽', minWidth: '90' },
  ]
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/tableColumnList-slotName.jpg)

### 插槽 default / 插槽 tableShow

插槽 default 与 插槽 tableShow 效果相同，可根据使用习惯使用

### 优先级

优先级为 `插槽 default ` > `插槽 tableShow`>`属性 tableColumnList`

## 属性 noPage

声明 noPage，将隐藏分页器，既无法分页

```html
<template>
  <TablePage noPage :tableApi="getMessageList">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
    </template>
  </TablePage>
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({
      name: '张三',
      phone: '13x-xxxx-xxxx',
      tm: '2024-04-12',
    }),
  })
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/noPage.jpg)

## 属性 paginationProps

需要配置到分页器标签的相关属性，可以声明到 paginationProps 内，组件内部将获取相关属性

```html
<template>
  <TablePage :tableApi="getMessageList" :paginationProps="paginationProps">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
    </template>
  </TablePage>
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    count: 100,
    data: new Array(10).fill({
      name: '张三',
      phone: '13x-xxxx-xxxx',
      tm: '2024-04-12',
    }),
  })
  const paginationProps = {
    background: true,
    layout: 'prev, pager, total, next',
  }
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/paginationProps.jpg)

其底部分页渲染相当于

```html
<el-pagination
  v-model:currentPage="currentPage"
  v-model:page-size="pageSize"
  :total="total"
  layout="prev, pager, total, next"
  :background="true"
/>
```
## 属性formProps\<object>
新增属性`formProps` 该属性可参考`属性 paginationProps` 是将声明到本属性的对象，绑定到组件内部的`ElForm`标签上
接收对象
```html
<template>
  <table-page :searchConfig="searchConfig" :tableApi="getMessageList" :formProps="{labelWidth:'200px',disabled:true	}">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column prop="recieveUserName" label="接收人姓名" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveUserPhone" label="接收人电话" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="content" label="内容" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="createTime" label="提交时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="sendTime" label="发送时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveTime" label="送达时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveStatusVal" label="送达状态" align="center" min-width="90" show-overflow-tooltip />
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      key: 'phone'
    }
  ]
</script>
```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/formProps.jpg)
## ElTable 的其他相关属性

对于需要向`ElTable`写入的属性，可以直接写到本组件上，内部将穿透给 ElTable
例：想要获得`<el-table row-class-name="rowClassName">`的效果，可以使用`<table-page-vue3 row-class-name="rowClassName" >`来实现
对于想要触发`ElTable`的事件，可以获取本组件抛出的 tableRef 对象触发，例如想要触发`ElTable`的 setCurrentRow 方法
可以` <TablePage ref="TablePageRef">`声明完 ref 对象后通过`TablePageRef.value.TableRef.setCurrentRow()`触发

# props 配置

## pageNumKey

本字段作用于向 tableApi 发送数据时，页码字段
默认值：page

## pageSizeKey

本字段作用于向 tableApi 发送数据时，单页数据量字段
默认值：limit

## totalKey

本字段作用于接收 tableApi 返回数据时，获取数据总量字段
默认值：count

## dataKey

本字段作用于接收 tableApi 返回数据时，获取列表数据字段
默认值：data

## pageNumInit

本字段作用于初始化 page 页面为第几页
默认值：1

## pageSizeInit

本字段作用于初始化 page 页面，每页数据量
默认值：10

## 总结

对应关系可汇总为
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/props.jpg)

# 其他配置项

## title

设置左上角的 title 文案，默认将会从路由配置中读取`meta.title`

```javascript
      {
        path: 'message',
        name: 'message',
        meta: { title: '短信发送' },
        component: () => import('@/views/Message/index.vue')
      },
```

亦可自己手动配置

```html
<template>
  <TablePage title="DIYtitle" :tableApi="getMessageList">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
    </template>
  </TablePage>
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' }),
  })
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/DIYTitle.jpg)

## noTitle

如果不想配置 title，可以声明 noTitle 取消显示

```html
<template>
  <TablePage noTitle :tableApi="getMessageList">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
    </template>
  </TablePage>
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' }),
  })
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/noTitle.jpg)

## noMountedGetData

在部分业务场景中，你并不想在加载页面时立即调用接口，可以声明 noMountedGetData 属性为 true，此时组件内部将不会在 onMounted 获取数据，
注意：此属性不会影响搜索、重置、页码切换时调用接口，尽管声明了 noMountedGetData 属性为 true，但搜索、重置、页码切换时组件仍然会请求接口

## loading

在一些业务情景下，可能想让 table 的 loading 因外部事件而显示，此时可以传入 loading，本属性接收 Boolean 类型，当为 true 时，列表页将会显示 loading，对于 loading 所需配置，亦可直接声明到组件上

```html
<template>
  <TablePage
    loading
    element-loading-text="数据加载中..."
    :tableApi="getMessageList"
  >
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
        min-width="90"
        show-overflow-tooltip
      />
    </template>
  </TablePage>
</template>
<script setup>
  import TablePage from 'TablePage-vue3'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' }),
  })
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/loading.jpg)

# 组件二次封装
虽然tablepage-vue3 已经对搜索列表页进行了高度集成封装，但是每家公司甚至每个项目的配置是不尽相同的，而项目内的逻辑却又高度一致，此时可能每个index.vue页面都需要声明同一套静态配置项目（如paginationProps配置参数，props配置参数等）

本文章是对于tablepage-vue3 依赖如何在项目中声明公共组件进行的一个输出讲解
## 组件代码
### 声明一个公共组件

```javascript
<template>
  <div :class="{ 'p-[20px]': props.page }">
    <tablePage
      ref="TablePageRef"
      :props="tablePageProps"
      height="70vh"
      changeToSearch
      :paginationProps="paginationProps"
      v-bind="$attrs"
    >
      <template v-for="name in Object.keys($slots)" :key="name" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </tablePage>
  </div>
</template>
<script setup>
  import tablePage from 'tablepage-vue3'
  const props = defineProps({
    page: Boolean
  })
  const tablePageProps = {
    pageNumKey: 'pageNum',
    pageSizeKey: 'pageSize',
    dataKey: 'rows',
    totalKey: 'total',
    pageSizeInit: 20
  }
  const paginationProps = {
    pageSizes: [10, 20, 30, 50]
  }
  const TablePageRef = ref(null)
  defineExpose({
    TablePageRef
  })
</script>
```

### index调用该组件

```javascript
<template>
  <table-page page :searchConfig="searchConfig" :tableApi="getMessageList">
    <template #tableTopModule>
      <div style="margin-bottom: 10px">
        <el-button type="primary">导出</el-button>
      </div>
    </template>
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column prop="name" label="接收人姓名" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="phone" label="接收人电话" align="center" min-width="90" show-overflow-tooltip />
    </template>
  </table-page>
</template>
<script setup>
import tablePage from '@/components/TablePage'
  const getMessageList = () => ({
    total: 5,
    data: new Array(5).fill({ name: '张三', phone: '13x-xxxx-xxxx' })
  })
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      key: 'phone'
    }
  ]
</script>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%B0%81%E8%A3%85.jpg)
## 讲解
声明的相关属性、插槽都已经在项目的tablepage组件内部穿透给了tablepage-vue3依赖，同时，tablePage公共组件可以声明一些项目公共属性（如paginationProps配置参数，props配置参数等）给tablepage-vue3依赖，避免了项目中重复声明同一属性
