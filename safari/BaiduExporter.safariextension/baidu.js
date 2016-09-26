function onload(func) {
    if (document.readyState === "complete") {
        func();
    } else {
        window.addEventListener("load", func);
    }
}

function addJS(name) {
    var addedScript = document.createElement("script");
    addedScript.src = safari.extension.baseURI + name + '.js';
    (document.body || document.head || document.documentElement).appendChild(addedScript);
}

onload(function () {
    //把函数注入到页面中
    var isHome = window.location.href.indexOf("/disk/home") != -1 ? true : false;
    var isAlbum = window.location.href.indexOf("/pcloud/album/") != -1 ? true : false;
    var isNewVersion = document.querySelector("link[rel='shortcut icon']").href != "http://pan.baidu.com/res/static/images/favicon.ico" ? true : false;

    addJS("connect");
    addJS("core");

    if (isHome) {
        if (isNewVersion) {
            addJS("home");
        } else {
            addJS("oldhome");
        }
    } else {
        if (isAlbum) {
            addJS("album");
        } else {
            addJS("share");
            addJS("convert");
        }
    }
});

function saveSyncData(data, value) {
    var obj = new Object();
    obj[data] = value;
}

window.addEventListener("message", function (event) {
    if (event.source != window) {
        return;
    }

    if (event.data.type && (event.data.type == "config_data")) {
        for (var key in event.data.data) {
            localStorage.setItem(key, event.data.data[key]);
            saveSyncData(key, event.data.data[key]);
        }
    }
}, false);
