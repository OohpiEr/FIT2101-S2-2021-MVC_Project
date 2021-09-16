<template>
  
</template>
<script>
import Dashboard from "../Dashboard.vue";
export default {
  components: { Dashboard },
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped>
base-input {
  padding-bottom: 5px;
  padding-top: 5px;
  padding-right: 30px;
  padding-left: 30px;
}

.button {
  padding: 15px;
}
</style>
