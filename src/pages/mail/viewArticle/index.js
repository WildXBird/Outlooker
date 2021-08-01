import './this.less';
const { parse } = require('rss-to-json');
import React, { PureComponent } from 'react';
import { AutoAvatar } from '../../../components/Avatar';
// import { LightButton } from '../../components/Button';
import { history } from 'umi';
import { Skeleton } from 'antd';
import { LightButton } from '../../../components/Button';
import defaultConfig from "../../../config/default"
import fetchExtraData from "../../../components/fetchExtraData"

class ViewArticle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
      replies: [],
    };
    this.onClick = () => { };
    this.fetchExtra = (url) => {
      if (url === this.currentFetchingUrl) {
        return
      }
      this.currentFetchingUrl = url
      try {
        console.log("fetchExtra", url)
        fetchExtraData(url)
      } catch (error) {
        console.error(error)
      }
    }
    this.makeMail = (item) => {
      let title = "出错了",
        content = "",
        currentItem = {},
        infobox = "",
        loading = true
      if (typeof (item) === "object") {
        loading = false
        if (typeof (item.title) === "string") {
          title = item.title
          content = <div dangerouslySetInnerHTML={{ __html: item.safeHTML }} />
          currentItem = item
          infobox = <div className={"ViewArticle-content-infobox"}>
            <div className={"ViewArticle-content-infobox-icon"}>
              <AutoAvatar item={currentItem} size={40} />
            </div>
            <div className={"ViewArticle-content-infobox-data"}>
              <div style={{ fontSize: 14, lineHeight: "18px" }}>{`${currentItem.dataSource} <${currentItem.email}>`}</div>
              <div style={{ fontSize: 12, lineHeight: "15px", marginTop: 2 }}>
                {new Date(currentItem.published).toLocaleString('zh-CN', { weekday: "long" }).replace("星期", "周")}
                {" "}
                {new Date(currentItem.published).toLocaleString('zh-CN', { year: "numeric", month: "numeric", day: "numeric" })}
                {" "}
                {new Date(currentItem.published).toLocaleString('zh-CN', { hour: "numeric", minute: "numeric", hour12: false })}
                {/* {`周一 2021/7/26 19:42`} */}
              </div>
              <div style={{ fontSize: 12, lineHeight: "18px", marginTop: 2 }}>
                <span style={{ fontWeight: 600 }}>{"收件人: "}</span>
                {localStorage.emailAddress || defaultConfig.emailAddress}
              </div>
            </div>
            <div className={"ViewArticle-content-infobox-action"}>
            </div>
          </div>
        } else {
          console.error("item", item)
          title = "出错了"
          content = ""
          currentItem = {}
          infobox = ""
        }

      }
      return {
        title,
        content,
        currentItem,
        infobox,
        loading
      }
    }
  }
  componentDidUpdate() {
    if (typeof (this.state.currentArticle) === "object") {
      if (typeof (this.state.currentArticle.link) === "string" && this.state.currentArticle.link.length > 1) {
        this.fetchExtra(this.state.currentArticle.link)
      }
    }
  }
  componentDidMount() {
    let Fthis = this;
    let articleList = this.state.articleList;
    this.globalDataUpdater = function (data) {
      let contentPseudoHash = history.location.pathname.split("/")[5]
      try {
        let contentLink = decodeURI(atob(contentPseudoHash));
        let currentArticle = { 404: true }
        for (let item of data) {
          if (contentLink === item.link) {
            currentArticle = item
          }
        }
        Fthis.setState({ articleList: data, currentArticle, ts: Math.random() });
      } catch (error) {

      }
    }
    addDataListener(this.globalDataUpdater)
    if (typeof (this.state.currentArticle) === "object") {
      if (typeof (this.state.currentArticle.link) === "string" && this.state.currentArticle.link.length > 1) {
        this.fetchExtra(this.state.currentArticle.link)
      }
    }
  }
  render() {

    let mainMail = this.makeMail(this.state.currentArticle)
    // let loading = mainMail.loading
    let loading = !this.state.currentArticle
    let title = ""
    let content = <Skeleton avatar paragraph={{ rows: 6 }} />
    let currentItem = {}
    let infobox = ""

    return <div
      className={'ViewArticle'}
      style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
    >
      {(() => {
        if (loading) {
          return (
            <div
              key={"loading"}
              className={'ViewArticle'}
              style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
            >
              <div className={"ViewArticle-topbar"} style={{}}>
                <div className={"ViewArticle-topbar-back"}>
                  <LightButton style={{ color: 'var(--neutralSecondary)' }} onClick={() => { history.push("/mail/0/inbox") }}>{''}</LightButton>
                </div>
                <div className={"ViewArticle-topbar-title"}></div>
              </div>
              <div className={"ViewArticle-content"}>
                <div className={"ViewArticle-content-html"} style={{ marginLeft: loading ? 0 : undefined }}>
                  <Skeleton avatar paragraph={{ rows: 6 }} />
                </div>
              </div>
            </div>
          );
        }


        return Array.from([
          mainMail,
        ]).map((mail, id) => {
          return (
            <div
              key={id}
              className={'ViewArticle'}
              style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
            >
              <div className={"ViewArticle-topbar"} style={{}}>
                <div className={"ViewArticle-topbar-back"}>
                  <LightButton style={{ color: 'var(--neutralSecondary)' }} onClick={() => { history.push("/mail/0/inbox") }}>{''}</LightButton>
                </div>
                <div className={"ViewArticle-topbar-title"}>{mail.title}</div>
              </div>
              <div className={"ViewArticle-content"} style={{}}>
                {mail.infobox}
                <div className={"ViewArticle-content-html"} style={{ marginLeft: loading ? 0 : undefined }}>
                  {mail.content}
                </div>
              </div>
            </div>
          );
        })
      })()}
    </div>
    // return (
    //   <div
    //     className={'ViewArticle'}
    //     style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
    //   >
    //     <div className={"ViewArticle-topbar"} style={{}}>
    //       <div className={"ViewArticle-topbar-back"}>
    //         <LightButton style={{ color: 'var(--neutralSecondary)' }} onClick={() => {
    //           history.push("/mail/0/inbox")
    //         }}>{''}</LightButton>


    //       </div>
    //       <div className={"ViewArticle-topbar-title"}>{title}</div>
    //     </div>
    //     <div className={"ViewArticle-content"} style={{}}>
    //       {infobox}
    //       <div className={"ViewArticle-content-html"} style={{ marginLeft: loading ? 0 : undefined }}>
    //         {content}
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}
export default ViewArticle;
