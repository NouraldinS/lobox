import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  dropdownInput: {
    position: 'relative',
  },
  caretIcon: {
    position: 'absolute',
    height: 16,
    width: 16,
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    transformOrigin: 'center center',
    transition: 'all .3s',
    '&.isOpen': {
      transform: 'translateY(-50%) rotateX(180deg)',
      transition: 'all .3s',
    },
  },
});

export default useStyles;
