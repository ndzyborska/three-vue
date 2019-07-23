<template>
  <div id="container">
    <svg viewBox="0 0 100 100">
      <circle cx="50%" cy="50%" r="50" fill="#FDB900" />
      <circle
        id="outer"
        stroke="white"
        stroke-linecap="round"
        :stroke-dasharray="circumference + ' ' + circumference"
        :style="{ strokeDashoffset: strokeDashoffset }"
        :stroke-width="4"
        fill="transparent"
        :r="normalizedRadius"
        cx="50%"
        cy="50%"
      />
      <circle
        id="inner"
        stroke="white"
        stroke-linecap="round"
        :stroke-dasharray="circumference2 + ' ' + circumference2"
        :style="{ strokeDashoffset: strokeDashoffset2 }"
        :stroke-width="4"
        fill="transparent"
        :r="normalizedRadius-5"
        cx="50%"
        cy="50%"
      />
    </svg>
    <input v-model="message" type="number" placeholder="edit me" />
    <p>Message is: {{ message }}</p>
  </div>
</template>
 <style>
#container {
  position: center;
}
#outer {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
#inner {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
svg {
  width: 100%;
}
</style>

<script>
// var s = Snap("#animated");
// var progress = s.select("#progress");

export default {
  data() {
    const normalizedRadius = 45;
    const circumference = normalizedRadius * 2 * Math.PI;
    const circumference2 = (normalizedRadius - 5) * 2 * Math.PI;

    console.log((normalizedRadius + 10) / 2, normalizedRadius + 10);

    return {
      normalizedRadius,
      circumference,
      circumference2,
      message: 50
    };
  },
  computed: {
    viewbox() {
      return (
        "0 0 " +
        (this.normalizedRadius + 10) * 2 +
        " " +
        (this.normalizedRadius + 10) * 2
      );
    },
    strokeDashoffset() {
      return this.circumference - (this.message / 100) * this.circumference;
    },
    strokeDashoffset2() {
      return this.circumference2 - (this.message / 100) * this.circumference2;
    }
  }
};

// launch example with progress ring
// new Vue({
//   el: '#example',
//   components: {
//     'progress-ring': ProgressRing
//   },
//   data() {
//     return { progress: 0 }
//   },
//   mounted() {
//     // emulating progress
//     const interval = setInterval(() => {
//       this.progress += 10;
//       if (this.progress === 100)
//         clearInterval(interval);
//     }, 1000);
//   },
//   template: `
//     <div>
//       <progress-ring radius="60" :progress="progress" stroke="4"></progress-ring>
//     </div>
//   `
// });
// name: "App",
// data() {
//   return {};
// },
// methods: {
//   change: function() {}
// },
// mounted: function() {
//   var an = this.$refs["animated"];
//   var progress = this.$refs["progress"];

//   progress.attr({ strokeDasharray: "0, 251.2" });
//   an.animate(
//     0,
//     251.2,
//     function(value) {
//       progress.attr({ "stroke-dasharray": value + ",251.2" });
//     },
//     5000
//   );
// }

// launch example with progress ring
</script>
