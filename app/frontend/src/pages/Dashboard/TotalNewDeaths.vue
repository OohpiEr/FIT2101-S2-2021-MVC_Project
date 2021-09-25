<template>
  <div>
    <card class="card">
      <h4 slot="header" class="card-title">{{$t('dashboard.totalDeaths')}}</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th v-for="col in table_widget.columns" scope="col">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(country, index) in table_widget.data">
            <td v-for="data in country">{{ data }}</td>
          </tr>
        </tbody>
      </table>
    </card>
  </div>
</template>
<script>
import * as covid_api from "../../api.js";
const tableColumns = [
  "Country Code",
  "Country",
  "Total Confirmed",
  "Total Deaths",
  "New Confirmed",
  "New Deaths",
];

export default {
  data() {
    return {
      table_widget: {
        title: "Countries with the most total deaths",
        columns: [...tableColumns],
        data: [],
      },
    };
  },
  async created() {
    let total_deaths = await covid_api.sortedByTotalDeaths();
    this.table_widget.data = total_deaths.slice(0, 5);
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