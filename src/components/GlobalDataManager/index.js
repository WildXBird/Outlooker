import './this.less';
import defaultConfig from "../../config/default"
import { message } from 'antd';
import Nprogress from 'nprogress'
import "../nprogress.less"


// const { parse } = require('rss-to-json');
let Parser = require('rss-parser');
let hTmL = (htmlInput = "", item) => {
  let domparser = new DOMParser();
  let artDoc = domparser.parseFromString(htmlInput, "text/html");
  let DOMRemove = [];
  let treeWalker = document.createTreeWalker(artDoc);
  while (treeWalker.nextNode()) {
    let node = treeWalker.currentNode;
    if (node.nodeType == Node.COMMENT_NODE) {
      DOMRemove.push(node);
    } try {
      switch (node.tagName) {
        case "IMG":
          if (node.attributes.src && !node.attributes.src.value.startsWith("//") && node.attributes.src.value.startsWith("/")) {
            node.src = "null"
          } else {
            if (node.attributes.src.value.startsWith("//")) {
              node.src = "https:" + node.attributes.src.value
            }
            try {
              let url = new URL(node.attributes.src.value)
              if (url.protocol !== "http:" && url.protocol !== "https:") {
                let attributes = node.attributes
                for (let item of attributes) {
                  try {
                    let url = new URL(item.value)
                    if (url.protocol == "https:") {
                      node.src = url.href
                    }
                  } catch (error) { }
                }
              }
            } catch (error) { }


            let needProxy = false
            try {
              let url = new URL(node.src)

              if (url.protocol == "http:") {
                needProxy = true
              }
            } catch (error) { }
            ///
            node.loading = "lazy"
            if (localStorage.forceImgProxy === "true" || needProxy) {
              node.referrerPolicy = "origin"
              if (typeof (localStorage.Setting_Proxy) === "string" && localStorage.Setting_Proxy.length > 1) {
                if (node.attributes.src.value) {
                  node.src = `${localStorage.Setting_Proxy}${node.attributes.src.value}`
                }
              } else {
                if (node.attributes.src.value) {
                  node.src = `${defaultConfig.Setting_Proxy}${node.attributes.src.value}`
                }
              }
            } else {
              node.referrerPolicy = "no-referrer"
            }
            node.removeAttribute("height")
            node.removeAttribute("width")
          }
          break;
        case "A":
          node.target = "_blank"
          if (node.attributes.href.value.startsWith("/")) {
            if (item.link) {
              try {
                let origin = new URL(item.link).origin
                node.href = origin + node.attributes.href.value
              } catch (error) {
                node.href = ""
              }
            } else {
              node.href = ""
            }
          }


          break;
        case "SCRIPT":
        // case "IFRAME":
        case "STYLE":
        case "LINK":
        case "META":
          DOMRemove.push(node);
        default:
          break;
      }
    } catch (error) {
      console.error(error)
    }

  }
  DOMRemove.forEach(function (node) {
    node.parentNode.removeChild(node);
  });
  let safeHTML = artDoc.getElementsByTagName("body")[0].innerHTML
  return safeHTML
}
let htmlDecode = function (text) {
  let domparser = new DOMParser();
  let virtualDocument = domparser.parseFromString("", "text/html");
  var temp = virtualDocument.createElement('div');
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}
let randomData = (item) => {
  let username = "anonymous"
  let hostname = "brokendreams.cloud"
  if (item.author || item.creator) {
    username = String(item.creator || item.author).toLowerCase()
  }
  try {
    btoa(username)
  } catch (error) {
    username = "no-reply"
  }
  try {
    let link = item.link || ""
    let url = new URL(link)
    hostname = url.hostname
    if (hostname.startsWith("www.")) {
      hostname = hostname.replace("www.", "")
    }
  } catch (error) { }




  let email = username + "@" + hostname
  return {
    email,
  }
}
let getDataDiskSize = function () {
  let size = 0;
  for (let item in localStorage) {
    if (window.localStorage.hasOwnProperty(item)) {
      size += window.localStorage.getItem(item).length;
    }
  }
  return (size / 1024).toFixed(0)
}
let updateRSS = function () {
  message.info(`Outlooker 已使用 ${getDataDiskSize()}KB 的空间`);
  if (typeof (localStorage.RSSList) != "string") {
    localStorage.RSSList = JSON.stringify([
      // { name: "Outlooker更新日志", rss: 'https://github.com/WildXBird/Outlooker/releases.atom', icon: "https://github.githubassets.com/pinned-octocat.svg", deleteable: false },
      { name: "IT之家", rss: 'https://www.ithome.com/rss/', icon: "https://www.ithome.com/img/t.png", deleteable: false },
      { name: "V2EX", rss: "https://www.v2ex.com/index.xml", icon: "https://www.v2ex.com/static/icon-192.png", deleteable: false },
      { name: "GCORES", rss: "https://rss.mifaw.com/articles/5c8bb11a3c41f61efd36683e/5e305f9817d09d44934437c3", disabled: true },
    ])
  }
  try {
    // if (Number(localStorage.ver) < 0.2) {
    (function () {
      let rss = "https://github.com/WildXBird/Outlooker/releases.atom"
      let currentRSSList = JSON.parse(localStorage.RSSList)
      for (let item of currentRSSList) {
        // console.log(item.rss == rss,"item",item)
        if (item.rss == rss) {
          return
        }
      }
      currentRSSList.push({ name: "Outlooker更新", rss, icon: "https://github.githubassets.com/pinned-octocat.svg", deleteable: false })
      localStorage.RSSList = JSON.stringify(currentRSSList)
    })()
    // }
  } catch (error) {
    console.debug(error)
  }
  let RSSList = JSON.parse(localStorage.RSSList)


  return new Promise((resolve, reject) => {
    // if ((new Date().valueOf() - new Date(localStorage.lastUpdateTime).valueOf()) < (localStorage.updateGap || 5 * 60 * 1000)) {
    //   try {
    //     message.info("当前内容来自缓存");
    //     resolve(JSON.parse(localStorage.articleCache))
    //     return
    //   } catch (error) { }
    // }
    Nprogress.start()
    let eachProgessCent = 1 / RSSList.length
    let progress = 0
    let promiseList = []
    for (let Subscription of RSSList) {
      if (Subscription.disabled) { continue }
      promiseList.push(new Promise((resolve, reject) => {
        let articleList = [];
        let parser = new Parser();
        let rssLink = Subscription.rss
        if (typeof (localStorage.Setting_Proxy) === "string" && localStorage.Setting_Proxy.length > 1) {
          rssLink = localStorage.Setting_Proxy + rssLink
        }
        parser.parseURL(rssLink).then((rss) => {
          for (let item of rss.items) {
            item.published = new Date(item.pubDate).valueOf()
            item.html = (item.content || item.description)
            item.description = htmlDecode(item.html)
            item.safeHTML = hTmL(item.html, item)
            item.id = item.id || item.link || item.title + (item.published) || String(Math.random())
            //作者相关
            item.dataSource = Subscription.name
            item.author = item.author || item.creator || Subscription.name
            item.avatarUrl = Subscription.icon
            //清理
            delete item.pubDate
            delete item.html
            delete item.isoDate
            delete item.creator
            delete item.contentSnippet
            delete item.content
            item = { ...randomData(item), ...item }
            articleList.push({ ...item })
          }
          resolve(articleList)
          progress += eachProgessCent
          Nprogress.set(progress)
        }).catch((error) => {
          console.error(error)
          if (typeof (item) === "object") {
            message.error("无法下载：" + (item.name || item.rss || "错误源"));
          } else {
            message.error("无法下载数据");
          }

        })

      }))
    }
    Promise.all(promiseList).then((values) => {
      let allArticles = []
      for (let arr of values) {
        allArticles = allArticles.concat(arr);
      }
      allArticles.sort((x, y) => {
        return y.published - x.published;
      })
      resolve(allArticles)
      Nprogress.set(1)
      localStorage.lastUpdateTime = new Date().toISOString()
      localStorage.articleCache = JSON.stringify(allArticles)



      // console.log("allArticles", allArticles);

    });
  });
}
let GlobalDataManager = function GlobalDataManager(props) {
  let GThis = globalThis || global || window
  if (GThis.GlobalDataManagerReady) {
    return ""
  }
  GThis.GlobalDataManagerReady = true
  localStorage.ver = 0.2
  localStorage.ver = 0.1
  ///代理
  if (typeof (localStorage.Setting_Proxy) === "undefined") {
    localStorage.Setting_Proxy = defaultConfig.Setting_Proxy
  }
  ///
  let GData = undefined
  if (typeof GThis["addDataListener"] === "undefined") {
    GThis.globalDataListener = []
    GThis.addDataListener = (func) => {
      if (typeof (func) === "function") {
        GThis.globalDataListener.push(func)
        GData ? func(GData) : ""
        return true
      }
      return false
    }
    GThis.removeDataListener = (func) => {
      let newGlobalDataListener = []
      for (let item of GThis.globalDataListener) {
        if (item !== func) {
          newGlobalDataListener.push(item)
        }
      }
      GThis.globalDataListener = newGlobalDataListener
      return true
    }
  }
  let trigger = () => {
    updateRSS().then((data) => {
      // console.log("data", data)
      GData = data
      for (let func of GThis.globalDataListener) {
        func(GData)
      }
    })
  }
  trigger()
  addDataListener(() => {
    console.log("data updated")
  })
  return ""
};


let isRead = function (rssId, add = false) {
  try {
    let history = JSON.parse(localStorage.readHistory)
    if (add) {
      history.unshift({ id: rssId, time: new Date().toISOString() })
      while (history.length > 1000) {
        history.pop()
      }
      localStorage.readHistory = JSON.stringify(history)
    } else {
      for (let item of history) {
        if (item.id === rssId) {
          return true
        }
      }
    }

  } catch (error) {
    if (typeof (localStorage.readHistory) === "string" && localStorage.readHistory.length > 1) {
      localStorage["readHistory_backup_" + new Date().toISOString()] = localStorage.readHistory
      localStorage.readHistory = "[]"
    } else {
      localStorage.readHistory = "[]"
    }
  }
  return false
}
export {
  GlobalDataManager,
  hTmL,
  htmlDecode,
  randomData,
  isRead,
};
