import './this.less';
import { ReactComponent as PremiumDiamond } from '../../assets/picture/svg/premium-diamond-01.svg';

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
  return (
    <div className={"rightAD"}>
      {"广告已关闭"}
    </div>
  );
};

export { MenuAD, RightAD };
