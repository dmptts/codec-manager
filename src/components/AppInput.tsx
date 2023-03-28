import { useField } from 'formik';
import { ChangeEventHandler, InputHTMLAttributes } from 'react';

interface IAppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label?: string;
}

export default function AppInput({
  name,
  id,
  label,
  onChange,
  ...rest
}: IAppInputProps) {
  const [field, meta] = useField(name);

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input {...field} {...rest} onChange={onChange ?? field.onChange} />
      {meta.error && <div>{meta.error}</div>}
    </div>
  );
}
