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
    return (
      <div>
        <div>{this.state.articleList.length}</div>
        {Array.from(this.state.articleList).map((item) => {
          return <div>{item.title}</div>;
        })}
      </div>
    );
  }
}
export default List;
