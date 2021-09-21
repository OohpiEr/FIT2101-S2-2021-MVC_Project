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
    this.$watch('chartData', (newVal, oldVal) => {
      if (!oldVal) {
        this.renderChart(
          this.chartData,
          this.options
        );
      }
    }, { immediate: true });
  }
};
