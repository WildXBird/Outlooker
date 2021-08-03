import Tabs from '../../../components/Tabs';
import RSS from '../../../components/list';
import React, { PureComponent } from 'react';
import { history } from 'umi';

import "./this.less"
// export default function Inbox(props) {
//   return (
//     <div
//       className={'inbox'}
//       style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
//     >
//       <Tabs defaultActiveKey="1" onChange={(callback) => {
//       }}>
//         <Tabs.TabPane tab={'重点'} key="1">
//           <RSS onClick={(data) => {
//             console.log("a", data)
//           }} />
//         </Tabs.TabPane>
//         <Tabs.TabPane tab={'其他'} key="2">
//         </Tabs.TabPane>
//       </Tabs>
//     </div>
//   );
// }

class Inbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeKey: "1" };
  }
  render() {
    console.log("rerenderInbox", this.props)
    return (
      <div
        className={'inbox'}
        style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
      >
        <Tabs activeKey={this.state.activeKey} onChange={(activeKey) => {
          this.setState({ activeKey })
        }}>
          <Tabs.TabPane tab={'重点'} key="1">
            <RSS onClick={(data) => {
              console.log("a", data)
            }} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={'其他'} key="2">
          </Tabs.TabPane>
        </Tabs>

        <div className={`artView ${String(history.location.pathname).toLocaleLowerCase().startsWith("/mail/0/inbox/id/")}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Inbox