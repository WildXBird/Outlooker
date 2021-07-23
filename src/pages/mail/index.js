import './index.less';
import { LightButton, PrimaryButton } from '../../components/Button';

export default function IndexPage(props) {
  let show_HideListButtonStyle = {
    height: '100%',
    width: '100%',
    fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons',
    fontSize: 14,
    verticalAlign: 'top',
  };
  let newMailButtonStyle = {
    ...show_HideListButtonStyle,
    height: 32,
    width: 88,
  };
  return (
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
            <LightButton style={show_HideListButtonStyle}>{''}</LightButton>
          </div>
          <div
            style={{
              width: 'calc(100% - 48px)',
              height: '100%',
              display: 'inline-block',
            }}
          >
            <PrimaryButton style={newMailButtonStyle}>
              <span>{'新建邮件'}</span>
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
          {'props.children'}
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
            width: 240,
            height: '100%',
            display: 'inline-block',
            verticalAlign: 'top',
          }}
        >
          <div className={'mailBox-content-left-menu'}>456</div>
          <div className={'mailBox-content-left-ad'}>789</div>
        </div>
        <div
          className={'mailBox-content-right'}
          style={{
            width: 'calc(100% - 240px)',
            height: '100%',
            display: 'inline-block',
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
