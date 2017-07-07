/**
 * Created by Abhilash K on 7/7/2017.
 */

function loadAssets(){
    PIXI.loader
        .add("img/bg.png")
        .load(onAssetsAdded);
}

function onAssetsAdded() {
    var bg = new PIXI.Sprite(
        PIXI.loader.resources["img/bg.png"].texture
    );
    onAssetsLoaded();
}
