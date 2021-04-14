import { Icon, Props as IconProps } from 'react-bootstrap-icons';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  classes?: string;
};

const ButtonTemplate = (({ children, classes, ...props }) => {
  return (
    <button
      type="button"
      className={`border-2 rounded-3 shadow ${classes}`}
      {...props}>
      {children}
    </button>
  );
}) as React.FC<ButtonProps>;

export const CloseButton = (({
  classes,
  ariaLabel = 'Close',
  children,
  ...props
}) => {
  return (
    <ButtonTemplate
      classes={`btn-close text-reset ${classes}`}
      {...props}
      aria-label={ariaLabel}>
      {children}
    </ButtonTemplate>
  );
}) as React.FC<ButtonProps & { ariaLabel?: string }>;

type ColoredButtonProps = ButtonProps & { color: string };

export const ColoredButton = (({ children, color, classes, ...props }) => {
  return (
    <ButtonTemplate classes={`btn btn-outline-${color} ${classes}`} {...props}>
      {children}
    </ButtonTemplate>
  );
}) as React.FC<ColoredButtonProps>;

export const ColoredIconButton = (({
  icon: Icon,
  iconProps,
  children,
  ...props
}) => {
  return (
    <ColoredButton {...props}>
      <Icon {...iconProps} />
    </ColoredButton>
  );
}) as React.FC<ColoredButtonProps & { icon: Icon; iconProps?: IconProps }>;
