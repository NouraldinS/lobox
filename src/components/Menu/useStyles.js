import { createUseStyles } from 'react-jss';

export default createUseStyles({
  wrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '8px',
    padding: '8px',
    backgroundColor: '#FFF',
    borderRadius: '6px',
    maxHeight: 100,
    minWidth: 400,
    overflowY: 'scroll',
    boxShadow: '0 0 3px #9f9f9f',
    gap: 4,
    boxSizing: 'border-box',
  },
  menuItem: {
    all: 'unset',
    padding: '4px 8px',
    cursor: 'pointer',
    transition: 'all .3s',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover, &.isFocused': {
      backgroundColor: '#F2F4FF',
      color: '#859BDE',
      transition: 'all .3s',
    },
  },
  checkIcon: {
    display: 'inline-block',
    width: 18,
    height: 18,
    fill: '#859BDE',
  },
});
