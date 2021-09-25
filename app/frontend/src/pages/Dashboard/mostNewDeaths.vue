<template>
  <div>
    <card type="chart">
      <template slot="header">
        <h5 class="card-category">{{ $t("dashboard.mostNewDeaths") }}</h5>
        <h3 class="card-title" id="blueBarChartCard">
          <i class="tim-icons icon-delivery-fast text-info"></i>
        </h3>
      </template>
      <div class="chart-area">
        <bar-chart
          style="height: 100%"
          chart-id="blue-bar-chart"
          :chart-data="blueBarChart.chartData"
          :gradient-stops="blueBarChart.gradientStops"
          :extra-options="blueBarChart.extraOptions"
        >
        </bar-chart>
      </div>
    </card>
  </div>
</template>
<script>
import BarChart from "@/components/Charts/BarChart";
import * as covid_api from "../../api.js";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
export default {
  components: {
    BarChart,
  },
  data() {
    return {
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: [],
          datasets: [
            {
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
      },
    };
  },
  methods: {
    displayBarChartTotalNumber(number) {
      let blueBarChartCardRef = document.getElementById("blueBarChartCard");
      blueBarChartCardRef.insertAdjacentText("beforeend", number);
    },
  },
  async created() {
    let response_most_new_deaths = await covid_api.sortedByNewDeaths();
    let new_deaths_country_list = [];
    let new_deaths_number_list = [];
    response_most_new_deaths.forEach((index) => {
      new_deaths_country_list.push(index["CountryCode"]);
      new_deaths_number_list.push(index["NewDeaths"]);
    });
    let totalNewCases = new_deaths_number_list.reduce(
      (partial_sum, a) => partial_sum + a,
      0
    );
    this.blueBarChart.chartData = {
      labels: new_deaths_country_list.slice(0, 5),
      datasets: [
        {
          data: new_deaths_number_list,
          fill: true,
          borderColor: config.colors.info,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
        },
      ],
    };
    this.displayBarChartTotalNumber(totalNewCases);
  },
};
</script>
<style>
</style>