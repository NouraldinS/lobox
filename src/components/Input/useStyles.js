import { createUseStyles } from 'react-jss';

export default createUseStyles({
  wrapper: {
    border: '1px solid #A8B1C5',
    borderRadius: 5,
    '&.isFocused': {
      boxShadow: '0 0 3px #A8B1C566',
    },
  },
  input: {
    all: 'unset',
    padding: '.5rem',
    width: '100%',
    height: '100%',
  },
});
