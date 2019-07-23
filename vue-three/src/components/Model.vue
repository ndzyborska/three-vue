<template>
  <div>
    <div id="container" style="position: relative;">
      <Gague id="things"></Gague>
    </div>
  </div>
</template>
<script>
import Gague from "./Gague.vue";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
var camera;
var renderer;
var scene;
var sceneOrtho;
var cameraOrtho;
var line;
var topRightPos;
var mapC;
var spriteBL, spriteBR, spriteTL, spriteTR;
var group;

export default {
  name: "ThreeTest",
  components: {
    Gague: Gague
  },
  data() {
    var width = 750;
    var height = 500;
    return {
      width,
      height
    };
  },
  mounted: function() {},
  methods: {
    init: function() {
      var width = 700;
      var height = 500;
      camera = new THREE.PerspectiveCamera(60, width / height, 1, 2100);
      camera.position.z = 115;

      scene = new THREE.Scene();
      scene.background = new THREE.Color("gray");

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
        });
      });

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(this.width, this.height);
      renderer.autoClear = false;
      document.getElementById("container").appendChild(renderer.domElement);

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
      var mesh = group.children[12];

      mesh.geometry.computeBoundingBox();
      var center = new THREE.Vector3();
      mesh.geometry.boundingBox.getCenter(center);
      mesh.geometry.center();
      mesh.position.copy(center);
    },

    animate: function() {
      var point2 = new THREE.Vector3();
      requestAnimationFrame(this.animate);

      point2 = group.children[12].position;

      line.geometry.attributes.position.setXYZ(1, point2.x, point2.y, point2.z);

      line.geometry.attributes.position.needsUpdate = true;

      renderer.clear();
      renderer.render(scene, camera);
      renderer.clearDepth();
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>

<style scoped>
#things {
  /* width: 100px;
  height: 100px; */
  position: absolute;
  /* top: 90%;
  left: 90%; */
}
html,
body {
  margin: 0;
  height: 100%;
  margin: 0;
  overflow: hidden;
}
#c {
  width: 80vw;
  height: 80vh;
  display: block;
}
</style>