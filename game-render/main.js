//import * as BABYLON from '@babylonjs/core';
import { Scene, Engine, HemisphericLight, Color3, Color4, MeshBuilder, StandardMaterial, FreeCamera, Vector3 } from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas');

window.addEventListener("resize", function () {
  engine.resize();
});

const engine = new Engine(canvas, true);

const createScene = () => {
    const scene = new Scene(engine);
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    camera.attachControl(canvas, true);
    scene.clearColor = new Color4(0, 0, 0, 0); // Transparent background

    const light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    // Create a simple sphere
    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    const box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    const material = new StandardMaterial("mat", scene);
    material.diffuseColor = new Color3(1, 0, 0);
    sphere.material = material;
    scene.onBeforeRenderObservable.add(() => {
        sphere.position = new Vector3(Math.sin(Date.now() / 1000) * 5, 0, 0);
    })

    return scene;
};

const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
