import If from '../../if';

type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  help?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

type TextInputProps = InputProps & {
  type: string;
};

export function TextInput({
  type,
  title,
  help,
  inputProps,
  onChange
}: TextInputProps) {
  const id = `${title.toLowerCase().replace(/ +/, '')}Id`;
  const helpId = `${id}Help`;
  return (
    <div className="form-floating mb-3">
      <input
        className="form-control"
        area-describedby={helpId}
        {...{ type, id, onChange, ...inputProps }}
        placeholder=" "
        style={{ borderRadius: '1rem' }}
      />
      <label className="form-label" htmlFor={id}>
        {title}
      </label>
      <If test={!!help}>
        <div className="form-text" id={helpId}>
          {help}
        </div>
      </If>
    </div>
  );
}

export function CheckInput({ title, help, inputProps, onChange }: InputProps) {
  const id = `${title.toLowerCase().replace(/ +/, '')}Id`;
  const helpId = `${id}Help`;
  return (
    <div className="mb-3 form-check">
      <input
        className="form-check-input"
        type="checkbox"
        area-describedby={helpId}
        {...{ id, onChange, ...inputProps }}
      />
      <label className="form-check-label" htmlFor={id}>
        {title}
      </label>
      <If test={!!help}>
        <div className="form-text" id={helpId}>
          {help}
        </div>
      </If>
    </div>
  );
}

export function getInput(type: string) {
  switch (type) {
    case 'checkbox':
      return CheckInput;
    default:
      return TextInput;
  }
}
