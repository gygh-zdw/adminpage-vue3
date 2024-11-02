<!--
 * @Author: DESKTOP-NRAJN91\14382 1438251088@qq.com
 * @Date: 2022-11-11 08:49:27
 * @LastEditors: dongwei zhu 1438251088@qq.com
 * @LastEditTime: 2024-03-07 15:31:00
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
  <div class="loading-page" :style="props.background && `background:${props.background}`">
    <div class="counter">
      <h1>{{ counter }}%</h1>
      <!-- <hr :style="{ width: counter + '%' }" /> -->
      <div class="progress">
        <div :style="{ width: counter + '%' }" class="progress-bar">
          <div class="progress-shadow"></div>
        </div>
      </div>
      <!-- <p>计算中……</p> -->
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
let setTimeoutId = null

const counter = ref(0)
const props = defineProps({
  isLoading: {
    typeof: Boolean,
    required: true
  },
  background: String,
  time: {
    default: 300,
    typeof: Number
  }
})
const emits = defineEmits(['loadingOver'])
let milliseconds = 300
watch(
  () => props.isLoading,
  (val) => {
    if (!val) {
      milliseconds = 5
      return
    }
    clearTimeout(setTimeoutId)
    console.log('props.isLoading', val)
    counter.value = 0
    milliseconds = props.time
    timer()
  },
  {
    immediate: true
  }
)
// 主函数
// timer 思路详细：
//     不到一百时，进行数值递增，并递归自身
//     到达一百时，判断是否外部标识到loading===false，此时可抛出over
//     到达一百但外部未标识loading false时，代表外部未完成，此时做99停顿处理，并继续轮询自身，通过自身询问loading触发标识位（isLoading）
function timer() {
  setTimeoutId = setTimeout(() => {
    //     不到一百时，进行数值递增，并递归自身

    //描述时为100是为了思考方便，实际应当终止于99
    if (counter.value < 99) {
      //优化，使99有小等待，显示出99了
      if (counter.value === 98) {
        milliseconds = props.time + 500
      }
      counter.value++
      timer()
      return
    }
    //     到达一百时，判断是否外部标识到loading===false，此时可抛出over
    if (!props.isLoading) {
      emits('loadingOver')
      return
    }
    //     到达一百但外部未标识loading false时，代表外部未完成，此时做99停顿处理，并继续轮询自身，通过自身询问loading触发标识位（isLoading）
    timer()
    return
  }, milliseconds)
}
  // timer()
</script>

<style lang="scss" scoped>
$color-primary: #6270ee;
.loading-page {
  position: relative;
  z-index: 222;
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-page .counter {
  text-align: center;
}
.loading-page .counter p {
  margin-top: 10px;
  font-size: 20px;
  font-weight: normal;
  color: $color-primary;
}
.loading-page .counter h1 {
  // color: white;
  color: #545454;
  font-size: 18px;
}
.loading-page .counter hr {
  background: $color-primary;
  border-radius: 5px;
  height: 10px;
}
.loading-page .counter {
  position: relative;
}
.loading-page .counter .color {
  width: 0px;
  overflow: hidden;
  color: $color-primary;
}

.loading-page {
  /* PROGRESS */
  .progress {
    background-color: #e5e9eb;
    height: 0.3em;
    position: relative;
    width: 24em;
  }
  .progress-bar {
    background-image: linear-gradient(
      to right,
      #5856d6,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #5ac8fa
    );
    background-size: 24em 0.25em;
    height: 100%;
    position: relative;
  }
  .progress-shadow {
    background-image: linear-gradient(to bottom, #eaecee, transparent);
    height: 1em;
    position: absolute;
    top: 100%;
    transform: skew(45deg);
    transform-origin: 0 0;
    width: 100%;
  }
}
</style>
