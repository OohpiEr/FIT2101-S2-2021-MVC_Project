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
      <div class="col-lg-6" :class="{ 'text-right': isRTL }">
        <most-total-cases></most-total-cases>
      </div>

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
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import * as covid_api from "../api.js";
import DailyNewCases from "./Dashboard/DailyNewCases.vue";
import MostNewDeaths from "./Dashboard/MostNewDeaths.vue";
import NewGlobalCases from "./Dashboard/NewGlobalCases.vue";
import TotalNewDeaths from "./Dashboard/TotalNewDeaths.vue";
import GlobalData from "./Dashboard/GlobalData.vue";
import MostTotalCases from "./Dashboard/MostTotalCases.vue";

export default {
  components: {
    BarChart,
    LineChart,
    DailyNewCases,
    MostNewDeaths,
    NewGlobalCases,
    TotalNewDeaths,
    GlobalData,
    MostTotalCases,
  },
  data() {
    return {
      bigLineChart: {
        allData: [
          [],[],[],
        ],
        allLabels: [
          [],[],[],
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

  async created() {
    let response = await covid_api.fetchCountryCases("Malaysia");
    const cases = response.Cases;
    const dates = response.Dates.map(s => s.slice(0,10));

    this.bigLineChart.allData[0] = cases.slice(-12);
    this.bigLineChart.allLabels[0] = dates.slice(-12);

    let weeklyCases = [];
    let weeklyDates = [];
    for (let i = cases.length-1; i >= 0; i -= 7) {
      weeklyCases.push(cases[i]);
      weeklyDates.push(dates[i]);
    }
    this.bigLineChart.allData[1] = weeklyCases.slice(0,12).reverse();
    this.bigLineChart.allLabels[1] = weeklyDates.slice(0,12).reverse();

    let monthlyCases = [];
    let monthlyDates = [];
    for (let i = cases.length-1; i >= 0; i -= 30) {
      monthlyCases.push(cases[i]);
      monthlyDates.push(dates[i]);
    }
    this.bigLineChart.allData[2] = monthlyCases.slice(0,12).reverse();
    this.bigLineChart.allLabels[2] = monthlyDates.slice(0,12).reverse();
    this.initBigChart(0);
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
