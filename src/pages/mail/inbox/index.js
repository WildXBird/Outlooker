// import styles from './index.less';
import Tabs from '../../../components/Tabs';
import RSS from '../../../components/list';
export default function Inbox(props) {
  return (
    <div
      className={'inbox'}
      style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
    >
      <Tabs defaultActiveKey="1" onChange={(callback) => { 
        alert("h")
      }}>
        <Tabs.TabPane tab={'重点'} key="1">
          <RSS  onClick={(data)=>{
            console.log("a",data)
          }}/>
        </Tabs.TabPane>
        <Tabs.TabPane tab={'其他'} key="2">
          {/* <div> */}
          Content of Tab Pane 2{/* </div> */}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
