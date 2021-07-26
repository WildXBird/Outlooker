import styles from './global.less';
import './global.less';
import { Layout } from 'antd';
import HeaderContent from './header';
import LeftBar from './leftBar';
import { RightAD } from "../components/AD"
export default function IndexPage(props) {
  let a = 1;
  const { Header, Footer, Content, Sider } = Layout;
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
        <HeaderContent />
      </Header>
      <Content style={{ height: 'calc(100% - 48px)', width: "calc(100% - 305px)" }}>
        <LeftBar>{props.children}</LeftBar>
      </Content>
      <RightAD />
      {/* <Footer /> */}
    </>
  );
}
