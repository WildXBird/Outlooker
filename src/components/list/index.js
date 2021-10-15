import './this.less';
const { parse } = require('rss-to-json');
import React, { PureComponent } from 'react';
import { AutoAvatar } from '../../components/Avatar';
import { LightButton } from '../../components/Button';
import { history } from 'umi';
import { isRead } from '../GlobalDataManager';


class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
    };
    this.onClick = () => { };
  }
  componentDidMount() {
    let Fthis = this;
    this.globalDataUpdater = function (data) {
      Fthis.setState({ articleList: data, ts: Math.random() });
    }
    addDataListener(this.globalDataUpdater)
  }
  render() {
    let todayStartTS = new Date().valueOf() - 3600 * 12 * 1000;
    let thisMonthHrDisplayed = false;
    let unreadCount = 0
    return (
      <div className={'outlooker-article-list'} key={'outlooker-article-list'}>
        <ul>
          {Array.from(this.state.articleList).map((item, id) => {
            let unread = !isRead(item.id);
            if(unread){
              unreadCount ++ 
            }
            let selected = false;
            let today = false;
            if (todayStartTS < item.published) {
              today = true;
            }
            return (
              <div key={'outlooker-article-list-content' + id}>
                {(() => {
                  if (!today && !thisMonthHrDisplayed) {
                    thisMonthHrDisplayed = true;
                    return (
                      <div key={'outlooker-article-list-dateHr' + id} className={'outlooker-article-list-dateHr'}>
                        {'本月'}
                      </div>
                    );
                  }
                })()}
                <a
                  className={`outlooker-article-list-content ${unread ? 'outlooker-article-list-content-unread' : ''} ${selected ? 'outlooker-article-list-content-selected' : ''}`}
                //  onTouch
                //   onTouchEnd={()=>{
                //     let contentPseudoHash = btoa(encodeURI(item.link));
                //     history.push("/mail/0/inbox/id/" + contentPseudoHash)
                //   }}
                  onClick={(event) => {
                    let contentPseudoHash = btoa(encodeURI(item.link));
                    history.push("/mail/0/inbox/id/" + contentPseudoHash)
                  }}
                  // style={{cursor:'pointer'}}
                >
                  <div className={'outlooker-article-list-layout-left'}>
                    <div
                      className={'outlooker-article-list-layout-left-holder'}
                    >
                      <div className={'outlooker-article-list-icon'}>
                        <AutoAvatar item={item} />
                        <div
                          className={'outlooker-article-list-icon-hoverbox'}
                        ></div>
                      </div>
                      <div className={'outlooker-article-list-source'}>
                        {function(){
                          if(item.author === "WildXBird"){
                            return "Outlooker更新"
                          }else{
                            return item.author || item.dataSource
                          }
                        }()}
                        
                      </div>
                      <div className={'outlooker-article-list-action'}>
                        <LightButton style={{ color: 'var(--neutralSecondary)' }}>{''}</LightButton>
                        <LightButton style={{ color: 'var(--neutralSecondary)' }}>{''}</LightButton>
                        <LightButton style={{ color: 'var(--neutralSecondary)' }}>{''}</LightButton>
                        <LightButton style={{ color: 'var(--neutralSecondary)' }}>{''}</LightButton>
                      </div>
                    </div>
                  </div>
                  <div className={'outlooker-article-list-layout-right'}>
                    <div
                      className={'outlooker-article-list-layout-right-holder'}
                    >
                      <div className={'outlooker-article-list-content'}>
                        <span className={'outlooker-article-list-title'}>
                          {item.title}
                        </span>
                        <span className={'outlooker-article-list-description'}>
                          {item.description}
                        </span>
                      </div>
                      <div className={'outlooker-article-list-time'}>
                        {(() => {
                          let isToday = new Date(item.published).toLocaleString('zh-CN', { year: "numeric", month: "numeric", day: "numeric" }) === new Date().toLocaleString('zh-CN', { year: "numeric", month: "numeric", day: "numeric" })
                          if (isToday) {
                            return <>
                              {new Date(item.published).toLocaleString('zh-CN', { weekday: "long" }).replace("星期", "周")}
                              {" "}
                              {new Date(item.published).toLocaleString('zh-CN', { hour: "numeric", minute: "numeric", hour12: false })}
                            </>
                          } else {
                            return <>
                              {new Date(item.published).toLocaleString('zh-CN', { weekday: "long" }).replace("星期", "周")}
                              {" "}
                              {new Date(item.published).toLocaleString('zh-CN', { month: "numeric", day: "numeric" })}
                            </>
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
          {function(){
            localStorage.unreadCount = unreadCount
          }()}
        </ul>
      </div>
    );
  }
}
export default List;
