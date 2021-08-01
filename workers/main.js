addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});

let proxy = function (targetUrl, origin) {
    return new Promise((resolve, reject) => {
        console.log("targetUrl", targetUrl)
        let AccessControlAllowOrigin = origin ? { "Access-Control-Allow-Origin": origin } : {}
        fetch(targetUrl).then((data) => {
            data.arrayBuffer().then((bodyArrayBuffer) => {
                var uint8View = new Uint8Array(bodyArrayBuffer);
                resolve({
                    code: data.status,
                    headers: {
                        ...data.headers,
                        ...AccessControlAllowOrigin,
                    },
                    data: uint8View
                })
            })
        });
    })
}
async function handleRequest(request) {
    let whiteList = [
        "http://localhost:9000",
        "http://reader.brokendreams.cloud",
        "https://reader.brokendreams.cloud",
    ]
    let referer = request.headers.get('referer') || ""
    let origin = request.headers.get('origin') || ""
    let allow = false
    for (let item of whiteList) {
        if (referer.startsWith(item)) {
            allow = true
            break
        }
    }
    if (!allow) {
        throw 404
    }
    let pathname = request.url
    pathname = pathname.substring(pathname.indexOf("//") + 2)
    pathname = pathname.substring(pathname.indexOf("/"))

    if (pathname.startsWith("/-----")) {
        let target = pathname.replace("/-----", "")
        let data = await proxy(target, origin)
        return new Response(data.data, { status: data.code, headers: data.headers });
    } else {
        return new Response("", { status: 404 })
    }
}