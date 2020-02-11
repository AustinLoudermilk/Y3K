function Scene(id, elem, settings) {
    this.id = id;

    this.elem = elem;

    this.scene = new THREE.Scene();

    this.fov = (settings.fov) ? settings.fov : 45;
    this.aspect = (settings.aspect) ? settings.aspect : 2;
    this.near = (settings.near) ? settings.near : 0.1;
    this.far = (settings.far) ? settings.far : 5;

    this.camera = settings.camera || new sCamera("cam" + this.id, this.fov, this.aspect, this.near, this.far);

    this.lights = [ ];

    this.renderSceneInfo = function(sceneInfo, renderer) {
        const {scene, camera, elem} = sceneInfo;
        //log(scene, camera, elem);
        //log(sceneInfo);
       
        const isOffscreen =
            bottom < 0 ||
            top > renderer.domElement.clientHeight ||
            right < 0 ||
            left > renderer.domElement.clientWidth;
       
        if (isOffscreen) {
          return;
        }
       
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
       
        return { scene, camera };
    }.bind(this);
}

Scene.prototype.init = function() {

};

Scene.prototype.loader = function() {

};

function Light(id, color, intensity) {
    this.id = id;
    this.source = new THREE.DirectionalLight(color, intensity);

    return this.source;
}

function sCamera(id, fov, aspect, near, far) {
    this.id = id;
    this.aspect = aspect;
    const c = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //c.position.z = 2;
    //c.position.set(0, 1, 2);
    //c.lookAt(0, 0, 0);

    return c;
}