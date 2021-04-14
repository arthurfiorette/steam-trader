import { If } from '../../if';

type InputProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  help?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  prefix?: string;
};

export const TextInput = (({
  type,
  title,
  help,
  inputProps,
  prefix,
  onChange
}) => {
  const [id, helpId] = generateId(prefix, title);
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
}) as React.FC<InputProps & { type: string }>;

export const CheckInput = (({ title, help, inputProps, prefix, onChange }) => {
  const [id, helpId] = generateId(prefix, title);
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
}) as React.FC<InputProps>;

function generateId(prefix: string = '', name: string) {
  const id = `${prefix}-${name.toLowerCase().replace(/ +/, '')}Id`;
  return [id, `${id}Help`];
}
