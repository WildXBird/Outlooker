import './index.less';
import { LightButton, PrimaryButton } from '../../components/Button';

import { history } from 'umi';


export default function ActionBar(props) {
  let show_HideListButtonStyle = {
    height: '100%',
    width: '100%',
    fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons,mailIcons',
    fontSize: 16,
    verticalAlign: 'top',
    padding: 7,
    color: 'var(--themeDark)',
    paddingTop: 8,
  };
  console.log("renderingActionBar")

  let listActions = <>
    <div
      style={{
        marginLeft: 7,
        paddingLeft: 10,
        height: '100%',
        display: 'inline-block',
        padding: '6px 4px',
      }}
    >
      <LightButton style={show_HideListButtonStyle}>
        {''}
        <span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8 }}>
          {'全部标记为已读'}
        </span>
      </LightButton>
    </div>
    <div
      style={{
        paddingLeft: 10,
        height: '100%',
        display: 'inline-block',
        padding: '6px 4px',
        // filter: "grayscale(100%)",
        color: 'var(--neutralTertiaryAlt)',
      }}
    >
      <LightButton style={show_HideListButtonStyle} disabled>
        {''}
        <span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8 }}>
          {'撤消'}
        </span>
      </LightButton>
    </div>
  </>

  let viewActions = <>
    <div style={{ marginLeft: 7, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
      <LightButton style={show_HideListButtonStyle}>{''}<span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8 }}>{'删除'}</span></LightButton>
    </div>
    <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
      <LightButton style={show_HideListButtonStyle}>{''}<span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8 }}>{'存档'}</span></LightButton>
    </div>
    <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
      <LightButton style={show_HideListButtonStyle}>
        {''}
        <span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8, paddingRight: 8 }}>{'垃圾邮件'}</span>
        <span style={{ fontSize: 12 }}>{""}</span>
      </LightButton>
    </div>
    <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
      <LightButton style={show_HideListButtonStyle}>{''}<span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8}}>{'整理'}</span></LightButton>
    </div>
    <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
      <LightButton style={show_HideListButtonStyle}>{''}<span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8, paddingRight: 8 }}>{'移至'}</span>
        <span style={{ fontSize: 12 }}>{""}</span>
      </LightButton>
    </div>
    <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
      <LightButton style={show_HideListButtonStyle}>{''}<span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8, paddingRight: 8 }}>{'分类'}</span>
        <span style={{ fontSize: 12 }}>{""}</span>
      </LightButton>
    </div>
    <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 6 }}>
      <LightButton style={show_HideListButtonStyle}>{''}<span style={{ fontSize: 14, fontFamily: 'auto', paddingLeft: 8, paddingRight: 8 }}>{'推迟'}</span>
        <span style={{ fontSize: 12 }}>{""}</span>
      </LightButton>
    </div>
    <div style={{ marginLeft: 0, paddingLeft: 10, height: '100%', display: 'inline-block', padding: '6px 4px', paddingRight: 2 }}>
      <LightButton style={show_HideListButtonStyle}>{''}</LightButton>
    </div>

  </>

  return (
    <div className={'ActionBar'}>
      {(() => {
        if (String(history.location.pathname).toLocaleLowerCase().startsWith("/mail/0/inbox/id/")) {
          return viewActions
        } else {
          return listActions
        }
      })()}
    </div>
  );
}
