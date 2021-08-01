import {
    hTmL,
    htmlDecode,
    randomData,
} from "../GlobalDataManager"
let fetchExtraData = function (url) {
    return new Promise((resolve, reject) => {
        let Fetch = (targetUrl, HTML = false) => {
            return new Promise((resolve, reject) => {
                if (typeof (localStorage.Setting_Proxy) === "string" && localStorage.Setting_Proxy.length > 1) {
                    targetUrl = localStorage.Setting_Proxy + targetUrl
                }
                fetch(targetUrl).then((data) => {
                    if (HTML) {
                        data.text().then((HTML) => {
                            let domparser = new DOMParser();
                            let artDoc = domparser.parseFromString(HTML, "text/html");
                            resolve(artDoc)
                        });
                    } else {
                        data.json().then((json) => {
                            resolve(json)
                        });
                    }
                });
            });
        }
        try {
            var thisURL = new URL(url)
        } catch (error) {
            reject(error)
            return
        }
        console.log("thisURL", thisURL)

        switch (thisURL.hostname) {
            case "www.v2ex.com":
                // https://www.v2ex.com/api/replies/show.json?topic_id=792985
                {
                    let tid = thisURL.pathname.substring(thisURL.pathname.lastIndexOf("/") + 1)
                    // tid = 781581
                    Fetch(`https://www.v2ex.com/api/replies/show.json?topic_id=${tid}`).then(data => {
                        let newList = []
                        for (let reply of data) {
                            let thisReply = {
                                title: "",
                                // content: reply.content_rendered || reply.content,
                                published: new Date(reply.last_modified || reply.created).valueOf()*1000,
                                author: reply.member.username || reply.member_id,
                                avatarUrl: reply.member.avatar_normal,
                                dataSource: "V2EX",
                            }
                            thisReply.link = thisURL.origin + thisURL.pathname
                            thisReply.html = (reply.content_rendered || reply.content)
                            thisReply.description = htmlDecode(thisReply.html)
                            thisReply.safeHTML = hTmL(thisReply.html, thisReply)
                            thisReply.id = reply.id

                            thisReply = { ...randomData(thisReply), ...thisReply }
                            delete thisReply.pubDate
                            delete thisReply.html
                            delete thisReply.isoDate
                            delete thisReply.creator
                            delete thisReply.contentSnippet
                            delete thisReply.content
                            
                            newList.push(thisReply)
                        }
                        resolve(newList)
                        console.log("newList", newList)
                    })
                }
                break;

            default:
                resolve([])
                break;
        }


    });
}

export default fetchExtraData