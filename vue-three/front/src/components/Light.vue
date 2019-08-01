<template>
  <div id="container">
    <svg viewBox="0 0 100 100">
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
        :stroke-dasharray="strokeDasharray"
        :style="{ strokeDashoffset: theoffset }"
        :stroke-width="3"
        fill="transparent"
        :r="normalizedRadius*0.7"
        cx="50%"
        cy="50%"
      />
      <!-- <circle
        id="outer"
        stroke="red"
        :stroke-dasharray="strokeDasharray"
        :style="{ strokeDashoffset: theoffset }"
        :stroke-width="4.1"
        fill="transparent"
        :r="normalizedRadius"
        cx="50%"
        cy="50%"
      />-->
    </svg>
    <v-btn id="green" />
  </div>
</template>
 <style>
#container {
  position: relative;
}
#container #green {
  background-color: green;

  width: 5px;
  height: 20%;
  position: absolute;
  top: 39%;
  left: 37%;
  transform: translate(-50% -50%);
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
  width: 70%;
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
    const circumference = normalizedRadius * 2 * Math.PI;
    const circumference2 = (normalizedRadius - 5) * 2 * Math.PI;
    var onArray_time = [0, 0.4];
    var dashArray = [];
    var offArray_time = [0, 0.3, 0.5];
    var offArray = [];
    var lightData = this.light;
    // var time = this.normalize("11:03");

    return {
      normalizedRadius,
      circumference,
      circumference2,
      onArray_time,
      offArray_time,
      dashArray,
      lightData,
      offArray,
      time: 1,
      greenState: 1
    };
  },
  methods: {
    normalize: function(time) {
      return (
        (parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3, 5))) /
        1440
      );
    }
  },

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
  computed: {
    strokeDashoffset() {
      return this.circumference - this.time * this.circumference;
    },
    strokeDashoffset2() {
      return this.circumference2 - this.time * this.circumference2;
    },
    theoffset() {
      if (this.light.data[0].on) {
        return 0;
      } else {
        return 0;
      }
    },
    strokeDasharray() {
      var dash = "";
      var save = true;
      var last = 0;
      for (var i = 0; i < this.light.data.length; i++) {
        if (i == 0 && !this.light.data[i].on) {
          dash = "0 ";
        } else if (save != this.light.data[i].on) {
          dash =
            dash +
            (
              (this.normalize(this.light.data[i].hour) - last) *
              this.circumference
            ).toString() +
            " ";

          this.dashArray.push(dash);

          last = this.normalize(this.light.data[i].hour);
        }

        save = this.light.data[i].on;
        var hour = this.normalize(this.light.data[i].hour);
      }

      dash =
        dash +
        ((this.time - last) * this.circumference).toString() +
        " " +
        (this.time * this.circumference).toString();
      console.log(dash);

      return dash;
    },
    changeGreen: function() {
      // this.$socket.emit("switchGreen", this.greenState);
      this.greenState = !this.greenState;
    }

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
  }
  // strokeDashoffsetout() {
  //   return (
  //     this.circumference -
  //     (this.onArray_time[0] - this.offArray_time[0]) * this.circumference
  //   );
  // }
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
