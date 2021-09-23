<template>
  <!-- 
    The implementation for data visualization (in line chart) follows from Bryan's implementation from Dashboard.vue
    Initially I was planning to use other kind of charts, but then I also thought having it all uniform might be better.
    Although some code here might not be necessary to complete the task, I intentionally put those in case it is needed for further reference.
    The dataset used is dummy values. We will integrate it later with the dataset from the API. 
  -->
  <div>
    <div class="row">
      <div class="col-lg-12" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h2 class="card-title">{{ $t("COVID-19 Cases by Country") }}</h2>
            <h3 class="card-title">{{ $t("Country Name") }}</h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-stops="greenLineChart.gradientStops"
              :extra-options="greenLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import * as covid_api from "../api.js";
// just testing if the function works after being imported

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
  },
  data() {
    return {
      bigLineChart: {
        allData: [
          [
            [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
          ],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
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
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Data",
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
              data: [80, 100, 70, 80, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: [
            "01-08-2021",
            "02-08-2021",
            "03-08-2021",
            "04-08-2021",
            "05-08-2021",
            "06-08-2021",
            "07-08-2021",
            "08-08-2021",
            "09-08-2021",
            "10-08-2021",
            "11-08-2021",
            "12-08-2021",
            "13-08-2021",
            "14-08-2021",
            "15-08-2021",
            "16-08-2021",
            "17-08-2021",
            "18-08-2021",
            "19-08-2021",
            "20-08-2021",
            "21-08-2021",
            "22-08-2021",
            "23-08-2021",
            "24-08-2021",
            "25-08-2021",
            "26-08-2021",
            "27-08-2021",
            "28-08-2021",
            "29-08-2021",
            "30-08-2021",
            "31-08-2021",
            "01-09-2021",
            "02-09-2021",
            "03-09-2021",
            "04-09-2021",
            "05-09-2021",
          ],
          datasets: [
            {
              label: "Dates",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [
                1000, 750, 600, 800, 500, 350, 1200, 470, 877, 570, 659, 416,
                768, 531, 489, 814, 178, 158, 983, 368, 781, 301, 643, 841, 619,
                153, 191, 319, 183, 381, 931, 719, 481, 183, 312, 311,
              ],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },

      // unused (was initially for blue bar chart)
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: [
            "01-08-2021",
            "02-08-2021",
            "03-08-2021",
            "04-08-2021",
            "05-08-2021",
            "06-08-2021",
            "07-08-2021",
            "08-08-2021",
            "09-08-2021",
            "10-08-2021",
            "11-08-2021",
            "12-08-2021",
            "13-08-2021",
            "14-08-2021",
            "15-08-2021",
            "16-08-2021",
            "17-08-2021",
            "18-08-2021",
            "19-08-2021",
            "20-08-2021",
            "21-08-2021",
            "22-08-2021",
            "23-08-2021",
            "24-08-2021",
            "25-08-2021",
            "26-08-2021",
            "27-08-2021",
            "28-08-2021",
            "29-08-2021",
            "30-08-2021",
            "31-08-2021",
            "01-09-2021",
            "02-09-2021",
            "03-09-2021",
            "04-09-2021",
            "05-09-2021",
          ],
          datasets: [
            {
              label: "Dates",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [
                1000, 750, 600, 800, 500, 350, 1200, 470, 877, 570, 659, 416,
                768, 531, 489, 814, 178, 158, 983, 368, 781, 301, 643, 841, 619,
                153, 191, 319, 183, 381, 931, 719, 481, 183, 312, 311,
              ],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
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
        labels: [
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
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
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
</style>
