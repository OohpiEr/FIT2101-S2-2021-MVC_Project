<template>
  <div>
    <card type="chart" :key="chartData.key">
      <template slot="header">
        <h5 class="card-category">{{$t('dashboard.dailyCases')}}</h5>
        <h3 class="card-title">
          <i class="tim-icons icon-world text-info"></i> Total: {{totalNewCases}}
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
import config from "@/config";
import * as covid_api from "../../api.js";

let countryNameFull = []

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      extraOptions: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        responsive: true,
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          callbacks: {
            title: function (tooltipItem, data) {
              return countryNameFull[tooltipItem[0].index];
            },
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "white",
                fontSize: 15,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "white",
                fontSize: 15,
              },
            },
          ],
        },
      },
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
      totalNewCases: 0,
    };
  },

  async created() {
    let response = await covid_api.sortedByNewCases();
    for (let i = 0; i < 6; i++) {
      this.totalNewCases = globalData.TotalConfirmed;
      this.chartData.labels.push(countries[i].CountryCode);
      this.chartData.datasets[0].data.push(countries[i].NewConfirmed);
      countryNameFull.push(countries[i].Country);
    }
    this.chartData.key
      ? (this.chartData.key = false)
      : (this.chartData.key = true);
  },
};
</script>


<style>
</style>
