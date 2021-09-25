<template>
  <div>
    <card type="chart">
      <template slot="header">
        <h6 class="title d-inline">{{ $t("dashboard.pie") }}</h6>
      </template>
      <pie-chart
        style="height: 100%"
        ref="piechart"
        chart-id="my-pie-chart"
        :chartData="pieChart.chartData"
        :options="pieChart.chartOptions"
      >
      </pie-chart>
    </card>
  </div>
</template>
<script>
import PieChart from "@/components/Charts/PieChart";
import * as covid_api from "../../api.js";
export default {
  components: {
    PieChart,
  },
  data() {
    return {
      pieChart: {
        chartOptions: {
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 15,
            },
          },
          hoverBorderWidth: 20,
          circumfurence: 10,
          responsive: true,
          maintainAspectRatio: false,
        },
        chartData: {
          labels: [],
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          datasets: [
            {
              label: "Data One",
              backgroundColor: [
                "#41B883",
                "#E46651",
                "#00D8FF",
                "#ffd700",
                "#03083c",
              ],
              data: [],
            },
          ],
        },
      },
    };
  },
  async created() {
    let response = await covid_api.fetchGlobal();
    this.pieChart.chartData = {
      ...this.pieChart.chartData,
      labels: Object.keys(response).slice(0, 4),
      datasets: [
        {
          ...this.pieChart.chartData.datasets,
          backgroundColor: [
            "#41B883",
            "#E46651",
            "#00D8FF",
            "#ffd700",
            "#03083c",
          ],
          data: Object.values(response).slice(0, 4),
        },
      ],
    };
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
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