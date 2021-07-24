import './this.less';
import React, { PureComponent } from 'react';
import { BorderlessButton } from '../../components/Button';

class Menu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        return React.cloneElement(child, {
          ...child.props,
          selectedKey: this.props.defaultSelectedKey,
        });
      },
    );
    return (
      <div
        className="outlooker-components-Menu"
        style={{ ...this.props.style }}
      >
        {childrenWithProps}
        {/* <hr /> */}
        {/* {this.props.children} */}
      </div>
    );
  }
}
Menu.SubMenu = class Menu_SubMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let props = this.props;
    let defaultUnfold = false;
    const childrenWithProps = React.Children.map(props.children, (child) => {
      console.log('React.Children', child);
      if (child.key === props.selectedKey) {
        defaultUnfold = true;
      }
      return React.cloneElement(child, {
        ...child.props,
        selectedKey: props.selectedKey,
        itemKey: child.key,
      });
    });
    defaultUnfold = true;
    let arrowStyle = {
      height: '100%',
      width: '100%',
      fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons',
      fontSize: 14,
      verticalAlign: 'top',
    };
    return (
      <div
        className={`outlooker-components-SubMenu ${
          defaultUnfold ? 'outlooker-components-SubMenu-unfold' : ''
        }`}
      >
        <div className="outlooker-components-SubMenu-title">
          <div style={{ display: 'inline-block', width: 48 }}>
            <BorderlessButton style={arrowStyle}>{''}</BorderlessButton>
          </div>
          <div
            style={{
              display: 'inline-block',
              fontWeight: 600,
              paddingLeft: 10,
            }}
          >
            {props.title}
          </div>
        </div>
        <div className="outlooker-components-SubMenu-children">
          {childrenWithProps}
        </div>
      </div>
    );
  }
};
Menu.Item = function Menu_Item(props) {
  let actived = props.itemKey == props.selectedKey;
  let iconStyle = {
    height: '100%',
    width: '100%',
    fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons',
    fontSize: 16,
    verticalAlign: 'top',
  };
  return (
    <div
      className={`outlooker-components-Item ${
        actived ? 'outlooker-components-Item-actived' : ''
      } ${props.primary ? 'outlooker-components-Item-primary' : ''}`}
    >
      <div className={'outlooker-components-Item-icon'} style={{}}>
        <BorderlessButton style={iconStyle}>{props.icon}</BorderlessButton>
      </div>
      <div className={'outlooker-components-Item-title'} style={{}}>
        <div className={'outlooker-components-Item-title-innner'} style={{}}>
          <div className={'outlooker-components-Item-title-innner-text'}>
            {props.children}
          </div>
          <div className={'outlooker-components-Item-title-innner-count'}>
            {props.count}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
