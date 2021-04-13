import If from '../../if';

type InputProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  help?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  idPrefix?: string;
};

type TextInputProps = InputProps & {
  type: string;
};

export function TextInput({
  type,
  title,
  help,
  inputProps,
  idPrefix = '',
  onChange
}: TextInputProps) {
  const [id, helpId] = generateId(idPrefix, title);
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

export function CheckInput({
  title,
  help,
  inputProps,
  idPrefix = '',
  onChange
}: InputProps) {
  const [id, helpId] = generateId(idPrefix, title);
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

function generateId(prefix: string, name: string) {
  const id = `${prefix}-${name.toLowerCase().replace(/ +/, '')}Id`;
  return [id, `${id}Help`];
}
