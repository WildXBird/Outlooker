import './this.less';
const { parse } = require('rss-to-json');
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
    let hTmL = (htmlInput = "") => {
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
              if (node.attributes.src && node.attributes.src.value.indexOf("/") == 0) {
                node.src = "null"
              } else {
                if (typeof (localStorage.Setting_Proxy) === "string" && localStorage.Setting_Proxy.length > 1) {
                  if (node.attributes.src) {
                    node.src = `${localStorage.Setting_Proxy}${node.attributes.src.value}`
                  }
                }
              }
              break;
            case "A":
              node.target = "_blank"
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
      let link = item.link || ""
      let url = new URL(link)
      let hostname = url.hostname
      if (hostname.startsWith("www.")) {
        hostname = hostname.replace("www.", "")
      }
      let email = "no-reply@" + hostname
      return {
        email,
      }
    }
    //
    parse('https://outlooker-rssproxy.r6sg.workers.dev/ithome').then((rss) => {
      for (let item of rss.items) {
        item.html = htmlDecode(item.description)
        item.description = htmlDecode(item.html)
        item.safeHTML = hTmL(item.html)
        item = { ...randomData(item), ...item }

        articleList.push({ ...item, dataSource: 'IT之家' })
      }
      resolve(articleList)
    });
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
