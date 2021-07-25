import './index.less';
import { LightButton, PrimaryButton } from '../../components/Button';
// import { Menu } from 'antd';
import Menu from '../../components/Menu';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export default function ActionBar(props) {
  let show_HideListButtonStyle = {
    height: '100%',
    width: '100%',
    fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons',
    fontSize: 16,
    verticalAlign: 'top',
    padding: 7,
    color: 'var(--themeDark)',
    paddingTop: 8,
  };
  return (
    <div className={'ActionBar'}>
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
    </div>
  );
}
