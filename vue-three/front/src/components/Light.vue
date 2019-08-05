<template>
  <div id="container">
    <svg viewBox="0 0 100 100">
      <defs>
        <g id="lines" style="stroke: black;">
          <line x1=" 45" x2=" 49" />
          <line x1="-45" x2="-49" />
          <line y1=" 45" y2=" 49" />
          <line y1="-45" y2="-49" />
        </g>
      </defs>
      <g transform="translate(50 50)">
        <use xlink:href="#lines" transform="rotate( 0)" />
        <use xlink:href="#lines" transform="rotate( 30)" />
        <use xlink:href="#lines" transform="rotate( 60)" />
      </g>
      <circle
        id="circle"
        cx="50%"
        cy="50%"
        :r="normalizedRadius"
        fill="transparent"
        stroke="black"
        stroke-width="1"
      />
      <circle id="circle" cx="50%" cy="50%" :r="normalizedRadius*0.9" fill="#FDB900" />
      <circle
        id="outer_white"
        stroke="black"
        stroke-linecap="round"
        :stroke-dasharray="circumference + ' ' + circumference"
        :style="{ strokeDashoffset: strokeDashoffset }"
        :stroke-width="3"
        fill="transparent"
        :r="normalizedRadius*0.8"
        cx="50%"
        cy="50%"
      />
      <circle
        id="outer"
        stroke="white"
        :stroke-dasharray="strokeDasharray"
        :style="{ strokeDashoffset: theoffset }"
        :stroke-width="3"
        fill="transparent"
        :r="normalizedRadius*0.8"
        cx="50%"
        cy="50%"
      />

      <circle
        id="inner"
        stroke="black"
        stroke-linecap="round"
        :stroke-dasharray="circumference2 + ' ' + circumference2"
        :style="{ strokeDashoffset: strokeDashoffset2 }"
        :stroke-width="3"
        fill="transparent"
        :r="normalizedRadius*0.7"
        cx="50%"
        cy="50%"
      />
      <circle
        id="inner"
        stroke="white"
        stroke-linecap="round"
        :stroke-dasharray="strokeDasharray2"
        :style="{ strokeDashoffset: theoffset }"
        :stroke-width="3"
        fill="transparent"
        :r="normalizedRadius*0.7"
        cx="50%"
        cy="50%"
      />
      <circle
        id="red"
        stroke="red"
        :stroke-dasharray="redDasharray"
        :style="{ strokeDashoffset: theoffset }"
        :stroke-width="1"
        fill="transparent"
        :r="normalizedRadius*0.8"
        cx="50%"
        cy="50%"
      />
    </svg>

    <button id="green" v-on:click="changeGreen">
      <img id="img" src="../assets/light.png" />
    </button>

    <!-- <v-icon color="white" v-if="!greenState"></v-icon>
    <v-icon color="white" v-if="!greenState"></v-icon>-->
    <!-- </v-btn> -->
  </div>
</template>
 <style>
#container {
  position: relative;
}
#container #green {
  background-color: green;
  position: absolute;
  top: 30%;
  width: 25%;
  height: 40%;
  border: solid;
  border-radius: 100%;
  left: 38%;
}
#container #orange {
  background-color: orange;
  position: absolute;
  top: 32%;
  width: 25%;
  height: 40%;
  border: solid;
  border-radius: 100%;
  left: 39.5%;
}
#container #red {
  background-color: red;
  position: absolute;
  top: 32%;
  width: 25%;
  height: 40%;
  border: solid;
  border-radius: 100%;
  left: 39.5%;
}
#img {
  width: 60%;
  height: 60%;
}
#outer {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
#outer_white {
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
  width: 60%;
  height: 60%;
  position: relative;
}
</style>

<script>
// var s = Snap("#animated");
// var progress = s.select("#progress");

