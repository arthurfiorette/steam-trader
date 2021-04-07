import If from '../../if';

type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  help?: string;
  required?: boolean;
};

type TextInputProps = InputProps & {
  type: string;
};

export function TextInput({ type, title, help, required, onChange }: TextInputProps) {
  const id = `${title.toLowerCase().replace(/ +/, '')}Id`;
  const helpId = `${id}Help`;
  return (
    <div className="form-floating mb-3">
      <input
        className="form-control"
        area-describedby={helpId}
        {...{ type, id, onChange, required }}
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

export function CheckInput({ title, help, required, onChange }: InputProps) {
  const id = `${title.toLowerCase().replace(/ +/, '')}Id`;
  const helpId = `${id}Help`;
  return (
    <div className="mb-3 form-check">
      <input
        className="form-check-input"
        type="checkbox"
        area-describedby={helpId}
        {...{ id, onChange, required }}
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
