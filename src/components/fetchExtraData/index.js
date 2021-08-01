let fetchExtraData = function (url) {
    if (typeof (localStorage.Setting_Proxy) === "string" && localStorage.Setting_Proxy.length > 1) {
        url = localStorage.Setting_Proxy + url
    }
    fetch(url).then((data) => {
        data.text().then((HTML) => {
            // console.log("HTML", HTML)
            let domparser = new DOMParser();
            let artDoc = domparser.parseFromString(HTML, "text/html");
            console.log("artDoc",artDoc)
        });
    });
}

export default fetchExtraData