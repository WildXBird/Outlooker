import './this.less';
import { ReactComponent as PremiumDiamond } from '../../assets/picture/svg/premium-diamond-01.svg';
import AdSense from 'react-adsense';

let MenuAD = function MenuAD(props) {
  return (
    <div className={'MenuAD'} style={{ borderTop: '1px #EDEBE9 solid' }}>
      <div
        style={{
          display: 'inline-block',
          width: 42,
          height: '100%',
          verticalAlign: 'top',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            marginTop: 14,
            marginLeft: 17,
          }}
        >
          <PremiumDiamond style={{ width: 14, height: 14 }} />
        </div>
      </div>
      <div
        className={'MenuAD-text'}
        style={{ display: 'inline-block', width: 'calc(100% - 42px)' }}
      >
        {'升级到 Microsoft 365 通过 Outlook 高级功能'}
      </div>
    </div>
  );
};
let RightAD = function RightAD(props) {
  if (localStorage.disableAD === "true") {
    return ""
  }


  let AD = "广告已关闭"
  if (document.location.hostname === "reader.r6sground.cn") {
    AD = <AdSense.Google
      client='ca-pub-4417984338760431'
      slot='1583965552'
      style={{ width: "100%", height: "100%", float: 'left' }}
      format=''
    />
  }

  return (
    <div className={"rightAD"}>
      {AD}
    </div>
  );
};
export const FeedAD = function RightAD(props) {
  if (localStorage.disableFeedAD === "true") {
    return ""
  }


  let AD = <div style={{marginLeft:36}}>{"广告已关闭"}</div>
  if (document.location.hostname === "reader.r6sground.cn") {
    AD = <AdSense.Google
      client='ca-pub-4417984338760431'
      slot='2778176464'
      style={{ width: "100%", float: 'left' }}
      format=''
    />
  }

  return (
    <div className={"FeedAD"}>
      {AD}
    </div>
  );
};

export { MenuAD, RightAD };
