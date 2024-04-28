<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!--  盒子将来echarts展示图形图标的节点-->
    <div class="charts" ref="charts">123</div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
// 水球图扩展插件
import 'echarts-liquidfill'
import { ref, onMounted } from 'vue'
let people = ref('114511人')
let charts = ref()
// 获取节点
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  //   获取echarts类的实例
  mycharts.setOption({
    //  标题组件
    title: {
      text: '水球图',
    },
    xAxis: {},
    yAxis: {},
    //  系列
    series: {
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      //  展示数据
      waveAnimation: true,
      //动画
      animationDuration: 3,
      //
      animationDurationUpdate: 0,
      //
      radius: '100%',
      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'skyblue',
          borderColor: '#294d99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0.25)',
        },
      },
    },
    //  布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>
<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;

      span {
        color: white;
      }
    }
  }
  .number {
    //background:red;
    margin-top: 30px;
    display: flex;
    padding: 20px;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 260px;
    //background:red;
  }
}
</style>
