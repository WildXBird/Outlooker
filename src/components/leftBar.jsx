import { LeftBarsButton } from '../components/Button';
import { ReactComponent as WordLogo } from '../assets/picture/svg/word.svg';
import { ReactComponent as ExcelLogo } from '../assets/picture/svg/excel.svg';
import { ReactComponent as PowerPointLogo } from '../assets/picture/svg/powerPoint.svg';
import { ReactComponent as OneNoteLogo } from '../assets/picture/svg/oneNote.svg';

export default function IndexPage(props) {
  let IconButtonStyle = {
    height: 48,
    width: 48,
    fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons',
    fontSize: 16,
    verticalAlign: 'top',
  };
  return (
    <div
      className={'leftBar'}
      style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
    >
      <div
        className={'leftBar-left'}
        style={{
          width: 48,
          height: '100%',
          display: 'inline-block',
          verticalAlign: 'top',
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
          width: 'calc(100% - 48px)',
          height: '100%',
          display: 'inline-block',
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
