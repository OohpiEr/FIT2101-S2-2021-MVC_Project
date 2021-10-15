<template>
  <div class="row">
    <div class="col-12">
      <card :title="reportTable.title">
        <div class="table-responsive overflow-hidden">
          <base-table
            :data="reportTable.data"
            :columns="reportTable.columns"
            thead-classes="text-primary"
          >
            <template slot="columns">
              <th v-for="column in reportTable.columnNames" :key="column">{{ column }}</th>
            </template>
          </base-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import { BaseTable } from "@/components";
const tableColumns = [
  "username",
  "useremail",
  "contact",
  "login_count",
  "last_login",
];
const columnNames = ["username", "email", "Phone", "Number Of Logins", "Last Login"];

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      reportTable: {
        title: "Report",
        columns: [...tableColumns],
        columnNames: [...columnNames],
        data: [],
      },
    };
  },
  async created() {
    const response = await axios.get(
      "http://localhost:3000/api/user/get/report",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    let options = { hour: "2-digit", minute: "2-digit" };
    let tableData = JSON.parse(response.data.posts);
    for (let i = 0; i < tableData.length; i++) {
      var date = new Date(tableData[i].last_login);
      tableData[i].last_login =date.toLocaleDateString("en-MY", options);
    }
    this.reportTable.data = tableData;
  },
};
</script>
<style>
.overflow-hidden {
     overflow-y: hidden;  
}
</style>
