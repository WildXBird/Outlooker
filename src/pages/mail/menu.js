import './index.less';
import { LightButton, PrimaryButton } from '../../components/Button';
// import { Menu } from 'antd';
import Menu from '../../components/Menu';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export default function IndexPage(props) {
  return (
    <Menu
      onClick={(event) => {
        console.log(event);
      }}
      // style={{ width: "100%" }}
      defaultSelectedKey={'inbox'}
      // defaultOpenKeys={['sub1']}
    >
      <Menu.SubMenu key="sub1" icon={<MailOutlined />} title={'收藏夹'}>
        <Menu.Item key={'inbox'} icon={''} count={11251} primary>
          {'收件箱'}
        </Menu.Item>
        <Menu.Item key="2" icon={''}>
          {'存档'}
        </Menu.Item>
        <Menu.Item key="3" icon={''}>
          {'已发送邮件'}
        </Menu.Item>
        <Menu.Item key="4" icon={''}>
          {'草稿'}
        </Menu.Item>
        <Menu.Item key="40999" icon={''}>
          {'已删除邮件'}
        </Menu.Item>
        <Menu.Item key="5">
          <span style={{ color: 'var(--themeDark)' }}>{'加入收藏夹'}</span>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="sub2" icon={<AppstoreOutlined />} title={'文件夹'}>
        <Menu.Item key="21" icon={''} count={11251} primary>
          {'收件箱'}
        </Menu.Item>
        <Menu.Item key="22" icon={''} count={51}>
          {'垃圾邮件'}
        </Menu.Item>
        <Menu.Item key="23" icon={''} count={25}>
          {'草稿'}
        </Menu.Item>
        <Menu.Item key="24" icon={''}>
          {'已发送邮件'}
        </Menu.Item>
        <Menu.Item key="25" icon={''}>
          {'已删除邮件'}
        </Menu.Item>
        <Menu.Item key="26" icon={''}>
          {'存档'}
        </Menu.Item>
        <Menu.Item key="27">{'对话历史记录'}</Menu.Item>
        <Menu.Item key="28">
          <span style={{ color: 'var(--themeDark)' }}>{'新建文件夹'}</span>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="sub4" icon={<SettingOutlined />} title={'组'}>
        <Menu.Item key="31">
          <span style={{ color: 'var(--themeDark)' }}>{'新建组'}</span>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}
