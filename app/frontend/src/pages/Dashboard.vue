<template>
  <div>
    <div class="row">
      <div class="col-12">
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
    </div>

    <div class="row">
      <!-- Most new deaths barchart -->
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <most-new-deaths></most-new-deaths>
      </div>

      <!-- Daily new cases barchart -->
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <daily-new-cases></daily-new-cases>
      </div>
    </div>

    <!-- Covid in Countries table -->
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <total-new-deaths></total-new-deaths>
      </div>
    </div>

    <!-- global covid data piechart -->
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <global-data></global-data>
      </div>

      <div class="col-lg-6 col-md-12">
        <new-global-cases></new-global-cases>>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import * as covid_api from "../api.js";
import DailyNewCases from "./Dashboard/DailyNewCases.vue";
import MostNewDeaths from "./Dashboard/mostNewDeaths.vue";
import NewGlobalCases from "./Dashboard/newGlobalCases.vue";
import TotalNewDeaths from "./Dashboard/totalNewDeaths.vue";
import GlobalData from "./Dashboard/globalData.vue";

export default {
  components: {
    LineChart,
    DailyNewCases,
    MostNewDeaths,
    NewGlobalCases,
    TotalNewDeaths,
    GlobalData,
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

  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    },
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
    let response = await covid_api.fetchCountryCases("Malaysia")
    console.log("here", response)
    const cases = response.Cases;
    const dates = response.Dates;

    this.bigLineChart.allData[0] = cases.slice(-12)
    this.bigLineChart.allLabels[0] = dates.slice(-12)

    let weeklyCases = []
    let weeklyDates = []
    for(let i=cases.length; i>=0; i-=7){
      weeklyCases.push(cases[i])
      weeklyDates.push(dates[i])
    }
    this.bigLineChart.allData[1] = weeklyCases.slice(-12)
    this.bigLineChart.allLabels[1] = weeklyDates.slice(-12)

    let monthlyCases = []
    let monthlyDates = []
    for(let i=cases.length; i>=0; i-=30){
      monthlyCases.push(cases[i])
      monthlyDates.push(dates[i])
    }
    this.bigLineChart.allData[2] = monthlyCases.slice(-12)
    this.bigLineChart.allLabels[2] = monthlyDates.slice(-12)
    this.initBigChart(0)
  },

  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>

<style>
.center-text {
  position: absolute;
  top: 62%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */

  transform: translate(
    -50%,
    -50%
  ); /* This is a shorthand of
                                         translateX(-50%) and translateY(-50%) */
  text-align: center;
}
</style>
