<!--
 * @Author: DESKTOP-NRAJN91\14382 1438251088@qq.com
 * @Date: 2022-11-11 08:49:27
 * @LastEditors: dongwei zhu 1438251088@qq.com
 * @LastEditTime: 2024-03-07 15:49:09
 * @FilePath: \yaLuJiangYuBao\src\components\LoadingWrap\index.vue
 * loading图组件 缓解接口时间超长的尴尬
 * props：isLoading：loading触发标识位，当置为false 时，触发to100相关处理
 * emits:loadingOver to100时触发，进行外部响应
 *
 * to100处理：递归步长更紧凑
 *
 * timer **主函数**  自身递归setTimeout，进行loadingTo100相关处理逻辑
 * timer 思路详细：
 *      不到一百时，进行数值递增，并递归自身
 *      到达一百时，判断是否外部标识到loading===false，此时可抛出over
 *      到达一百但外部未标识loading false时，代表外部未完成，此时做99停顿处理，
 *         并继续轮询自身，通过自身询问loading触发标识位（isLoading）
-->
<template>
  <div class="flex-X-XYcenter" :style="{ width: '100%', height: props.height }">
    <div v-if="isShowLoading">
      <LoadingModule
        :isLoading="isLoading"
        @loadingOver="loadingOver"
        v-bind="$attrs"
      />
    </div>
    <div
      v-if="!isShowLoading"
      class="flex-X-XYcenter"
      :style="{ width: '100%', height: props.height }"
    >
      <div v-if="!props.isHaveData">
        <ElEmpty description="无数据" />
      </div>
      <div v-if="props.isHaveData" style="width: 100%">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import LoadingModule from './LoadingModule.vue'
import { ElEmpty } from 'element-plus'

import { watch, ref } from 'vue'

const props = defineProps({
  isLoading: Boolean,
  isHaveData: Boolean,
  height: {
    typeof: String,
    default: '60vh',
  },
})
const emits = defineEmits(['loadingOver'])
const isShowLoading = ref(false)
watch(
  () => props.isLoading,
  (val) => {
    if (!val) return
    isShowLoading.value = true
  }
)
function loadingOver() {
  isShowLoading.value = false
  emits('loadingOver')
}
</script>

<style lang="scss" scoped></style>
