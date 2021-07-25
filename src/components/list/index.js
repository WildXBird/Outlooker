import './this.less';
const { parse } = require('rss-to-json');
import React, { PureComponent } from 'react';

class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      articleList: [],
    };
    this.onClick = () => {};
  }
  componentDidMount() {
    let Fthis = this;
    let articleList = this.state.articleList;
    parse('https://outlooker-rssproxy.r6sg.workers.dev/ithome').then((rss) => {
      // console.log(JSON.stringify(rss, null, 3));
      // console.log(rss);
      for (let item of rss.items) {
        articleList.push({ ...item, dataSource: 'ithome' });
      }
      Fthis.setState({ articleList, ts: Math.random() });
      console.log(Fthis.state);
    });
  }
  render() {
    let props = this.props;
    console.log('render');
    // let todayStartTS = new Date(new Date().toLocaleDateString()).valueOf()
    //改成24小时内
    let todayStartTS = new Date().valueOf() - 3600 * 12 * 1000;
    let thisMonthHrDisplayed = false;
    return (
      <div className={'outlooker-article-list'}>
        <ul>
          {Array.from(this.state.articleList).map((item, id) => {
            let unread = false;
            if (id < 10) {
              unread = true;
            }
            let selected = false;
            if (id == 0) {
              selected = true;
            }
            let today = false;
            if (todayStartTS < item.published) {
              today = true;
            }
            return (
              <>
                {(() => {
                  if (!today && !thisMonthHrDisplayed) {
                    thisMonthHrDisplayed = true;
                    return (
                      <div className={'outlooker-article-list-dateHr'}>
                        {'本月'}
                      </div>
                    );
                  }
                })()}
                <li
                  className={`outlooker-article-list-content ${
                    unread ? 'outlooker-article-list-content-unread' : ''
                  } ${
                    selected ? 'outlooker-article-list-content-selected' : ''
                  }`}
                >
                  <div className={'outlooker-article-list-layout-left'}>
                    <div className={'outlooker-article-list-source'}>
                      {item.dataSource}
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
                        {new Date(item.published).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default List;
