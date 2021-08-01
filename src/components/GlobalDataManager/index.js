import './this.less';
import defaultConfig from "../../config/default"

// const { parse } = require('rss-to-json');
let Parser = require('rss-parser');

let updateRSS = function () {
  return new Promise((resolve, reject) => {
    let articleList = [];
    let htmlDecode = function (text) {
      let domparser = new DOMParser();
      let virtualDocument = domparser.parseFromString("", "text/html");
      var temp = virtualDocument.createElement('div');
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    }
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
                if (typeof (localStorage.Setting_Proxy) === "string" && localStorage.Setting_Proxy.length > 1) {
                  if (node.attributes.src.value) {
                    node.src = `${localStorage.Setting_Proxy}${node.attributes.src.value}`
                  }
                } else {
                  if (node.attributes.src.value) {
                    node.src = `${defaultConfig.Setting_Proxy}${node.attributes.src.value}`
                  }

                }
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
            case "IFRAME":
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
    let randomData = (item) => {
      let username = "anonymous"
      let hostname = "brokendreams.cloud"
      if (item.author || item.creator) {
        username = (item.author || item.creator).toLowerCase()
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
    //
    // parse('https://outlooker-rssproxy.r6sg.workers.dev/ithome').then((rss) => {
    let parser = new Parser();
    // parser.parseURL('https://outlooker-rssproxy.r6sg.workers.dev/v2ex').then((rss) => {

    let rssLink = "https://rss.mifaw.com/articles/5c8bb11a3c41f61efd36683e/5c923e953882afa09dff573a"
    rssLink = "https://outlooker-rssproxy.r6sg.workers.dev/v2ex"
    if (typeof (localStorage.Setting_Proxy) === "string" && localStorage.Setting_Proxy.length > 1) {
      rssLink = localStorage.Setting_Proxy + rssLink
    }
    parser.parseURL(rssLink).then((rss) => {
      console.debug("rss", rss)
      for (let item of rss.items) {
        item.published = new Date(item.pubDate).valueOf()
        // item.html = htmlDecode(item.content || item.description)
        item.html = (item.content || item.description)
        item.description = htmlDecode(item.html)
        item.safeHTML = hTmL(item.html, item)
        //作者相关
        item.dataSource = item.author || item.creator || "V2EX"


        item = { ...randomData(item), ...item }

        articleList.push({ ...item })
      }
      resolve(articleList)
    });

    // parse('https://outlooker-rssproxy.r6sg.workers.dev/v2ex').then((rss) => {
    //   console.debug("rss",rss)
    //   for (let item of rss.items) {
    //     item.html = htmlDecode(item.description)
    //     item.description = htmlDecode(item.html)
    //     item.safeHTML = hTmL(item.html)
    //     item = { ...randomData(item), ...item }

    //     articleList.push({ ...item, dataSource: 'IT之家' })
    //   }
    //   resolve(articleList)
    // });
  });
}
let GlobalDataManager = function GlobalDataManager(props) {
  let GThis = globalThis || global || window
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
      console.log("data", data)
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

export default GlobalDataManager;