export default {
  props: ["light"],
  data() {
    const normalizedRadius = 45;
    const circumference = normalizedRadius * 0.8 * 2 * Math.PI;
    const circumference2 = normalizedRadius * 0.7 * 2 * Math.PI;
    var onArray_time = [0, 0.4];
    var dashArray = [];
    var offArray_time = [0, 0.3, 0.5];
    var offArray = [];
    var lightData = this.light;
    var greenState = 1;
    // var time = this.normalize("11:03");

    return {
      greenState,
      normalizedRadius,
      circumference,
      circumference2,
      onArray_time,
      offArray_time,
      dashArray,
      lightData,
      offArray,
      time: 0.7
    };
  },
  methods: {
    normalize: function(time) {
      return (
        (parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3, 5))) /
        1440
      );
    },
    changeGreen: function() {
      this.$socket.emit(this.light.id, this.greenState);
      this.greenState = !this.greenState;
    }
  },
  computed: {
    theoffset() {
      if (this.light.data[0][0].on) {
        return 0;
      } else {
        return 0;
      }
    },
    strokeDasharray: function() {
      var dash = "";
      var save = true;
      var last = 0;
      // console.log(this.light.data[0].length);
      for (var i = 0; i < this.light.data[0].length; i++) {
        if (i == 0 && !this.light.data[0][i].on) {
          dash = "0 ";
        } else if (save != this.light.data[0][i].on) {
          dash =
            dash +
            (
              (this.normalize(this.light.data[0][i].hour) - last) *
              this.circumference
            ).toString() +
            " ";

          this.dashArray.push(dash);

          last = this.normalize(this.light.data[0][i].hour);
        }

        save = this.light.data[0][i].on;
        var hour = this.normalize(this.light.data[0][i].hour);
      }

      if (save) {
        dash =
          dash +
          ((this.time - last) * this.circumference).toString() +
          " " +
          (this.time * this.circumference).toString();
      } else {
        dash =
          dash +
          (
            (this.time - last) * this.circumference +
            this.time * this.circumference
          ).toString();
      }

      return dash;
    },
    strokeDasharray2: function() {
      var dash = "";
      var save = true;
      var last = 0;
      // console.log(this.light.data[0].length);
      for (var i = 0; i < this.light.data[0].length; i++) {
        if (i == 0 && !this.light.data[0][i].oc) {
          dash = "0 ";
        } else if (save != this.light.data[0][i].oc) {
          dash =
            dash +
            (
              (this.normalize(this.light.data[0][i].hour) - last) *
              this.circumference2
            ).toString() +
            " ";

          this.dashArray.push(dash);

          last = this.normalize(this.light.data[0][i].hour);
        }

        save = this.light.data[0][i].oc;
        var hour = this.normalize(this.light.data[0][i].hour);
      }
      if (save) {
        dash =
          dash +
          ((this.time - last) * this.circumference2).toString() +
          " " +
          (this.time * this.circumference2).toString();
      } else {
        dash =
          dash +
          (
            (this.time - last) * this.circumference2 +
            this.time * this.circumference2
          ).toString();
      }

      return dash;
    },
    strokeDashoffset: function() {
      return this.circumference - this.time * this.circumference;
    },
    strokeDashoffset2: function() {
      return this.circumference2 - this.time * this.circumference2;
    },
    redDasharray: function() {
      var dash = "";
      var save = true;
      var last = 0;
      for (var i = 0; i < this.light.data[0].length; i++) {
        if (i == 0 && this.light.data[0][i].oc === this.light.data[0][i].on) {
          dash = "0 ";
        } else if (!save) {
          dash =
            dash +
            (
              (this.normalize(this.light.data[0][i].hour) - last) *
              this.circumference2
            ).toString() +
            " ";

          this.dashArray.push(dash);

          last = this.normalize(this.light.data[0][i].hour);
        }
        console.log(save);

        save = this.light.data[0][i].on || this.light.data[0][i].oc;
        var hour = this.normalize(this.light.data[0][i].hour);
      }
      if (save) {
        dash =
          dash +
          ((this.time - last) * this.circumference2).toString() +
          " " +
          (this.time * this.circumference2).toString();
      } else {
        dash =
          dash +
          (
            (this.time - last) * this.circumference2 +
            this.time * this.circumference2
          ).toString();
      }
      console.log(this.light.id, dash);

      return dash;
    }
  }
};

// watch: {
//   light: {
//     handler: function() {
//       var dash = "";
//       var save;
//       var sum;
//       for (item in this.light.data) {
//         if (save != item.on) {
//           onArray.push((this.message - item.hour) * this.circumference);
//           dash =
//             dash +
//             ((this.message - item.hour) * this.circumference).toString +
//             " ";
//           sum = sum + (this.message - item.hour) * this.circumference;
//         }
//         // } else { from if (item.on)
//         //   offArray.push((this.message - item.hour)*this.circumference);
//         // }
//         save = item.on;
//       }
//       var end = (dash = dash + " " + (this.circumference - sum).toString());
//       console.log(dash);
//     }
//   }
// },

// console.log(this.light.data[i]);
// if (save != this.light.data[i].on) {
//   this.onArray.push(
//     (this.light.data[i].hour) * this.circumference
//   );
//   dash =
//     dash +
//     (
//       (this.message - this.light.data[i].hour) *
//       this.circumference
//     ).toString() +
//     " ";
//   sum =
//     sum + (this.message - this.light.data[i].hour) * this.circumference;
// }
// } else { from if (item.on)
//   offArray.push((this.message - item.hour)*this.circumference);
// }
// save = this.light.data[i].on;

// var end = dash + " " + (this.circumference - sum).toString();
// console.log("tis", end);
// return end;
// console.log(
//   this.circumference,
//   (
//     (this.message - this.onArray_time[0]) *
//     this.circumference
//   ).toString() +
//     " " +
//     (this.circumference - this.message * this.circumference).toString()
// );

// var x = (this.message - this.onArray_time[0]) * this.circumference;
// this.onArray.push(x);

// return x.toString() + " " + (this.circumference - x).toString();

// strokeDashoffsetout() {
//   return (
//     this.circumference -
//     (this.onArray_time[0] - this.offArray_time[0]) * this.circumference
//   );
// }

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
