import React from 'react';
import classNames from 'classnames';
import useStyles from './useStyles';

import { ReactComponent as CheckIcon } from '../../assets/svg/check.svg';

type MenuItem<T> = {
  label: React.ReactNode;
  value: string;
  id: string;
  meta: T
}

export interface MenuProps<T> {
  isOpen: boolean;
  items: MenuItem<T>[];
  onSelect?: (item: MenuItem<T>) => void;
  selectedItems?: string[];
  focusedItem?: string;
}

const Menu = <T, >({
  items, isOpen, onSelect, selectedItems = [], focusedItem,
}: MenuProps<T>) => {
  const classes = useStyles();
  if (!isOpen) return null;
  return (
    <div className={classes.wrapper}>
      {
        items.length > 0 ? items.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          return (
            <button
              ref={(buttonReference) => {
                if (focusedItem === item.id) buttonReference?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
              key={item.id}
              id={`menuItem-${item.id}`}
              onClick={onSelect && (() => onSelect(item))}
              type="button"
              className={classNames(
                classes.menuItem,
                { isSelected, isFocused: focusedItem === item.id },
              )}
            >
              <span>
                {item.label}
              </span>
              <span className={classes.checkIcon}>
                {isSelected && <CheckIcon />}
              </span>
            </button>
          );
        }) : (
          <div>No results</div>
        )
      }
    </div>
  );
};

export default Menu;
