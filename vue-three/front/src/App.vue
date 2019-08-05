<template>
  <div id="ancestor">
    <div class="container-fluid" id="app">
      <div class="row">
        <div id="sidebar" class="col-md-3 col-sm-4 col-xs-12 sidebar">
          <div></div>
          <div id="bar">
            <svg>
              <rect
                v-for="device in devices"
                :key="device.no"
                :y="20*device.no"
                height="40"
                style="fill:white;stroke-width:3;stroke:rgb(0,0,0)"
              >
                <rect
                  :width="device.energy*5"
                  style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"
                />
              </rect>
            </svg>
          </div>
        </div>
        <Model :lights="lights" class="col-md-9 col-sm-8 col-xs-12 content" id="dashboard-content"></Model>
      </div>
    </div>
    <!-- <v-btn large fab color="green" v-on:click="changeGreen">
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
    </v-btn>-->
    <br />
  </div>
</template>

<script>
import Model from "./components/Model.vue";
import * as io from "socket.io-client";

export default {
  name: "App",
  components: {
    Model: Model
  },
  data() {
    var devices = [
      { no: 1, id: "l01", energy: 17 },
      { no: 2, id: "l02", energy: 15 },
      { no: 3, id: "l03", energy: 4 },
      { no: 4, id: "l04", energy: 2 }
    ];
    var lights;
    return {
      socket: io("localhost:3001"),
      devices,

      // greenState: 1,
      // yellowState: 1,
      // redState: 1,
      lights: [],
      temps: ["t01", "t02", "t03"],
      washing: ["w01"],
      dish: ["d01"],
      kettle: ["k01"],
      car: ["c1"]
    };
  },
  // mounted: {
  //   getData: function() {
  //     this.$socket.on("myEvent", function(data) {
  //       console.log(data.arrayToSendToBrowser);
  //       // ["I'm the data that will get sent.", "I'm some more data.", "Here's the third piece of data.]"
  //     });
  //   }
  // changeGreen: function() {},
  // changeYellow: function() {
  //   this.$socket.emit("switchYellow", this.yellowState);
  //   this.yellowState = !this.yellowState;
  // },
  // changeRed: function() {
  //   this.$socket.emit("switchRed", this.redState);
  //   this.redState = !this.redState;
  // }

  mounted: function() {
    this.socket.on("leds", stuff => {
      this.lights = stuff;
    });
  }
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

/* #green {
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
} */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  color: #2c3e50;
}
#sidebar {
  position: relative;
}

#bar {
  position: absolute;
  background-color: white;
  top: 45%;
  overflow: auto;
  height: 52%;
  width: 88%;
}
</style>

