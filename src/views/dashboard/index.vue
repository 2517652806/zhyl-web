<template>
  <div class="dashboard-container">
    <el-card shadow="always" class="card">
      <svg t="1708235656601" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="4726" width="80" height="80">
        <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#424A60" p-id="4727"></path>
        <path
          d="M934.523586 801.121103C922.924138 688.286897 827.603862 600.275862 711.697655 600.275862h-104.977655A24.09931 24.09931 0 0 1 582.62069 576.176552v-11.387586c0-10.292966 6.69131-19.102897 16.331034-22.722207 102.470621-38.523586 172.632276-206.636138 158.384552-325.437793C743.883034 104.500966 652.711724 14.141793 540.495448 1.588966a251.851034 251.851034 0 0 0-27.100689-1.553656l-0.847449-0.017655C375.790345-0.282483 264.827586 110.486069 264.827586 247.172414c0 106.354759 67.213241 260.502069 161.456552 295.353379 9.233655 3.407448 15.095172 12.588138 15.095172 22.439724v11.211035c0 13.312-10.78731 24.09931-24.09931 24.09931h-104.977655c-115.906207 0-211.226483 88.011034-222.825931 200.845241C181.72469 935.688828 336.525241 1024 512 1024s330.27531-88.311172 422.523586-222.878897z"
          fill="#FBCE9D" p-id="4728"></path>
        <path
          d="M591.307034 116.70069c65.588966 18.025931 127.346759 58.368 166.894345 111.616-0.282483-3.901793-0.406069-7.891862-0.865103-11.70538C743.883034 104.500966 652.711724 14.141793 540.495448 1.588966a251.851034 251.851034 0 0 0-27.100689-1.553656l-0.847449-0.017655c-122.173793-0.264828-223.514483 88.187586-243.78262 204.499862h0.088276c3.160276 4.449103 6.249931 8.951172 9.622068 13.24138 1.235862-1.536 2.489379-3.054345 3.760552-4.555035 35.310345-42.01931 94.296276-51.74731 144.472276-29.501793a123.586207 123.586207 0 0 0 164.599172-67.001379z"
          fill="#6C797A" p-id="4729"></path>
        <path
          d="M934.523586 801.121103C922.924138 688.286897 827.586207 600.275862 711.697655 600.275862H688.551724l-105.931034 105.931035h-141.24138l-52.965517-35.310345-60.539586-70.62069h-15.571862c-115.888552 0-211.226483 88.011034-222.825931 200.845241C181.72469 935.688828 336.525241 1024 512 1024s330.27531-88.311172 422.523586-222.878897z"
          fill="#E7ECED" p-id="4730"></path>
        <path
          d="M759.172414 960.300138c12.093793-6.69131 23.834483-13.929931 35.310345-21.53931V829.793103h-35.310345v130.507035zM264.827586 960.300138V829.793103h-35.310345v108.967725c11.475862 7.609379 23.216552 14.848 35.310345 21.53931z"
          fill="#CCD5D6" p-id="4731"></path>
        <path d="M459.034483 670.896552h105.931034v105.931034h-105.931034z" fill="#38454F" p-id="4732"></path>
        <path
          d="M440.690759 1018.950621c23.304828 3.248552 47.104 5.049379 71.309241 5.049379 24.399448 0 48.357517-1.818483 71.838897-5.12L547.310345 776.827586h-70.62069l-35.998896 242.123035z"
          fill="#546A79" p-id="4733"></path>
        <path
          d="M459.034483 685.02069L388.413793 600.275862h-85.733517a1.730207 1.730207 0 0 0-1.606621 2.365793L370.758621 776.827586l88.275862-58.844689V685.02069zM721.319724 600.275862H635.586207l-70.62069 84.744828v32.962207L653.241379 776.827586l69.667311-174.185931a1.712552 1.712552 0 0 0-1.588966-2.365793z"
          fill="#FFFFFF" p-id="4734"></path>
      </svg>
      <div class="p2">智慧养老系统</div>
      <div class="p">{{ timePeriod }}好呀 管理员</div>
    </el-card>
    <el-tabs type="border-card">
      <el-tab-pane label="年龄分布段">
        <div ref="chart" class="box"></div>
      </el-tab-pane>
      <el-tab-pane label="男女比例">
        <div ref="chart2" class="box">
        </div>
      </el-tab-pane>
      <el-tab-pane label="体重分布段">
        <div ref="chart3" class="box">

        </div>
      </el-tab-pane>
    </el-tabs>
    <!--  <img src="@/assets/admin_images/背景.png" class="bg"> -->
  </div>
</template>

