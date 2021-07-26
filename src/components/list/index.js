import './this.less';
const { parse } = require('rss-to-json');
import React, { PureComponent } from 'react';
import { AutoAvatar } from '../../components/Avatar';
import { LightButton } from '../../components/Button';

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
    //
    function htmlDecode(text) {
      var temp = document.createElement('div'); //创建一个容器标签元素
      temp.innerHTML = text; //将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
      var output = temp.innerText || temp.textContent; //innerText(ie支持),textContent(火狐，google支持)
      temp = null;
      return output;
    }
    //
    parse('https://outlooker-rssproxy.r6sg.workers.dev/ithome').then((rss) => {
      for (let item of rss.items) {
        item.html = htmlDecode(item.description);
        item.description = htmlDecode(item.html);
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
                  onClick={(event)=>{
                    console.log(typeof this.props.onClick)
                    // this.props.onClick(item)
                  }}
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
                        {item.dataSource}
                      </div>
                      <div className={'outlooker-article-list-action'}>
                        <LightButton
                          style={{ color: 'var(--neutralSecondary)' }}
                        >
                          {''}
                        </LightButton>
                        <LightButton
                          style={{ color: 'var(--neutralSecondary)' }}
                        >
                          {''}
                        </LightButton>
                        <LightButton
                          style={{ color: 'var(--neutralSecondary)' }}
                        >
                          {''}
                        </LightButton>
                        <LightButton
                          style={{ color: 'var(--neutralSecondary)' }}
                        >
                          {''}
                        </LightButton>
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
