import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './global.less';
import { IconButton, BorderlessButton } from '../components/Button';
import { history } from 'umi';

export default function IndexPage(props) {
  let IconButtonStyle = {
    height: 48,
    width: 48,
    fontFamily: 'ShellFabricMDL2IconsLite,ShellFabricMDL2Icons,controlIcons',
    fontSize: 16,
    verticalAlign: 'top',
  };
  return (
    <>
      <IconButton style={IconButtonStyle}>{''}</IconButton>
      <div
        style={{
          display: 'inline-block',
          width: 617,
          height: 48,
          verticalAlign: 'top',
        }}
      >
        <BorderlessButton
          align={'left'}
          style={{
            height: 48,
            width: 240,
            fontFamily: `SegoeUI-SemiBold-final,Segoe UI Semibold,SegoeUI-Regular-final,Segoe UI,"Segoe UI Web (West European)",Segoe,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Tahoma,Helvetica,Arial,sans-serif`,
            fontWeight: 600,
            paddingLeft: 8,
            paddingRight: 12,
            lineHeight: '48px',
            verticalAlign: 'top',
            fontSize: 16,
          }}
          onClick={() => {
            history.push("/")
          }}
        >
          {'Outlook'}
        </BorderlessButton>
        <div
          className={'header-searchBox'}
          style={{
            display: 'inline-block',
            height: 48,
            width: 356,
            verticalAlign: 'top',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Input
              placeholder={'搜索'}
              style={{
                width: 356,
                height: 32,
              }}
              prefix={<div>{''}</div>}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'inline-block',
          width: 'calc(100% - 48px - 617px)',
          height: '100%',
          textAlign: 'right',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: 'calc(100% - 48px)',
            height: '100%',
            verticalAlign: 'top',
          }}
        >
          <IconButton style={IconButtonStyle} onClick={props.openSettings}>{''}</IconButton>
          <IconButton style={IconButtonStyle} onClick={props.openSettings}>{''}</IconButton>
          <IconButton style={IconButtonStyle} onClick={props.openSettings}>{''}</IconButton>
          <IconButton style={IconButtonStyle} onClick={props.openSettings}>{''}</IconButton>
          <IconButton style={IconButtonStyle} onClick={props.openSettings}>{''}</IconButton>
          <IconButton style={IconButtonStyle} onClick={props.openSettings}>{''}</IconButton>
          <IconButton style={IconButtonStyle} onClick={props.openSettings}>{''}</IconButton>
        </div>
        <div style={{ display: 'inline-block', width: 48, height: '100%' }}  onClick={props.openSettings}>
          <IconButton style={IconButtonStyle}>
            <div
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
                backgroundColor: '#603CBA',
                lineHeight: '32px',
              }}
            >
              {''}
            </div>
          </IconButton>
        </div>
      </div>
    </>
  );
}
