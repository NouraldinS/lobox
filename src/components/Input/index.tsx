import React, {
  ForwardedRef, InputHTMLAttributes, forwardRef, useState,
} from 'react';
import classNames from 'classnames';
import useStyles from './useStyles';
import { callAllWithArgs } from '../../utils/function';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLElement, InputProps>((props, ref) => {
  const {
    children, wrapperClassName, onFocus, onBlur, ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const allOnFocusHandlers = callAllWithArgs<React.FocusEvent<HTMLInputElement>>([
    onFocus,
    () => setIsFocused(true),
  ]);
  const allOnBlurHandlers = callAllWithArgs<React.FocusEvent<HTMLInputElement>>([
    onBlur,
    () => setIsFocused(false),
  ]);
  const classes = useStyles();
  return (
    <div
      className={classNames(wrapperClassName, { isFocused }, classes.wrapper)}
      ref={ref as ForwardedRef<HTMLDivElement>}
    >
      <input
        {...rest}
        className={classNames(props.className, classes.input)}
        onFocus={allOnFocusHandlers}
        onBlur={allOnBlurHandlers}
      />
      {children}
    </div>
  );
});

export default Input;
