function Scene(id, elem, settings) {
    this.id = id;

    this.scene = new THREE.Scene();

    this.fov = (settings.fov) ? settings.fov : 45;
    this.aspect = (settings.aspect) ? settings.aspect : 2;
    this.near = (settings.near) ? settings.near : 0.1;
    this.far = (settings.far) ? settings.far : 5;

    this.camera = settings.camera || new Camera("camera" + this.id, this.fov, this.aspect, this.near, this.far);

    this.lights = [
        new Light("MENU1", "#fff", 10)
    ];
}

Scene.prototype.init = function() {
    
};

function Light(id, color, intensity) {
    this.id = id;
    this.source = new THREE.DirectionalLight(color, intensity);

    return this.source;
}

function Camera(id, fov, aspect, near, far) {
    this.id = id;
    const c = new THREE.PerspectiveCamera(fov, aspect, near, far);
    c.position.z = 2;
    c.position.set(0, 1, 2);
    c.lookAt(0, 0, 0);

    return c;
}