<template>
  <div>
    <card type="chart">
      <template slot="header">
        <h5 class="card-category">
          {{ $t("dashboard.mostTotalCases") }}
        </h5>
        <h3 class="card-title" id="mostCases">
          <i class="tim-icons icon-chart-bar-32 text-info"></i>
        </h3>
      </template>
      <div class="chart-area">
        <bar-chart
          style="height: 100%"
          chart-id="most-total-cases-bar-chart"
          :chart-data="mostTotalCasesBarChart.chartData"
          :gradient-stops="mostTotalCasesBarChart.gradientStops"
          :extra-options="mostTotalCasesBarChart.extraOptions"
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
      mostTotalCasesBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        totalCases: "",
        chartData: {
          // gets labels from the api (asynchronously)
          labels: [],
          // dummy values :
          //["Malaysia", "Thailand","Indonesia","Vietnam","Italy","USA","Australia"]
          datasets: [
            {
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              // gets data from the api (asynchronously)
              data: [],
              // dummy values :
              // [10000, 9500, 8790, 7314, 5821, 3145, 1987]
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
    };
  },
  methods: {
    displayBarChartMostCases(number) {
      let barChart = document.getElementById("mostCases");
      barChart.insertAdjacentText("beforeend", number);
    },
  },
  async created() {
    // most total cases (by country) (in descending order)
    let most_cases_api = await covid_api.sortedByTotalCases(); // will comes in array of objects
    let mostCases = most_cases_api.slice(0, 5); // only take top 5

    let countryNames = mostCases.map((object) => object.CountryCode);
    let countryCases = mostCases.map((object) => object.TotalConfirmed);
    let totalCases = countryCases.reduce((acc, x) => acc + x, 0);

    // update the labels and the data
    this.mostTotalCasesBarChart.chartData = {
      labels: countryNames,
      datasets: [
        {
          data: countryCases,
          fill: true,
          borderColor: config.colors.info,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
        },
      ],
    };

    this.displayBarChartMostCases(totalCases);
    this.mostTotalCasesBarChart.totalCases = totalCases;
  },
};
</script>
<style>
</style>