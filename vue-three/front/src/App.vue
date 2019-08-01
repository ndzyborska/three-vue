<template>
  <div id="ancestor">
    <div class="container-fluid" id="app">
      <div class="row">
        <div id="sidebar" class="col-md-3 col-sm-4 col-xs-12 sidebar"></div>
        <Model :lights="lights" class="col-md-9 col-sm-8 col-xs-12 content" id="dashboard-content"></Model>
      </div>
    </div>
    <v-btn large fab color="green" v-on:click="changeGreen">
      <v-icon color="white" v-if="greenState">brightness_1</v-icon>
      <v-icon color="white" v-if="!greenState">wb_incandescent</v-icon>
    </v-btn>

    <v-btn large fab color="yellow" v-on:click="changeYellow">
      <v-icon color="white" v-if="yellowState">brightness_1</v-icon>
      <v-icon color="white" v-if="!yellowState">wb_incandescent</v-icon>
    </v-btn>

    <v-btn large fab color="red" v-on:click="changeRed">
      <v-icon color="white" v-if="redState">brightness_1</v-icon>
      <v-icon color="white" v-if="!redState">wb_incandescent</v-icon>
    </v-btn>
    <br />
  </div>
</template>

<script>
import Model from "./components/Model.vue";

export default {
  name: "App",
  components: {
    Model: Model
  },
  data() {
    return {
      greenState: 1,
      yellowState: 1,
      redState: 1,
      lights: [
        {
          name: "lights1",
          id: 1,
          data: [
            { hour: "00.00", on: true, oc: true },
            { hour: "09.00", on: false, oc: true },
            { hour: "11.00", on: true, oc: false },
            { hour: "11.00", on: true, oc: true }
            // { hour: "13.00", on: true, oc: false },
            // { hour: "16.00", on: false, oc: true },
            // { hour: "18.00 PM", on: false, oc: false },
            // { hour: "21.00 PM", on: false, oc: false }
          ]
        },
        {
          name: "lights2",
          id: 2,
          data: [
            { hour: "00.00", on: false, oc: true },
            { hour: "02.00", on: true, oc: true },
            { hour: "05.00", on: false, oc: true },
            { hour: "11.00", on: true, oc: true }
            // { hour: "13.00", on: true, oc: false },
            // { hour: "14.00", on: false, oc: true },
            // { hour: "15.00", on: false, oc: false },
            // { hour: "16.00", on: false, oc: false }
          ]
        },
        {
          name: "lights3",
          id: 3,
          data: [
            { hour: "00.00 AM", on: false, oc: true },
            { hour: "11.00 AM", on: true, oc: true }
            // { hour: "13.00 PM", on: true, oc: false },
            // { hour: "15.06 PM", on: false, oc: true },
            // { hour: "17.22 PM", on: false, oc: false },
            // { hour: "20.56 PM", on: false, oc: false }
          ]
        },
        {
          name: "lights4",
          id: 4,
          data: [
            { hour: "00.00", on: false, oc: true },
            { hour: "11.00", on: true, oc: true }
            // { hour: "12.00 PM", on: true, oc: true },
            // { hour: "12.20 PM", on: true, oc: false },
            // { hour: "13.10 PM", on: false, oc: true },
            // { hour: "15.00 PM", on: false, oc: false },
            // { hour: "19.20 PM", on: false, oc: false }
          ]
        }
      ],
      temps: ["temp1", "temp2", "temp3"],
      washing: ["wahser1"],
      dish: ["dish1"],
      kettle: ["kettle1"],
      car: ["car1"]
    };
  },
  methods: {
    changeGreen: function() {
      this.$socket.emit("switchGreen", this.greenState);
      this.greenState = !this.greenState;
    },
    changeYellow: function() {
      this.$socket.emit("switchYellow", this.yellowState);
      this.yellowState = !this.yellowState;
    },
    changeRed: function() {
      this.$socket.emit("switchRed", this.redState);
      this.redState = !this.redState;
    }
  }
  // mounted: function() {
  //   var five = require("johnny-five");
  //   var keypress = require("keypress");

  //   keypress(process.stdin);

  //   var board = new five.Board({ repl: false });

  //   board.on("ready", function() {
  //     console.log(
  //       "Use Up and Down arrows for CW and CCW respectively. Space to stop."
  //     );

  //     var servo = new five.Servo.Continuous(10);

  //     process.stdin.resume();
  //     process.stdin.setEncoding("utf8");
  //     process.stdin.setRawMode(true);

  //     process.stdin.on("keypress", function(ch, key) {
  //       if (!key) {
  //         return;
  //       }

  //       if (key.name === "q") {
  //         console.log("Quitting");
  //         process.exit();
  //       } else if (key.name === "up") {
  //         console.log("CW");
  //         servo.cw();
  //       } else if (key.name === "down") {
  //         console.log("CCW");
  //         servo.ccw();
  //       } else if (key.name === "space") {
  //         console.log("Stopping");
  //         servo.stop();
  //       }
  //     });
  ///   });
};
</script>

<style>
@import "./css/style.css";
@import "./css/bootstrap.min.css";

#green {
  background-color: green;
  width: 10%;
  margin: 20;
}
#yellow {
  background-color: yellow;
  width: 10%;
  margin: 20;
}
#red {
  background-color: red;
  width: 10%;
  margin: 20;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

