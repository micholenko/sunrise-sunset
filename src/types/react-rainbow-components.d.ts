declare module 'react-rainbow-components' {
  import * as React from 'react';
  import { ComponentType, ReactNode } from 'react';

  interface ButtonProps {
    label?: string;
    variant?: 'base' | 'neutral' | 'brand' | 'outline-brand' | 'destructive' | 'success';
    size?: 'x-small' | 'small' | 'medium' | 'large';
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }

  interface CardProps {
    title?: string;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
  }

  interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    disabled?: boolean;
    error?: string;
  }

  interface SelectProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    children?: ReactNode;
    disabled?: boolean;
    error?: string;
  }

  interface OptionProps {
    name: string;
    label: string;
    disabled?: boolean;
  }

  interface BadgeProps {
    label: string;
    variant?: 'base' | 'inverse' | 'brand' | 'success' | 'warning' | 'error';
    size?: 'small' | 'medium' | 'large';
  }

  interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
    initials?: string;
  }

  interface SpinnerProps {
    size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
    variant?: 'base' | 'brand' | 'inverse';
  }

  interface DatePickerProps {
    label?: string;
    placeholder?: string;
    value?: string | Date | null;
    onChange?: (date: Date) => void;
    disabled?: boolean;
    error?: string;
    formatStyle?: 'small' | 'medium' | 'large';
    locale?: string;
    minDate?: Date;
    maxDate?: Date;
    onFocus?: () => void;
    onBlur?: () => void;
  }

  interface LookupProps {
    label?: string;
    placeholder?: string;
    value?: object | null;
    onChange?: (value: string) => void;
    options?: Array<{ label: string; value: string; description?: string }>;
    disabled?: boolean;
    error?: string;
    onSearch?: (searchTerm: string) => void;
    isLoading?: boolean;
    debounceTimeout?: number;
    children?: ReactNode;
  }

  export const Button: ComponentType<ButtonProps>;
  export const Card: ComponentType<CardProps>;
  export const Input: ComponentType<InputProps>;
  export const Select: ComponentType<SelectProps>;
  export const Option: ComponentType<OptionProps>;
  export const Badge: ComponentType<BadgeProps>;
  export const Avatar: ComponentType<AvatarProps>;
  export const Spinner: ComponentType<SpinnerProps>;
  export const DatePicker: ComponentType<DatePickerProps>;
  export const Lookup: ComponentType<LookupProps>;
}
