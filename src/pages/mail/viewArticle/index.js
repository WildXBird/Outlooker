import './this.less';
const { parse } = require('rss-to-json');
import React, { PureComponent } from 'react';
// import { AutoAvatar } from '../../components/Avatar';
// import { LightButton } from '../../components/Button';
import { history } from 'umi';
import { Skeleton } from 'antd';


class ViewArticle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
    };
    this.onClick = () => { };
  }
  componentDidMount() {
    let Fthis = this;
    let articleList = this.state.articleList;
    this.globalDataUpdater = function (data) {
      let contentPseudoHash = history.location.pathname.split("/")[5]
      // let contentUrl =btoa(encodeURI(item.link));
      let contentLink = decodeURI(atob(contentPseudoHash));
      let currentArticle = {}
      for (let item of data) {
        if (contentLink === item.link) {
          currentArticle = item
        }
      }
      // console.log("ViewArticle",data)
      Fthis.setState({ articleList: data, currentArticle, ts: Math.random() });
    }
    addDataListener(this.globalDataUpdater)
  }
  render() {
    let title = <Skeleton paragraph={{ rows: 0 }} />
    let content = <Skeleton avatar paragraph={{ rows: 6 }} />
    // if (typeof (this.state.currentArticle) === "undefined") {
    //   return
    // }
    return (
      <div
        className={'ViewArticle'}
        style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
      >
        <div className={"ViewArticle-topbar"} style={{ }}>
          <div className={"ViewArticle-topbar-back"}></div>
          <div className={"ViewArticle-topbar-title"}>{title}</div>
        </div>
        <div className={"ViewArticle-content"} style={{ height: "calc(100% - 61px)" }}>
          {content}
        </div>


      </div>
    );
  }
}
export default ViewArticle;