import './this.less';
import { ReactComponent as PremiumDiamond } from '../../assets/picture/svg/premium-diamond-01.svg';
import React, { PureComponent } from 'react';
import { BorderlessButton } from '../../components/Button';

let Tabs = function Tabs(props) {
  const titleChildren = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      ...child.props,
      itemKey: child.key,
      selectedKey: props.defaultActiveKey,
    });
  });
  const content = React.Children.map(props.children, (child) => {
    console.log(child);
    return React.cloneElement(<>{child.props.children}</>, {
      // ...child.children.props,
      itemKey: child.key,
      selectedKey: props.defaultActiveKey,
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
        <div className={'outlooker-Tabs-bar-nav-list'}>{titleChildren}</div>
      </div>
      <div className={'outlooker-Tabs-content'} style={{}}>
        {content}
      </div>
    </div>
  );
};
Tabs.TabPane = function TabPane(props) {
  return (
    <div
      className={`outlooker-Tabs-tab ${
        props.itemKey == props.selectedKey ? 'outlooker-Tabs-tab-actived' : ''
      }`}
    >
      <div style={{ position: 'relative', top: 0 }}>{props.tab}</div>
      <div className={'outlooker-Tabs-tab-underline'} />
    </div>
  );
};
export default Tabs;
