import React, { PureComponent } from 'react';
import './this.less';
import { Drawer, Button, Radio, Space, Input, List } from 'antd';
import { Typography } from 'antd';
import defaultConfig from "../../config/default"
import { Checkbox, Modal } from 'antd';

const { Title } = Typography;
console.log("defaultConfig", defaultConfig)

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.act = {
      remove: (id) => {
        let RSSList = JSON.parse(localStorage.RSSList)
        RSSList.splice(id, 1)
        localStorage.RSSList = JSON.stringify(RSSList)
        this.forceUpdate()
      },
      add: (item) => {
        let RSSList = JSON.parse(localStorage.RSSList)
        RSSList.push(item)
        localStorage.RSSList = JSON.stringify(RSSList)
        this.forceUpdate()
      },
      disable: (id) => {
        let RSSList = JSON.parse(localStorage.RSSList)
        let newList = []
        Array.from(RSSList).map((item, RSSId) => {
          if (RSSId == id) {
            item.disabled = !item.disabled
          }
          newList.push(item)
        })
        localStorage.RSSList = JSON.stringify(RSSList)
        this.forceUpdate()
      },
    }
  }
  render() {
    return (
      <Drawer
        className={"SettingsDrawer"}
        title={<span>{"设置"}</span>}
        placement={"right"}
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.display}
        width={305}
        push={{ distance: 600 }}
        key={"Settings"}
      >
        <Title level={5}>{"代理"}</Title>
        <Input placeholder={defaultConfig.Setting_Proxy} value={localStorage.Setting_Proxy} onChange={(event) => {
          let value = event.target.value
          localStorage.Setting_Proxy = value
          this.forceUpdate()
        }} />
        <br />
        <br />
        <Title level={5}>{"收件人邮箱"}</Title>
        <Input placeholder={"example@live.com"} value={localStorage.emailAddress} onChange={(event) => {
          let value = event.target.value
          localStorage.emailAddress = value
          this.forceUpdate()
        }} />
        <br />
        <br />
        <Title level={5}>{"广告区域"}</Title>
        <Checkbox checked={localStorage.disableAD === "true"} onChange={(event) => {
          let value = event.target.checked
          console.log("disableAD", value)
          localStorage.disableAD = value
          this.forceUpdate()
        }}>{"隐藏"}</Checkbox>
        <br />
        <br />
        <Title level={5}>{"图片中转服务器"}</Title>
        <Checkbox checked={localStorage.forceImgProxy === "true"} onChange={(event) => {
          let value = event.target.checked
          console.log("checked", value)
          localStorage.forceImgProxy = value
          this.forceUpdate()
        }}>{"强制中转"}</Checkbox>
        <p>{"仅在图片不能正常显示时启用"}</p>
        <br />
       

        <Button type="primary" onClick={() => { this.setState({ openRssList: true }) }}>{"管理订阅"}</Button>
        <br />
        <br />
        <p>{"更改即时保存，但可能需要刷新页面才能生效。"}</p>
        <p>{"使用 localStorage 保存数据，如果数据量超过浏览器上限会出错，启用太多RSS源可能会有这个问题。"}</p>
        {/* <p style={{color:"red"}}> */}
        <p style={{ color: "red" }}>
          {"在浏览器中 Outlooker 无法直接访问RSS源，所以使用了一个由 Cloudflare Workers 搭建的中转服务，每日有总调用次数限制，请有条件的用户自己注册Cloudflare账户然后把“代理”改成自己的Wrokers！"}
          <a href={"https://github.com/WildXBird/Outlooker/tree/main/workers"}>
            {"详情点击这里"}
          </a>
        </p>
        <Drawer
          title={"订阅列表"}
          width={800}
          closable={false}
          onClose={() => { this.setState({ openRssList: false }) }}
          visible={this.state.openRssList}
        >
          <Button type={"添加RSS订阅"} onClick={() => { this.setState({ addNewRSS: true }) }}>{"添加"}</Button>
          <Modal title="Basic Modal" visible={this.state.addNewRSS} onOk={() => {
            this.act.add({
              name: this.state.currentAddingRSSName,
              rss: this.state.currentAddingRSSLink
            })
            this.setState({
              currentAddingRSSName: undefined,
              currentAddingRSSLink: undefined,
            })
            this.setState({ addNewRSS: false })
          }} onCancel={() => {
            this.setState({ addNewRSS: false })
          }}>
            <Title level={5}>{"源名称"}</Title>
            <Input placeholder={"X博客"} value={this.state.currentAddingRSSName} onChange={(event) => {
              this.setState({ currentAddingRSSName: event.target.value })
            }} />
            <br />

            <Title level={5}>{"源地址"}</Title>
            <Input placeholder={"https://...."} value={this.state.currentAddingRSSLink} onChange={(event) => {
              this.setState({ currentAddingRSSLink: event.target.value })
            }} />
            <br />
          </Modal>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={JSON.parse(localStorage.RSSList)}
            renderItem={(item, id) => (
              <List.Item
                actions={[item.deleteable === false ? <span>{"内置"}</span> : <a key="list-loadmore-more" onClick={() => { this.act.remove(id) }}>{"删除"}</a>]}>
                <div style={{ width: 28 }}>
                  <Checkbox onChange={() => { this.act.disable(id) }} checked={!item.disabled} />
                </div>
                <List.Item.Meta
                  title={item.name}
                  description={item.rss}
                />
              </List.Item>
            )}
          />
        </Drawer>
      </Drawer>
    );
  }
}

export default Settings;
