import { useField } from 'formik';
import React, { LiHTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';

interface ISelectOption {
  value: string | number;
  label: string;
}

interface IAppSelect extends LiHTMLAttributes<HTMLLIElement> {
  name: string;
  options: ISelectOption[] | undefined;
}

export default function AppSelect({ name, options }: IAppSelect) {
  const [field] = useField(name);
  const [isOpened, setIsOpened] = useState(false);
  const [controlText, setControlText] = useState('Выберите ченить');

  const handleControlClick = () => setIsOpened(!isOpened);

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    field.onChange(e);
    setIsOpened(false);
  };

  useEffect(() => {
    setControlText(
      options?.find((option) => {
        return option.value.toString() === field.value.toString();
      })?.label ?? 'Тест'
    );
  }, [options, field.value]);

  return (
    <Root>
      <button type="button" {...field} onClick={handleControlClick}>
        {controlText} {!options && 'loading'}
      </button>
      {options && (
        <OptionList $isOpened={isOpened}>
          {options.map((option, i) => (
            <li key={i}>
              <button
                type="button"
                name={name}
                value={option.value}
                onClick={handleOptionClick}
              >
                {option.label}
              </button>
            </li>
          ))}
        </OptionList>
      )}
    </Root>
  );
}

const Root = styled.div`
  position: relative;
`;

const OptionList = styled.ul<{ $isOpened: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;

  display: ${({ $isOpened }) => ($isOpened ? 'block' : 'none')};
  width: 100%;

  background-color: lightgray;
`;
