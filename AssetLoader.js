let loader = PIXI.loader;

function addAssetToLoad(name, path){
    if (resources[name]){
        // console.warn("no need to add for loading " + name + " / " + path);
        return;
    }

    loader.add(name, path);
    // console.log("add asset to load " + name + " / " + path);
}

function loadAllAssets(callback){

    // if (showLogs)
    //     console.trace("LA>>> loadAllAssets");

    loader.on('progress',function (loader, res) {
        if (showLogs)
            console.log("prog " + loader.progress);

    });

    loader.load(function(loader, res) {

        // console.log("load assets - DONE " + res.length);
        // for (let i=0; i<res.length; i++){
        //     console.log("res " + i + " / " + res[i]);
        // }
        if (showLogs)
            console.log("LA<<< loadAllAssets");

        if (callback)
            callback();
    });
}

function getResource(path){
    // console.log("getResource " + path + " / " + resources[path]);
    // console.log("-------------");
    // for(let key in resources){
    //     console.log("key= " + key); // + " / " + resources[key]);
    // }
    // console.log("-------------");
    return resources[path];
}

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            // console.log("readTextFile ok");
            // console.info(rawFile);
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}