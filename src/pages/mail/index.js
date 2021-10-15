import './index.less';
import { LightButton, PrimaryButton } from '../../components/Button';
import Menu from './menu';
import ActionBar from './actionBar';
import { MenuAD } from '../../components/AD';
import React, { PureComponent } from 'react';

// export default function IndexPage(props) {
class IndexPage extends PureComponent {
  constructor(props) {
    super(props);
    // alert(window.innerWidth)

    this.state = {
      hideMenu: this.needHideMenu()
    };
  }
  needHideMenu() {
    return (window.innerWidth < 1000) ? true : false
  }
  onResize(event) {
    if (this.state.hideMenu !== this.needHideMenu()) {
      this.setState({
        hideMenu: this.needHideMenu()
      })
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.onResize.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this))
  }
  render() {
    let props = this.props
    let show_HideListButtonStyle = {
      height: '100%',
      width: '100%',
      fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons',
      fontSize: 14,
      verticalAlign: 'top',
    };
    let newMailButtonStyle = {
      ...show_HideListButtonStyle,
      fontFamily: 'auto',
      height: 32,
      width: 88,
    };
    document.title = "Outlooker"
    setTimeout(() => {
      document.title = "Outlooker"
    }, 0);
    return (
      <React.StrictMode>
        <title>{"Outlooker"}</title>
        <div
          className={'mailBox'}
          style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
        >
          <div className={'mailBox-topBar'}>
            <div
              className={'mailBox-topBar-left'}
              style={{
                width: 240,
                height: '100%',
                display: 'inline-block',
                verticalAlign: 'top',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: '100%',
                  display: 'inline-block',
                  padding: '6px 4px',
                }}
              >
                <LightButton style={show_HideListButtonStyle}
                  onClick={() => {
                    this.setState({ hideMenu: !this.state.hideMenu })
                  }}>{''}</LightButton>
              </div>
              <div
                style={{
                  width: 'calc(100% - 48px)',
                  height: '100%',
                  display: 'inline-block',
                }}
              >
                <PrimaryButton style={newMailButtonStyle}>
                  {'新建邮件'}
                </PrimaryButton>
              </div>
            </div>
            <div
              className={'mailBox-topBar-right'}
              style={{
                width: 'calc(100% - 240px)',
                height: '100%',
                display: 'inline-block',
              }}
            >
              <ActionBar />
            </div>
          </div>
          <div
            className={'mailBox-content'}
            style={{
              width: '100%',
              height: 'calc(100% - 45px)',
              display: 'inline-block',
              verticalAlign: 'top',
            }}
          >
            <div
              className={'mailBox-content-left'}
              style={{
                width: this.state.hideMenu ? 0 : 240,
                // width: 0,
                height: '100%',
                display: 'inline-block',
                verticalAlign: 'top',
                overflow: "hidden"
              }}
            >
              <div className={'mailBox-content-left-menu'}>
                <Menu />
              </div>
              <div className={'mailBox-content-left-ad'}>
                <MenuAD />
              </div>
            </div>
            <div
              className={'mailBox-content-right'}
              style={{
                width: `calc(100% - ${this.state.hideMenu ? 0 : 240}px)`,
                // width: this.state.hideMenu ? 'calc(100% - 0px)' : 'calc(100% - 240px)',
                height: '100%',
                display: 'inline-block',
              }}
            >
              {props.children}
            </div>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}
export default IndexPage;