import './this.less';
import React, { PureComponent } from 'react';

class Tabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let props = this.props
    let activeKey = props.activeKey || props.defaultActiveKey
    const titleChildren = React.Children.map(props.children, (child) => {
      return React.cloneElement(child, {
        ...child.props,
        itemkey: child.key,
        selectedKey: activeKey,
        onClick: (() => {
          console.log("onClick")
          if (typeof (this.props.onChange) === "function") {
            this.props.onChange(child.key)
          }
        })
      });
    });
    const content = React.Children.map(props.children, (child) => {
      return React.cloneElement(<div className={`outlooker-Tabs-content  ${child.key == activeKey ? 'outlooker-Tabs-content-actived' : ''}`} style={{}}>
        {child.props.children}
      </div>, {
        itemkey: child.key,
        selectedKey: activeKey
      });
    });
    return (
      <div className={'outlooker-Tabs'} style={{}}>
        <div className={'outlooker-Tabs-bar'} style={{}}>
          <div className={'outlooker-Tabs-bar-checkbox'}>
            <div className={'outlooker-Tabs-bar-checkbox-inside'}>
              <i className={'checkbox-CircleRing'}></i>
              <i className={'checkbox-StatusCircleCheckmark'}></i>
            </div>
          </div>
          <div className={'outlooker-Tabs-bar-nav-list'}>
            {titleChildren}
          </div>
        </div>
        <div className={`outlooker-Tabs-content-Area`}>
          {content}
        </div>
      </div >
    );
  }
}

Tabs.TabPane = class TabPane extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeKey: "2" };
  }
  render() {
    let props = this.props
    console.log("props", props)
    return (
      <div className={`outlooker-Tabs-tab ${props.itemkey == props.selectedKey ? 'outlooker-Tabs-tab-actived' : ''}`} onClick={this.props.onClick}>
        <div style={{ position: 'relative', top: 0 }}>{props.tab}</div>
        <div className={'outlooker-Tabs-tab-underline'} />
      </div>
    );
  }
}

export default Tabs;
