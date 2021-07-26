import './this.less';
const { parse } = require('rss-to-json');
let updateRSS = function () {
  return new Promise((resolve, reject) => {
    let articleList = [];
    let htmlDecode = function (text) {
      var temp = document.createElement('div');
      temp.innerHTML = text;
      var output = temp.innerText || temp.textContent;
      temp = null;
      return output;
    }
    //
    parse('https://outlooker-rssproxy.r6sg.workers.dev/ithome').then((rss) => {
      for (let item of rss.items) {
        item.html = htmlDecode(item.description)
        item.description = htmlDecode(item.html)
        articleList.push({ ...item, dataSource: 'ithome' })
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
        GData ? func(GData):""
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
