<template>
  <div>
    <default-layout />
  </div>
  <div>
    <notifications position="bottom right" width="25%" />
  </div>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
  },
};
</script>
