import { useField } from 'formik';
import { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

interface IAppTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

export default function AppTextArea({
  name,
  label,
  id,
  ...rest
}: IAppTextAreaProps) {
  const [field, meta] = useField(name);

  return (
    <Root>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TextArea id={id} {...rest} {...field} />
      {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Root>
  );
}

const Root = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding-bottom: 26px;
`;

const Label = styled.label`
  align-self: flex-start;

  margin-bottom: 17px;

  font-size: 1.125rem;
  font-weight: 700;
`;

const TextArea = styled.textarea`
  padding: 11px 21px;

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75rem;

  background-color: #f9f9f9;
  border: 1px solid #e6e6e6;
  border-radius: 5px;

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;

  margin: 0;

  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-error);
`;
