import { Doughnut, mixins } from "vue-chartjs";

export default {
  name: 'pie-chart',
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ["options"],
  data() {
    return {
      ctx: null
    };
  },
  methods: {
    updateGradients(chartData) {
      if(!chartData) return;
      const ctx = this.ctx || document.getElementById(this.chartId).getContext('2d');
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData () {
      this.$data._chart.update()
    }
  }
  
};
