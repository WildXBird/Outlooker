import './this.less';
const { parse } = require('rss-to-json');
import React, { PureComponent } from 'react';
import { AutoAvatar } from '../../../components/Avatar';
import { history } from 'umi';
import { Skeleton,message } from 'antd';
import { LightButton } from '../../../components/Button';
import defaultConfig from "../../../config/default"
import fetchExtraData from "../../../components/fetchExtraData"
import { isRead } from "../../../components/GlobalDataManager"
import { LoadingOutlined } from '@ant-design/icons';

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
        fetchExtraData(url).then(arr => {
          let replies = []
          for (let item of arr) {
            replies.push(this.makeMail(item, this.state.currentArticle))
          }
          this.setState({
            replies: replies,
            fetchedExtraData: true
          })
        })
      } catch (error) {
        console.error(error)
      }
    }
    this.makeMail = (item, currentArticle = {}) => {
      let title = "出错了",
        content = "",
        infobox = "",
        loading = true
      if (typeof (item) === "object") {
        loading = false
        let buttonStyle = {
          height: '100%',
          width: '100%',
          fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons,mailIcons',
          fontSize: 16,
          verticalAlign: 'top',
          padding: 7,
          color: 'var(--themeDark)',
          paddingTop: 8,
        };
        if (typeof (item.title) === "string") {
          const openLink = () => {
            if (item.link) {
              window.open(item.link)
            } else {
              message.info(`无法打开`);

            }
          }
          title = item.title
          content = <div dangerouslySetInnerHTML={{ __html: item.safeHTML }} />
          infobox = <div className={"ViewArticle-content-infobox"}>
            <div className={"ViewArticle-content-infobox-icon"}>
              <AutoAvatar item={item} size={40} />
            </div>
            <div className={"ViewArticle-content-infobox-data"}>
              <div style={{ fontSize: 14, lineHeight: "18px" }}>{`${item.author || item.dataSource} <${item.email}>`}</div>
              <div style={{ fontSize: 12, lineHeight: "15px", marginTop: 2 }}>
                {new Date(item.published).toLocaleString('zh-CN', { weekday: "long" }).replace("星期", "周")}
                {" "}
                {new Date(item.published).toLocaleString('zh-CN', { year: "numeric", month: "numeric", day: "numeric" })}
                {" "}
                {new Date(item.published).toLocaleString('zh-CN', { hour: "numeric", minute: "numeric", hour12: false })}
                {/* {`周一 2021/7/26 19:42`} */}
              </div>
              <div style={{ fontSize: 12, lineHeight: "18px", marginTop: 2 }}>
                <span style={{ fontWeight: 600 }}>{"收件人: "}</span>
                {item.recipient || currentArticle.email || localStorage.emailAddress || defaultConfig.emailAddress}
              </div>
            </div>
            <div className={"ViewArticle-content-infobox-action"}>
              <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
                <LightButton style={buttonStyle} onClick={openLink}>{''}</LightButton>
              </div>
              <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
                <LightButton style={buttonStyle} onClick={openLink}>{''}</LightButton>
              </div>
              <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
                <LightButton style={buttonStyle} onClick={openLink}>{''}</LightButton>
              </div>
              <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
                <LightButton style={buttonStyle} onClick={openLink}>{''}</LightButton>
              </div>

            </div>
          </div>

          isRead(item.id, true)
        } else {
          console.error("item", item)
          title = "出错了"
          content = ""
          infobox = ""
        }

      }
      return {
        title,
        content,
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
      <div
        className={'ViewArticle'}
        style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
      >
        <div className={"ViewArticle-topbar"} style={{}}>
          <div className={"ViewArticle-topbar-back"}>
            <LightButton style={{ color: 'var(--neutralSecondary)' }} onClick={() => { history.push("/mail/0/inbox") }}>{''}</LightButton>
          </div>
          <div className={"ViewArticle-topbar-title"}>{loading ? "" : mainMail.title}</div>
        </div>
        <div className={"ViewArticle-contentArea"}>
          {(() => {
            if (loading) {
              return (
                <>
                  <div className={"ViewArticle-content"}>
                    <div className={"ViewArticle-content-html"} style={{ marginLeft: loading ? 0 : undefined }}>
                      <Skeleton avatar paragraph={{ rows: 6 }} />
                    </div>
                  </div>
                </>
              );
            }
            let mailList = [
              mainMail,
              ...this.state.replies,
            ]
            return Array.from(mailList).map((mail, id) => {
              return (
                <>
                  <div className={"ViewArticle-content"}>
                    {mail.infobox}
                    <div className={"ViewArticle-content-html"} style={{ marginLeft: loading ? 0 : undefined }}>
                      {mail.content}
                    </div>
                  </div>
                </>

              );
            })
          })()}
          <div style={{ marginRight: 20, display: this.state.fetchedExtraData ? "none" : "flex", justifyContent: "flex-end", paddingRight: 5,height:22 }}>
            <div style={{height:28,width:18}}>
            <LoadingOutlined style={{ fontSize: 18 }} spin />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
export default ViewArticle;