<script >
import * as echarts from 'echarts';
import { mapGetters } from 'vuex'
// 引入 ECharts
import { getadmin } from '@/api/admin'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      currentTime: new Date(),
      hasRefreshed: false, // 标志变量，表示是否已经执行过刷新
    }
  },
  computed: {
    timePeriod() {
      const currentHour = this.currentTime.getHours();
      if (currentHour < 12) {
        return '早上';
      } else if (currentHour < 18) {
        return '下午';
      } else {
        return '晚上';
      }
    }
  },
  methods: {
    Getadmin() {
      this.$store.dispatch('user/Getadmin').then(() => {
        //性别
        let lineCharts2 = echarts.init(this.$refs.chart2);
        lineCharts2.setOption({
          title: {
            text: '男女比例',
            left: 'center',
            top: "5%",
            textStyle: {
              fontSize: 24, // 设置标题文字大小为 24 像素
            },
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            left: 'center',
            bottom: "5%"
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: this.$store.state.user.age[0], name: '男' },
                { value: this.$store.state.user.age[1], name: '女' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        //年龄
        let lineCharts = echarts.init(this.$refs.chart);
        lineCharts.setOption({
          tooltip: {
            trigger: 'item'
          },
          title: {
            text: '年龄分布段',
            subtext: '',
            left: 'center'
          },
          legend: {
            top: '5%',
            left: 'center',
            // doesn't perfectly work with our tricks, disable it
            selectedMode: false
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '70%'],
              // adjust the start angle
              startAngle: 180,
              label: {
                show: true,
                formatter(param) {
                  // correct the percentage
                  return param.name + ' (' + param.percent * 2 + '%)';
                }
              },
              data: [
                { value: this.$store.state.user.age[0], name: '70岁及以下' },
                { value: this.$store.state.user.age[1], name: '71岁~80岁' },
                { value: this.$store.state.user.age[2], name: '81岁~90岁' },
                { value: this.$store.state.user.age[3], name: '91岁~100岁' },
                { value: this.$store.state.user.age[4], name: '100岁以上' },
                {
                  // make an record to fill the bottom 50%
                  value: Number(this.$store.state.user.age[0]) + Number(this.$store.state.user.age[1]) + Number(this.$store.state.user.age[2]) + Number(this.$store.state.user.age[3]) + Number(this.$store.state.user.age[4]),
                  itemStyle: {
                    // stop the chart from rendering this piece
                    color: 'none',
                    decal: {
                      symbol: 'none'
                    }
                  },
                  label: {
                    show: false
                  }
                }
              ]
            }
          ]
        })
        //体重
        let lineCharts3 = echarts.init(this.$refs.chart3);
        lineCharts3.setOption({
          tooltip: {
            trigger: 'item'
          },
          title: {
            text: '体重分布段',
            subtext: '',
            left: 'center'
          },
          legend: {
            top: '5%',
            left: 'center',
            // doesn't perfectly work with our tricks, disable it
            selectedMode: false
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '70%'],
              // adjust the start angle
              startAngle: 180,
              label: {
                show: true,
                formatter(param) {
                  // correct the percentage
                  return param.name + ' (' + param.percent * 2 + '%)';
                }
              },
              data: [
                { value: this.$store.state.user.weight[0], name: '60kg及以下' },
                { value: this.$store.state.user.weight[1], name: '61kg~70kg' },
                { value: this.$store.state.user.weight[2], name: '71kg~80kg' },
                { value: this.$store.state.user.weight[3], name: '81kg~90kg' },
                { value: this.$store.state.user.weight[4], name: '91kg及以上' },
                {
                  // make an record to fill the bottom 50%
                  value: Number(this.$store.state.user.weight[0]) + Number(this.$store.state.user.weight[1]) + Number(this.$store.state.user.weight[2]) + Number(this.$store.state.user.weight[3]) + Number(this.$store.state.user.weight[4]),
                  itemStyle: {
                    // stop the chart from rendering this piece
                    color: 'none',
                    decal: {
                      symbol: 'none'
                    }
                  },
                  label: {
                    show: false
                  }
                }
              ]
            }
          ]
        });
      }).catch(() => {

      })


    },

  },
  mounted() {

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);


    if (window.location.href.indexOf("#reloaded") == -1) {
      window.location.href = window.location.href + "#reloaded";
      window.location.reload();
    }

  },
  created() {
    this.Getadmin()
  },
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.bg {
  position: relative;
  left: 300px;
  top: 50px;
  width: 230px;
  height: 230px;
}

.card {
  height: 120px;
}

.card2 {
  width: 300px;
  height: 300px;
}

.p {
  position: relative;
  font-size: 30px;
  font-weight: 700;
  left: 100px;
  bottom: 100px;
}

.p2 {
  position: relative;
  left: 110px;
  bottom: 30px;
  color: rgb(48, 225, 241);
}

.box {
  width: 1100px;
  height: 400px;
}
</style>
