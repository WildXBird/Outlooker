import './this.less';

let IconButton = function IndexPage(props, buttonTypeText = 'IconButton') {
  let align = {
    justifyContent: 'center',
  };
  switch (props.align) {
    case 'left':
      align = {
        justifyContent: 'flex-start',
      };
      break;
    case 'right':
      align = {
        justifyContent: 'flex-end',
      };
      break;
  }
  typeof buttonTypeText !== 'string' ? (buttonTypeText = 'IconButton') : '';

  return (
    <>
      <button
        className={`outlooker-button ${buttonTypeText} ${
          props.disabled ? 'outlooker-button-disabled' : ''
        } `}
        style={{
          display: 'inline-block',
          textAlign: 'center',
          cursor: 'pointer',
          ...props.style,
        }}
        onClick={(event) => {
          typeof props.onClick === 'function' ? props.onClick(event) : '';
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: align.justifyContent,
          }}
        >
          {props.children}
        </div>
      </button>
    </>
  );
};

let BorderlessButton = function IndexPage(props) {
  return IconButton(props, 'BorderlessButton');
};
let LeftBarsButton = function IndexPage(props) {
  let style = { ...props.style };
  let className = 'LeftBarsButton';
  if (props.active) {
    className += ' LeftBarsButton-active';
  }
  return IconButton({ ...props, style }, className);
};
let LightButton = function IndexPage(props) {
  return IconButton(props, 'LightButton');
};
let PrimaryButton = function IndexPage(props) {
  return IconButton(props, 'PrimaryButton');
};
export {
  IconButton,
  BorderlessButton,
  LeftBarsButton,
  LightButton,
  PrimaryButton,
};
