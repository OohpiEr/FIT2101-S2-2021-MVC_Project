<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title">
        <div class="table-responsive overflow-hidden">
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            thead-classes="text-primary"
          >
            <template slot="columns">
              <th v-for="column in columns" :key="column">{{ column }}</th>
            </template>
          </base-table>
        </div>
      </card>
    </div>

    <!-- <base-table :data="tableData" :columns="columns">
      <template slot="columns">
        <th class="text-center">#</th>
        <th>Name</th>
        <th>Job Position</th>
        <th>Since</th>
        <th class="text-right">Salary</th>
        <th class="text-right">Actions</th>
      </template>
      <template slot-scope="{ row }">
        <td>{{ row.id }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.job }}</td>
        <td>{{ row.since }}</td>
        <td>{{ row.salary }}</td>
        <td class="td-actions text-right">
          <base-button type="info" size="sm" icon>
            <i class="tim-icons icon-single-02"></i>
          </base-button>
          <base-button type="success" size="sm" icon>
            <i class="tim-icons icon-settings"></i>
          </base-button>
          <base-button type="danger" size="sm" icon>
            <i class="tim-icons icon-simple-remove"></i>
          </base-button>
        </td>
      </template>
    </base-table>

    <div class="row">
      <div class="col-12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="col in table1.columns" scope="col">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(country, index) in table1.data">
              <td v-for="data in country">{{ data }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>
<script>
import { BaseTable } from "@/components";
const tableColumns = ["Username", "Email", "Phone", "numlogins", "lastlogin"];
// const tableColumns = ["Username", "Email", "Phone", "Number Of Logins", "Last Login"];
const tableData = [
  {
    id: 1,
    username: "Dakota Rice",
    numlogins: "$36.738",
    email: "Niger",
    phone: "Oud-Turnhout",
    lastlogin: "Oud-Turnhout",
  },
  {
    id: 2,
    username: "Minerva Hooper",
    numlogins: "$23,789",
    email: "Curaçao",
    phone: "Sinaai-Waas",
    lastlogin: "Oud-Turnhout",
  },
  {
    id: 3,
    username: "Sage Rodriguez",
    numlogins: "$56,142",
    email: "Netherlands",
    phone: "Baileux",
    lastlogin: "Oud-Turnhout",
  },
  {
    id: 4,
    username: "Philip Chaney",
    numlogins: "$38,735",
    email: "Korea, South",
    phone: "Overland Park",
    lastlogin: "Oud-Turnhout",
  },
  {
    id: 5,
    username: "Doris Greene",
    numlogins: "$63,542",
    email: "Malawi",
    phone: "Feldkirchen in Kärnten",
    lastlogin: "Oud-Turnhout",
  },
  {
    id: 6,
    username: "Mason Porter",
    numlogins: "$98,615",
    email: "Chile",
    phone: "Gloucester",
    lastlogin: "Oud-Turnhout",
  },
  {
    id: 7,
    username: "Jon Porter",
    numlogins: "$78,615",
    email: "Portugal",
    phone: "Gloucester",
    lastlogin: "Oud-Turnhout",
  },
];

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      table1: {
        title: "Report",
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
};
</script>
<style>
.overflow-hidden {
  overflow: hidden;
}
</style>
