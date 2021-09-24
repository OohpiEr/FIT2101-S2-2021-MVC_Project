<template>
  <div>
    <card type="chart" :key="chartData.key">
      <template slot="header">
        <h5 class="card-category">daily cases</h5>
        <h3 class="card-title">
          <i class="tim-icons icon-delivery-fast text-info"></i> 3,500
        </h3>
      </template>
      <div class="chart-area">
        <bar-chart
          style="height: 100%"
          chart-id="blue-bar-chart"
          :chart-data="chartData"
          :gradient-stops="gradientStops"
          :extra-options="extraOptions"
        >
        </bar-chart>
      </div>
    </card>
  </div>
</template>



<script>
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
// import chartConfigs from "@/pages/Dashboard/dailyNewCases";
import config from "@/config";
import * as covid_api from "../../api.js";

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      extraOptions: chartConfigs.barChartOptions,
      chartData: {
        key: false,
        labels: [],
        datasets: [
          {
            label: "New Cases",
            fill: true,
            borderColor: config.colors.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [],
          },
        ],
      },
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0],
    };
  },


  async created() {
    let response = await covid_api.sortedByNewCases();
    console.log(response);
    for (let i = 0; i < 6; i++) {
      this.chartData.labels.push(response[i].CountryCode);
      this.chartData.datasets[0].data.push(response[i].NewConfirmed);
    }
    this.chartData.key
      ? (this.chartData.key = false)
      : (this.chartData.key = true);
  },
};
</script>


<style>
</style>
