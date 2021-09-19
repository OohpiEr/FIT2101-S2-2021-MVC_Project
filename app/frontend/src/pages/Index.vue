<template>
  <div>
    <div><img src="frontend/public/img/data_analysis.jpg"></div>

    <div style="color: white">
      2101_Data_Analytics: A versatile widget for variant Data Visualisation and
      Analytics
    </div>
    <br />

    <div style="color: white">
      2101_Data_Analytics is a versatile widget based on a multi-layered MVC
      that displays different types of data from different sources and produce
      appropriate analysis and predictions. Unlike some other services, our
      product adds value to our target group without collecting and utilising
      users’ data for commercial purposes.
    </div>

    <div style="color: white; margin-top: 22px">
      Choose your plan
      <table>
        <tr>
          <th></th>
          <th>Basic</th>
        </tr>
        <tbody>
          <tr>
            <td>Monthly Price</td>
            <td>RM 200</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="color: white">
      <button>Register</button>
    </div>
  </div>
</template>

<script>
import Table from "./Table.vue";
export default {
  components: { Table },
  name: "Index.vue",
};
</script>

<style scoped>
</style>
