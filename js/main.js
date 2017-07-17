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

!function ($w) {
    var config;
    var renderer;
    var rootStage;

    var txZombie;
    var txZombiesSize = 32;
    var zombies = [];
    var NUM_ZOMBIES = 100;
    var ZOMBIE_MAX_SPEED = 5;

    function setup(_config) {
        config = _config;
        renderer = new PIXI.autoDetectRenderer(config.resolution.width, config.resolution.height);
        renderer.backgroundColor = config.backgroundColor;

        $w.document.body.appendChild(renderer.view);

        rootStage = new PIXI.Container();

        txZombie = new PIXI.Texture.fromImage('img/zombie.png');
        txZombie.frame = new PIXI.Rectangle(0,0,txZombiesSize,txZombiesSize);

        build();

        return render;
    }

    function build() {
        /*var caption = new PIXI.Text('Welcome to Pixi',{'font':'20px sans-serif', 'fill':0x009900});
        caption.position.set(config.resolution.width - config.resolution.width/2,100);
        rootStage.addChild(caption);*/

        var street = new PIXI.Graphics();
        street.beginFill(0x000000);
        street.drawRect(0,200,config.resolution.width,48);
        street.endFill();

        rootStage.addChild(street);

        for(var lx = 10; lx<config.resolution.width;lx+=100)
        {
            var streetLine = new PIXI.Graphics();
            streetLine.beginFill(0xc3cb00);
            streetLine.drawRect(lx,220,50,10);
            streetLine.endFill();

            rootStage.addChild(streetLine);
        }

        for(var i=0;i< NUM_ZOMBIES;i++)
        {
            var zombie = new PIXI.Sprite(txZombie);
            zombie.anchor.set(0.5,0.5);
            zombie.position.set(config.resolution.width*Math.random(),config.resolution.height*Math.random());
            rootStage.addChild(zombie);
            zombie.x_dir = Math.random() * 2 - 1;
            zombie.y_dir = Math.random() * 2 - 1;
            zombie.mv_speed = (Math.random()*ZOMBIE_MAX_SPEED) + 1;

            zombies.push(zombie);
        }
    }

    function update() {
        zombies.forEach(function (zed,i) {
            if (!zed) return;

            zed.position.x += zed.x_dir * zed.mv_speed;
            zed.position.y += zed.y_dir * zed.mv_speed;

            if (zed.position.x < -txZombiesSize || zed.position.y < -txZombiesSize ||
                zed.position.x > config.resolution.width + txZombiesSize ||
                zed.position.y > config.resolution.height + txZombiesSize)
            {
                rootStage.removeChild(zombies[i]);
                zombies[i].destroy();
                zombies[i] = null;
                --NUM_ZOMBIES;
            }
        });

        return NUM_ZOMBIES > 0;
    }

    function render() {
        if(!update())
        {
            console.warn("Render loop ended!");
            return;
        }
        renderer.render(rootStage);
        requestAnimationFrame(render);
    }

    $w.setup = setup;
}(this);
