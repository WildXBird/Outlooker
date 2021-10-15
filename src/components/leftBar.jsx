import React, { PureComponent} from 'react';

import { LeftBarsButton } from '../components/Button';
import { ReactComponent as WordLogo } from '../assets/picture/svg/word.svg';
import { ReactComponent as ExcelLogo } from '../assets/picture/svg/excel.svg';
import { ReactComponent as PowerPointLogo } from '../assets/picture/svg/powerPoint.svg';
import { ReactComponent as OneNoteLogo } from '../assets/picture/svg/oneNote.svg';

// export default function LeftBar(props) {
export class LeftBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hideLeft: this.needHideLeft()
    };
  }
  needHideLeft() {
    return (window.innerWidth < 600) ? true : false
  }
  onResize(event) {
    if (this.state.hideMenu !== this.needHideLeft()) {
      this.setState({
        hideLeft: this.needHideLeft()
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
    let IconButtonStyle = {
      height: 48,
      width: 48,
      fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons',
      fontSize: 16,
      verticalAlign: 'top',
    };
    const leftWidth = this.state.hideLeft ?0:48
    return (
      <div
        className={'leftBar'}
        style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
      >
        <div
          className={'leftBar-left'}
          style={{
            width:leftWidth,
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top',
            overflow:"hidden"
          }}
        >
          <LeftBarsButton style={IconButtonStyle} active>
            {''}
          </LeftBarsButton>
          <LeftBarsButton style={IconButtonStyle}>{''}</LeftBarsButton>
          <LeftBarsButton style={IconButtonStyle}>{''}</LeftBarsButton>
          <LeftBarsButton style={IconButtonStyle}>{''}</LeftBarsButton>
          <LeftBarsButton style={IconButtonStyle}>{''}</LeftBarsButton>
          <LeftBarsButton style={IconButtonStyle}>
            <div className={'svgIcon'}>
              <WordLogo />
            </div>
          </LeftBarsButton>
          <LeftBarsButton style={IconButtonStyle}>
            <div className={'svgIcon'}>
              <ExcelLogo />
            </div>
          </LeftBarsButton>
          <LeftBarsButton style={IconButtonStyle}>
            <div className={'svgIcon'}>
              <PowerPointLogo />
            </div>
          </LeftBarsButton>
          <LeftBarsButton style={IconButtonStyle}>
            <div className={'svgIcon'}>
              <OneNoteLogo />
            </div>
          </LeftBarsButton>
        </div>
        <div
          className={'leftBar-right'}
          style={{
            width: `calc(100% - ${leftWidth}px)`,
            height: '100%',
            display: 'inline-block',
          }}
        >
          {this.props.children}
        </div>
      </div>

    );
  }
}