import React, { PureComponent } from 'react';
import './this.less';
import { Drawer, Button, Radio, Space, Input } from 'antd';
import { Typography } from 'antd';
import defaultConfig from "../../config/default"

const { Title } = Typography;
console.log("defaultConfig", defaultConfig)

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Drawer
        className={"SettingsDrawer"}
        title={<span>{"设置"}</span>}
        placement={"right"}
        closable={false}
        onClose={this.props.onClose}
        // onClose={()=>{console.log("3334")}}
        visible={this.props.display}
        // visible={true}
        width={305}
        key={"Settings"}
      >
        <Title level={5}>{"代理"}</Title>
        <Input placeholder={defaultConfig.Setting_Proxy} value={localStorage.Setting_Proxy} onChange={(event) => {
          let value = event.target.value
          localStorage.Setting_Proxy = value
          this.forceUpdate()
        }} />

        <Title level={5}>{"收件人邮箱"}</Title>
        <Input placeholder="Basic usage" value={localStorage.emailAddress} onChange={(event) => {
          let value = event.target.value
          localStorage.emailAddress = value
          this.forceUpdate()
        }} />
        <p>{"更改即时保存，但可能需要刷新页面才能生效。"}</p>
      </Drawer>
    );
  }
}

export default Settings;
