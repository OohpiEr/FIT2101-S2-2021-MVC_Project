<template>
  <div>
    <card type="chart">
      <template slot="header">
        <div class="row">
          <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
            <h5 class="card-category">
              {{ $t("dashboard.totalCovidCases") }}
            </h5>
            <h2 class="card-title">{{ $t("dashboard.performance") }}</h2>
          </div>
          <div class="col-sm-6">
            <div
              class="btn-group btn-group-toggle"
              :class="isRTL ? 'float-left' : 'float-right'"
              data-toggle="buttons"
            >
              <label
                v-for="(option, index) in bigLineChartCategories"
                :key="option"
                class="btn btn-sm btn-primary btn-simple"
                :class="{ active: bigLineChart.activeIndex === index }"
                :id="index"
              >
                <input
                  type="radio"
                  @click="initBigChart(index)"
                  name="options"
                  autocomplete="off"
                  :checked="bigLineChart.activeIndex === index"
                />
                {{ option }}
              </label>
            </div>
          </div>
        </div>
      </template>
      <div class="chart-area">
        <line-chart
          style="height: 100%"
          ref="bigChart"
          chart-id="big-line-chart"
          :chart-data="bigLineChart.chartData"
          :gradient-colors="bigLineChart.gradientColors"
          :gradient-stops="bigLineChart.gradientStops"
          :extra-options="bigLineChart.extraOptions"
        >
        </line-chart>
      </div>
    </card>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import * as covid_api from "../../api.js";
export default {
  components: {
    LineChart,
  },
  data() {
    return {
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
          [280, 320, 305, 310, 295, 305, 290, 300, 280, 295, 270, 320],
          [
            1060, 1080, 1065, 1130, 1080, 1105, 1090, 1130, 1070, 1115, 1060,
            1130,
          ],
        ],
        allLabels: [
          [
            "Day1",
            "Day2",
            "Day3",
            "Day4",
            "Day5",
            "Day6",
            "Day7",
            "Day8",
            "Day9",
            "Day10",
            "Day11",
            "Day12",
          ],
          [
            "Week1",
            "Week2",
            "Week3",
            "Week4",
            "Week5",
            "Week6",
            "Week7",
            "Week8",
            "Week9",
            "Week10",
            "Week11",
            "Week12",
          ],
          [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
    };
  },
  methods: {
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: this.bigLineChart.allLabels[index],
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
  async created(){
     this.initBigChart(0); 
  }
};
</script>
<style>
</style>
