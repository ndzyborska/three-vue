<template>
  <div class="container">
    <canvas id="threeCanvas"></canvas>
    <b-container class="things">
      <b-row>
        <b-col v-for="light in lights" v-bind:key="light.id" :id="light.id">
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
var point1;
var line;
var lines = [];

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
    setUpLines: function() {
      this.lights.forEach((light, index) => {
        line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(),
            new THREE.Vector3()
          ]),
          new THREE.LineBasicMaterial({ color: "black" })
        );
        scene.add(line);
        var pos = new THREE.Vector2();
        pos.set(-0.7 + (7 / 15) * index, 0.7);

        lines.push({ line: line, position: pos });
        var mesh = this.getObject(light.id);
        mesh.geometry.computeBoundingBox();
        var center = new THREE.Vector3();
        mesh.geometry.boundingBox.getCenter(center);
        mesh.geometry.center();
        mesh.position.copy(center);
        var point2 = new THREE.Vector3();
        point2 = mesh.position;
        line.geometry.attributes.position.setXYZ(
          1,
          point2.x,
          point2.y,
          point2.z
        );
      });
    },
    getObject: function(name) {
      for (let child of group.children) {
        if (child.name === name) {
          return child;
        }
      }
      return null;
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      point1 = new THREE.Vector3();

      lines.forEach(line => {
        raycaster.setFromCamera(line.position, camera);
        raycaster.ray.at(4, point1);
        line.line.geometry.attributes.position.setXYZ(
          0,
          point1.x,
          point1.y,
          point1.z
        );
        line.line.geometry.attributes.position.needsUpdate = true;
      });
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
.container {
  position: relative;
  height: 100%;
}
.things {
  position: absolute;
  top: -1%;
  height: 5%;
}

#threeCanvas {
  position: absolute;
  top: 0%;
  left: 0%;
}
</style>