<template>
  <div class="row">
    <div class="col-12">
      <base-input class="col-md-6" type="text" v-model = "table1.filter" placeholder = "Country"/>
      <h3> Sort countries by:
        <br>
        <base-button size="md" type="primary" @click = "mostTotalCases">Most Total Cases</base-button>
        <base-button size="md" type="primary" @click = "mostTotalDeaths">Most Total Deaths</base-button>
        <base-button size="md" type="primary" @click = "mostNewCases">Most New Cases</base-button>
        <base-button size="md" type="primary" @click = "mostNewDeaths">Most New Deaths</base-button>
      </h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th v-for="col in table1.columns" scope="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(country, index) in filteredCountries">
            <td v-for="data in country">{{ data }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import * as covid_api from "../api.js";
const tableColumns = ["Country Code", "Country", "Total Confirmed", "Total Deaths", "New Confirmed", "New Deaths"];


export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: "Countries",
        columns: [...tableColumns],
        filter:"",
        data: [],
      },
    };
  },
  methods:{
    mostNewDeaths(){
      this.table1.data.sort(function (a, b) {
        return b.NewDeaths - a.NewDeaths;
      });
    },
    mostTotalDeaths(){
        this.table1.data.sort(function (a, b) {
        return b.TotalDeaths - a.TotalDeaths;
      });
    },
    mostNewCases(){
        this.table1.data.sort(function (a, b) {
        return b.NewConfirmed - a.NewConfirmed;
      });
    },
    mostTotalCases(){
        this.table1.data.sort(function (a, b) {
        return b.TotalConfirmed - a.TotalConfirmed;
      });
    }


  },
  async created() {
    let response = await covid_api.fetchCountries();
    this.table1.data = [...response]
  },
  computed:{
    filteredCountries: function(){
      return this.table1.data.filter((country)=>{
        return country.Country.toLowerCase().match(this.table1.filter.toLowerCase());
      })
    }
  }
};
</script>
<style>
</style>
