import { Icon } from 'react-bootstrap-icons';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  classes?: string;
};

type CloseButtonProps = ButtonProps & {
  classes?: string;
  ariaLabel?: string;
};

type ColoredButtonProps = ButtonProps & {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
};

type IconButtonProps = ColoredButtonProps & {
  icon: Icon;
};

function ButtonTemplate({ children, classes, ...props }: ButtonProps) {
  return (
    <button type="button" className={`border-2 rounded-3 shadow ${classes}`} {...props}>
      {children}
    </button>
  );
}

export function CloseButton({ children, classes = '', ariaLabel = 'Close', ...props }: CloseButtonProps) {
  return (
    <ButtonTemplate classes={`btn-close text-reset ${classes}`} {...props} aria-label={ariaLabel}>
      {children}
    </ButtonTemplate>
  );
}

export function ColoredButton({ children, color = 'primary', classes = '', ...props }: ColoredButtonProps) {
  return (
    <ButtonTemplate classes={`btn btn-outline-${color}`} {...props}>
      {children}
    </ButtonTemplate>
  );
}

export function SuccessButton({ children, ...props }: ButtonProps) {
  return (
    <ColoredButton {...props} color="success">
      {children}
    </ColoredButton>
  );
}

export function DarkButton({ children, ...props }: ButtonProps) {
  return (
    <ColoredButton {...props} color="dark">
      {children}
    </ColoredButton>
  );
}

export function DangerButton({ children, ...props }: ButtonProps) {
  return (
    <ColoredButton {...props} color="danger">
      {children}
    </ColoredButton>
  );
}

export function IconButton({ children, icon: Icon, ...props }: IconButtonProps) {
  return (
    <ColoredButton {...props}>
      <Icon>{children}</Icon>
    </ColoredButton>
  );
}
