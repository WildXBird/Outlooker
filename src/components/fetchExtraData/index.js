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
            resolve([])
            return
        }
        let minuteId = new Date().toLocaleString('zh-CN', { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hour12: false })
        switch (thisURL.hostname) {
            case "www.v2ex.com":
                // https://www.v2ex.com/api/replies/show.json?topic_id=792985
                {
                    let tid = thisURL.pathname.substring(thisURL.pathname.lastIndexOf("/") + 1)
                    // tid = 781581
                    Fetch(`https://www.v2ex.com/api/replies/show.json?topic_id=${tid}&ts=${minuteId}`).then(data => {
                        let newList = []
                        for (let reply of data) {
                            let thisReply = {
                                title: "",
                                // content: reply.content_rendered || reply.content,
                                published: new Date(reply.last_modified || reply.created).valueOf() * 1000,
                                author: reply.member.username || reply.member_id,
                                avatarUrl: reply.member.avatar_normal,
                                dataSource: "V2EX",
                            }
                            thisReply.link = thisURL.origin + thisURL.pathname
                            thisReply.html = (reply.content_rendered || reply.content)
                            thisReply.description = htmlDecode(thisReply.html)
                            thisReply.safeHTML = hTmL(thisReply.html, thisReply)
                            thisReply.id = reply.id

                            if (typeof (thisReply.avatarUrl) === "string") {
                                thisReply.avatarUrl = thisReply.avatarUrl.replace("_mini.png", "_large.png")
                            }


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
            case "www.ithome.com":
                // https://www.ithome.com/0/566/640.htm
                {
                    let tid = parseInt(thisURL.pathname.replaceAll("/", "").replace(".html", "").replace(".htm", ""))
                    // tid = 566640
                    Fetch(`https://m.ithome.com/html/${tid}.htm`, true).then(data => {
                        let scripts = data.getElementsByTagName("script")
                        for (let script of scripts) {
                            let innerHTML = script.innerHTML
                            if (innerHTML.indexOf("NewsIDDes") != -1) {
                                innerHTML = innerHTML.substring(innerHTML.indexOf("NewsIDDes"))
                                innerHTML = innerHTML.substring(innerHTML.indexOf(`"`) + 1)
                                let NID = innerHTML.substring(0, innerHTML.indexOf(`"`))
                                Fetch(`https://m.ithome.com/api/comment/newscommentlistget?NewsID=${NID}`).then(newscommentlist => {
                                    console.log("newscommentlist", newscommentlist)
                                    let newList = []
                                    try {
                                        for (let comment of newscommentlist.Result.Clist) {
                                            try {
                                                let reply = comment.M
                                                let thisReply = {
                                                    title: "",
                                                    published: new Date(reply.T).valueOf(),
                                                    author: reply.N,
                                                    avatarUrl: reply.HeadImg,
                                                    dataSource: "IT之家",
                                                }
                                                thisReply.link = reply.UserIndexUrl
                                                thisReply.html = reply.C
                                                thisReply.description = reply.C
                                                thisReply.safeHTML = reply.C
                                                thisReply.id = reply.Ci
                                                thisReply.creator = String(reply.Ui)

                                                thisReply = { ...randomData(thisReply), ...thisReply }
                                                delete thisReply.pubDate
                                                delete thisReply.html
                                                delete thisReply.isoDate
                                                delete thisReply.creator
                                                delete thisReply.contentSnippet
                                                delete thisReply.content

                                                newList.push(thisReply)

                                                if (Array.isArray(comment.R)) {
                                                    for (let commentR of comment.R) {
                                                        try {

                                                            if (!commentR.C.startsWith("回复")) {
                                                                commentR.C = `@${thisReply.author} ` + commentR.C

                                                            }

                                                            let thisCommentR = {
                                                                title: "",
                                                                published: new Date(commentR.T).valueOf(),
                                                                author: commentR.N,
                                                                avatarUrl: commentR.HeadImg,
                                                                dataSource: "IT之家",
                                                            }
                                                            thisCommentR.link = commentR.UserIndexUrl
                                                            thisCommentR.html = commentR.C
                                                            thisCommentR.description = commentR.C
                                                            thisCommentR.safeHTML = commentR.C
                                                            thisCommentR.id = commentR.Ci
                                                            thisCommentR.creator = String(commentR.Ui)
                                                            thisCommentR.recipient = thisReply.email

                                                            thisCommentR = { ...randomData(thisCommentR), ...thisCommentR }
                                                            delete thisCommentR.pubDate
                                                            delete thisCommentR.html
                                                            delete thisCommentR.isoDate
                                                            delete thisCommentR.creator
                                                            delete thisCommentR.contentSnippet
                                                            delete thisCommentR.content

                                                            newList.push(thisCommentR)
                                                        } catch (error) { }
                                                    }

                                                }
                                            } catch (error) { }
                                        }
                                    } catch (error) { }

                                    resolve(newList)
                                    console.log("newList", newList)
                                    return

                                })
                                break
                            }

                        }
                        console.log("htmlText", data)
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