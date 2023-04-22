import React, {
  KeyboardEventHandler, useEffect, useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import useClickOutside from './useClickOutside';
import { MenuProps } from '../components/Menu';
import useSet from './useSet';

type MenuItem<T> = {
  label: React.ReactNode;
  value: string;
  id: string;
  meta: T
}

interface DropdownProps<T> {
  name?: string;
  label?: React.ReactNode;
  'aria-label'?: string;
  items?: T[];
  getLabel: (item: T) => React.ReactNode;
  getValue: (item: T) => string;
  placeholder?: string;
}

const EMPTY_STRING = '';

const useDropdown = <T>(
  props: DropdownProps<T>,
  ref: React.RefObject<HTMLElement>,
) => {
  const {
    name = `dropdown-${uuid()}`,
    items = [] as T[],
    getLabel,
    getValue,
    placeholder,
  } = props;

  const [
    selectedItems, {
      add: addSelectedItem,
      remove: removeSelectedItem,
      has: hasSelectedItem,
    }] = useSet();

  const [fieldValue, setFieldValue] = useState<string>(EMPTY_STRING);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menu, setMenu] = useState<MenuItem<T>[]>([]);
  const [focusedItem, setFocusedItem] = useState<string | null>(null);

  useEffect(() => {
    const selectedItemsArray = Array.from(selectedItems);
    setFieldValue(menu
      .filter(({ id }) => selectedItemsArray.includes(id))
      .map(({ label }) => label).join(', '));
  }, [selectedItems, menu]);

  useEffect(() => {
    if (!items || !Array.isArray(items)) {
      throw new Error('"items" must be an array ');
    }
    setMenu(items.map((item) => ({
      isFocused: false,
      isSelected: false,
      label: getLabel(item),
      value: getValue(item),
      id: `menuItem-${uuid()}`,
      meta: item,
    })));
  }, [items]);

  useClickOutside(ref, () => {
    setIsMenuOpen(false);
  });

  const focusNextItem = (itemId: string) => {
    const indexOfItem = menu.findIndex(({ id }) => id === itemId);
    const nextItem = menu[indexOfItem + 1];
    if (nextItem) {
      setFocusedItem(nextItem.id);
    }
  };
  const focusPrevItem = (itemId: string) => {
    const indexOfItem = menu.findIndex(({ id }) => id === itemId);
    const prevItem = menu[indexOfItem - 1];
    if (prevItem) {
      setFocusedItem(prevItem.id);
    }
  };
  const toggleItemSelection = (itemId: string) => {
    if (hasSelectedItem(itemId)) {
      removeSelectedItem(itemId);
    } else {
      addSelectedItem(itemId);
    }
  };

  return {
    triggerProps: {
      ref,
      name,
      onClick: () => {
        setIsMenuOpen((isOpen) => !isOpen);
        setFocusedItem(menu[0]?.id || null);
      },
      onKeyDown: ((event) => {
        if (event.key === 'ArrowDown') {
          focusNextItem(focusedItem as string);
        } else if (event.key === 'ArrowUp') {
          focusPrevItem(focusedItem as string);
        } else if (event.key === 'Enter') {
          toggleItemSelection(focusedItem as string);
        }
      }) as KeyboardEventHandler<HTMLInputElement>,
      value: fieldValue,
      placeholder,
    },
    menuProps: {
      items: menu,
      isOpen: isMenuOpen,
      onSelect: (menuItem) => {
        toggleItemSelection(menuItem.id);
      },
      selectedItems: Array.from(selectedItems),
      focusedItem,
    } as MenuProps<T>,
  };
};

export default useDropdown;
