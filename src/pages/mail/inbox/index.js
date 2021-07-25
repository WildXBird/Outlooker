// import styles from './index.less';
import Tabs from '../../../components/Tabs';
export default function IndexPage(props) {
  return (
    <div
      className={'inbox'}
      style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
    >
      <Tabs defaultActiveKey="1" onChange={(callback) => {}}>
        <Tabs.TabPane tab={'重点'} key="1">
          Content of Tab Pane 1
        </Tabs.TabPane>
        <Tabs.TabPane tab={'其他'} key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
