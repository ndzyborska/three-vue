<template>
  <div id="container">
    <img src="../assets/logo.png" />
  </div>
</template>
<script>
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  name: "ThreeTest",
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      group: null
    };
  },
  methods: {
    init: function() {
      var width = window.innerWidth;
      var height = window.innerHeight;
      this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 2100);
      this.camera.position.z = 115;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("gray");

      var light = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(light);

      var mtlLoader = new MTLLoader();
      mtlLoader.load("../assets/basic.mtl", function(materials) {
        materials.preload();

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("../assets/basic.obj", function(object) {
          this.group = object.clone();
          this.scene.add(this.group);
        });
      });
      // this.scene.add(this.group);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.autoClear = false;
      document.body.appendChild(this.renderer.domElement);

      var controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enableDamping = true;
      controls.campingFactor = 0.25;
      controls.enableZoom = true;

      const animate = function() {};
    },
    animate: function() {
      requestAnimationFrame(this.animate);

      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>