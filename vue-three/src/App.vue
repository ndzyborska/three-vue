<template>
  <div id="ancestor">
    <div class="container-fluid" id="app">
      <div class="row">
        <div id="sidebar" class="col-md-3 col-sm-4 col-xs-12 sidebar"></div>
        <dashboard-content class="col-md-9 col-sm-8 col-xs-12 content" id="dashboard-content"></dashboard-content>
      </div>
    </div>
  </div>
</template>

<script>
import Model from "./components/Model.vue";

export default {
  name: "App",
  components: {
    "dashboard-content": Model
  }
};
</script>

<style>
@import "./css/style.css";
@import "./css/bootstrap.min.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

