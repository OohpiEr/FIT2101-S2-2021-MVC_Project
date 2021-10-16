<template>
  <div>
    <img class="data_image float-left" src="img/data_analysis.jpg" />

    <div class="color_white font-40" style="padding-top: 50px">
      2101_Data_Analytics:<br />
      A versatile widget for variant Data Visualisation and Analytics
    </div>

    <div class="color_white margin-top-40px float-left" style="font-size: 20px">
      2101_Data_Analytics is a versatile widget based on a multi-layered MVC
      that displays different types of data from different sources and produce
      appropriate analysis and predictions. <br />Unlike some other services,
      our product adds value to our target group without collecting and
      utilising users’ data for commercial purposes.
    </div>

    <div class="subsc-table-container" style="">
      <p class="font-40 color_white" style="">Choose your plan</p>
      <table class="subsc-table">
        <tr>
          <th></th>
          <th class="center-align subsc-th">Basic</th>
        </tr>
        <tbody>
          <p class="margin-top-40px">
            <tr>
              <td>Monthly Price</td>
              <td class="center-align">RM 0</td>
            </tr>
          </p>
        </tbody>
      </table>
      <div class="button-container">
        <div class="center-part">
          <button class="register-button" @click="$router.push('sign-up')">Register</button>
        </div>
      </div>
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
td {
  padding-bottom: 15px;
  border-bottom: 1px solid white;
}
.subsc-th {
  background-color: lightseagreen;
  padding: 30px 0;
  width: 150px;
}
.register-button {
  width: 400px;
  background-color: lightseagreen;
  color: white;
  border: none;
  padding: 10px 0;
}
.center-part {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.button-container {
  display: inline-block;
  width: 100%;
  position: relative;
  margin-top: 120px;
}
.center-align {
  text-align: center;
}
.data_image {
  width: 700px;
  height: 380px;
  margin-right: 50px;
}
.color_white {
  color: white;
}
.abs {
  position: absolute;
}
.float-left {
  float: left;
}
.font-40 {
  font-size: 40px;
}
.margin-top-40px {
  margin-top: 40px;
}
.subsc-table-container {
  font-size: 20px;
  color: white;
  margin-top: 120px;
  display: inline-block;
  width: 100%;
}
.subsc-table {
  font-size: 30px;
  margin: auto;
  width: 50%;
}
</style>
