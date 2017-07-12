//https://github.com/kittykatattack/learningPixi

/*function  startLoading() {
    loadContainer();
    loadAssets();
}

function onAssetsLoaded(){

}

function  loadContainer() {
    var type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
    }

    PIXI.utils.sayHello(type);

    //Create the renderer
    var renderer = PIXI.autoDetectRenderer(256, 256);

    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    renderer.view.style.border = "1px solid black";
    renderer.backgroundColor = 0x061639;
    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    //Create a container object called the `stage`
    var stage = new PIXI.Container();

    //Tell the `renderer` to `render` the `stage`
    renderer.render(stage);
}*/

!function($w) {
    var config;
    var renderer;
    var rootStage;
    function setup(_config) {
        config = _config;
        renderer = new PIXI.autoDetectRenderer(config.resolution.width, config.resolution.height);
        renderer.backgroundColor = config.backgroundColor;

        $w.document.body.appendChild(renderer.view);

        rootStage = new PIXI.Container();

        build();

        return render;
    }

    function build() {
        var caption = new PIXI.Text('Welcome to Pixi',{'font':'20px sans-serif', 'fill':0x009900});
        caption.position.set(config.resolution.width - config.resolution.width/2,100);
        rootStage.addChild(caption);
    }

    function render() {
        renderer.render(rootStage);
        requestAnimationFrame(render);
    }

    $w.setup = setup;
}(this);
