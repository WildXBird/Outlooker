import styles from './global.less';
import './global.less';
import { Layout } from 'antd';
import HeaderContent from './header';
import { LeftBar } from './leftBar';
import { RightAD } from "../components/AD"
import Settings from "../components/Settings"
import React, { useState } from 'react';


export default function Interface(input) {
  let props = input.props
  const [settingDisplay, setSettingDisplay] = useState(0);

  const { Header, Footer, Content, Sider } = Layout;

  let hideAD = false
  if (typeof (localStorage.disableAD) !== "string") {
    if (window.innerWidth < 1000) {
      hideAD = true
    }
  }else{
    hideAD = localStorage.disableAD === "true" 
  }
 
  return (
    <>
      <Header
        className={styles.header}
        style={{
          height: 48,
          backgroundColor: 'var(--themePrimary)',
          padding: 0,
          lineHeight: 'unset',
          color: 'white',
        }}
      >
        <HeaderContent openSettings={() => { setSettingDisplay(!settingDisplay) }} />
      </Header>
      <Content style={{ height: 'calc(100% - 48px)', width: "100%" }}>
        <div style={{ width: `calc(100% - ${hideAD ? "0px" : "305px"})`, height: "100%", display: "inline-block",overflow:"hidden" }}>
          <LeftBar>{props.children}</LeftBar>
        </div>
        <div style={{ width: hideAD ? 0 : "305px", height: "100%", display: "inline-block", verticalAlign: "top",overflow:"hidden" }}>
          <RightAD />
          <Settings
            display={settingDisplay}
            onClose={() => { setSettingDisplay(!settingDisplay) }}
          />
        </div>
      </Content>

    </>
  );
}
