<template>
  <div style="position: relative">
    <canvas id="threeCanvas"></canvas>
    <b-container class="bv-example-row">
      <b-row>
        <b-col class="things" v-for="light in lights" v-bind:key="light.id" :id="light.id">
          <Light :light="light"></Light>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Light from "./Light.vue";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
var camera;
var renderer;
var scene;
var sceneOrtho;
var cameraOrtho;
var line, point1;
var raycaster = new THREE.Raycaster();
var topRightPos = new THREE.Vector2();
var mapC;
var spriteBL, spriteBR, spriteTL, spriteTR;
var group;

export default {
  name: "ThreeTest",
  props: ["lights"],
  data: function() {
    return {
      lights: this.lights
    };
  },
  components: {
    Light: Light
  },

  mounted: function() {},
  methods: {
    init: function() {
      var width = 1000;
      var height = 700;
      camera = new THREE.PerspectiveCamera(60, width / height, 1, 2100);
      camera.position.z = 115;

      scene = new THREE.Scene();
      scene.background = new THREE.Color("white");

      var light = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(light);

      line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(),
          new THREE.Vector3()
        ]),
        new THREE.LineBasicMaterial({ color: "black" })
      );
      scene.add(line);

      var mtlLoader = new MTLLoader();
      mtlLoader.load("/static/assets/basic.mtl", materials => {
        materials.preload();

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("/static/assets/basic.obj", object => {
          group = object.clone();
          scene.add(group);
          this.setUpLines();
          this.animate();
        });
      });

      var myCanvas = document.getElementById("threeCanvas");

      renderer = new THREE.WebGLRenderer({
        antialias: true,

        canvas: myCanvas
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.autoClear = false;
      renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);

      var controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.campingFactor = 0.25;
      controls.enableZoom = true;
    },
    connectStats: function() {
      let headers = new Headers();

      headers.append(
        "Authorization",
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzaXRlVGFnIjoiQkFSTkFSRFMiLCJpc3N1ZWRGb3IiOiJwcmVmZWN0IiwiaXNzIjoiaHR0cHM6Ly9wcmUyMDAwLmNvLnVrIiwiYXVkIjoiaHR0cHM6Ly9wcmUyMDAwLmNvLnVrIiwiZXhwIjoxNTY5ODM1MDc2LCJuYmYiOjE0MTIwNjg2NzZ9.Mk6A8i5q1xnENC-CneV9Gn3TWgp9JSwo9WtaTvoGq3Y"
      );

      fetch(
        "https://cors-anywhere.herokuapp.com/https://pre2000.co.uk/apiv1/SiteApi/BARNARDS/NodeStatus",
        {
          method: "GET",
          headers: headers
        }
      )
        .then(response => response.json())
        .then(json => updateFloors(json))
        .catch(error => console.log("Authorization failed : " + error.message));
    },
    setUpLines: function() {
      var light = document.getElementById("1");
      var rect = light.getBoundingClientRect();
      var bodyRect = document.body.getBoundingClientRect();
      var offset = rect.top - bodyRect.top;
      var width = window.innerWidth / 2;
      var height = window.innerHeight / 2;
      var sWidth = light.style.width / 2;
      var sHeight = light.style.height / 2;
      console.log((width - sWidth) / width, (height - sHeight) / height);

      console.log(
        "Element is " + bodyRect.top + " vertical pixels from <body>"
      );

      var width = window.innerWidth / 2;
      var height = window.innerHeight / 2;
      point1 = new THREE.Vector3();
      console.log(rect.top, rect.bottom, rect.right, rect.left);
      topRightPos.set(0.8, 0.6);

      var mesh = group.children[12];

      // console.log(mesh);

      mesh.geometry.computeBoundingBox();
      var center = new THREE.Vector3();
      mesh.geometry.boundingBox.getCenter(center);
      mesh.geometry.center();
      mesh.position.copy(center);
    },

    animate: function() {
      var point2 = new THREE.Vector3();
      requestAnimationFrame(this.animate);
      raycaster.setFromCamera(topRightPos, camera);
      raycaster.ray.at(1, point1);
      line.geometry.attributes.position.setXYZ(0, point1.x, point1.y, point1.z);

      point2 = group.children[12].position;

      line.geometry.attributes.position.setXYZ(1, point2.x, point2.y, point2.z);

      line.geometry.attributes.position.needsUpdate = true;
      renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);

      renderer.clear();
      renderer.render(scene, camera);
      renderer.clearDepth();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.things {
  width: 4%;
  height: 4%;
}

#threeCanvas {
  position: absolute;
  top: 0%;
  left: 0%;
}
</style>