<template>
    <div class="row">
      <div class="col-12">
         <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for = "col in table1.columns"scope="col">{{col}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country, index in table1.data">
          <td v-for = "data in country">{{data}}</td>
        </tr>
      </tbody>
    </table>
      </div>

    </div>
</template>
<script>
import { BaseTable } from "@/components";
import * as covid_api from "../api.js";
const tableColumns = ["Country", "Total Confirmed", "Total Deaths", "New Confirmed", "New Deaths"];


export default {
  components: {
    BaseTable
  },
  data() {
    return {
      table1: {
        title: "Countries",
        columns: [... tableColumns],
        data: []
      }
    };
  },
  async created(){
    let response = await covid_api.fetchCountries();
    console.log(response)
    this.table1.data = [...response]
  },
};
</script>
<style>
</style>
