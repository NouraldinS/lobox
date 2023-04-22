import React, { useRef } from 'react';
import classNames from 'classnames';
import useDropdown from '../../hooks/useDropdown';
import Menu from '../Menu';
import Input from '../Input';
import { ReactComponent as CaretDownIcon } from '../../assets/svg/caret-down.svg';
import useStyles from './styles';

const items = [
  {
    label: 'Education ',
    value: 'education',
  }, {
    label: 'Yeaaaah science!',
    value: 'science',
  }, {
    label: 'Art',
    value: 'art',
  },
];

const seedDummyData = () => {
  for (let index = 0; index < 50; index += 1) {
    items.push({
      label: `Label ${index}`,
      value: `label-${index}`,
    });
  }
};

seedDummyData();

const Dropdown = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const { triggerProps, menuProps } = useDropdown({
    items,
    getLabel: (item) => item.label,
    getValue: (item) => item.value,
    placeholder: 'Select items',
  }, ref);

  return (
    <Input {...triggerProps} wrapperClassName={classes.dropdownInput}>
      <Menu {...menuProps} />
      <span className={classNames(classes.caretIcon, { isOpen: menuProps.isOpen })}>
        <CaretDownIcon />
      </span>
    </Input>
  );
};

export default Dropdown;
