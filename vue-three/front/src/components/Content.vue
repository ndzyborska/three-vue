<template>
  <div id="content">
    <svg :height="radius * 2" :width="radius * 2">
      <circle
        stroke="white"
        :stroke-dasharray="circumference + ' ' + circumference"
        :style="{ strokeDashoffset: strokeDashoffset }"
        :stroke-width="stroke"
        fill="transparent"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    radius: 5,
    progress: Number,
    stroke: 5
  },
  data() {
    const normalizedRadius = this.radius - this.stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    return {
      normalizedRadius,
      circumference
    };
  },
  methods: {},
  computed: {
    strokeDashoffset() {
      return this.circumference - (this.progress / 100) * this.circumference;
    }
  }
};
</script>

<style>
#content {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


  <!-- <div>
    <div class="container"></div>

    <svg ref="animated" id="animated" viewBox="0 0 100 100">
      <circle
        :r="normalizedRadius"
        cx="60"
        cy="60"
        stroke-linecap="round"
        stroke-width="4"
        :stroke-dasharray="circumference + ' ' + circumference"
        fill="#FDB900"
        :style="{ strokeDashoffset: strokeDashoffset }"
      />
      <path
        id="progress"
        stroke-linecap="round"
        stroke-width="4"
        stroke="#fff"
        fill="none"
        d="M50 10
           a 40 40 0 0 1 0 80
           a 40 40 0 0 1 0 -80"
      />
      <text id="count" x="50" y="50" text-anchor="middle" dy="7" font-size="20">100%</text>
    </svg>
    <input v-model="percentage" type="number" placeholder="edit me" />
    <p>Progress: {{ percentage }}</p>
  </div> -->