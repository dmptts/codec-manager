import { useField } from 'formik';
import React, { LiHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ChevronIcon from './../img/icon-chevron.svg';
import { useClickOutside } from '../hooks/useClickOutside';

interface ISelectOption {
  value: string | number;
  label: string;
}

interface IAppSelect extends LiHTMLAttributes<HTMLLIElement> {
  name: string;
  id: string;
  options: ISelectOption[] | undefined;
  label?: string;
  className?: string;
}

export default function AppSelect({
  name,
  id,
  options,
  label,
  placeholder,
  className,
}: IAppSelect) {
  const [field] = useField(name);
  const [isOpened, setIsOpened] = useState(false);
  const [controlText, setControlText] = useState<string | null>(null);
  const selectRef = useRef(null);
  useClickOutside(selectRef, () => setIsOpened(false));

  const handleControlClick = () => setIsOpened(!isOpened);

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    field.onChange(e);
    setIsOpened(false);
  };

  useEffect(() => {
    setControlText(
      options?.find((option) => {
        return option.value.toString() === field.value.toString();
      })?.label ??
        placeholder ??
        'Выберите вариант'
    );
  }, [options, field.value, placeholder]);

  return (
    <Root className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Wrapper id={id} ref={selectRef}>
        <Select
          type="button"
          {...field}
          onClick={handleControlClick}
          $isOpened={isOpened}
        >
          {controlText} {!options && 'loading'}
        </Select>
        {options && (
          <OptionList $isOpened={isOpened}>
            {options.map((option, i) => (
              <li key={i}>
                <Option
                  type="button"
                  name={name}
                  value={option.value}
                  onClick={handleOptionClick}
                >
                  {option.label}
                </Option>
              </li>
            ))}
          </OptionList>
        )}
      </Wrapper>
    </Root>
  );
}

const Root = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  align-self: flex-start;

  margin-bottom: 17px;

  font-size: 1.125rem;
  font-weight: 700;
`;

const Select = styled.button<{ $isOpened: boolean }>`
  position: relative;

  width: 100%;
  padding: 11px 21px;

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75rem;
  text-align: left;

  background-color: #f9f9f9;
  border: 1px solid #e6e6e6;
  border-radius: 5px;

  &::placeholder {
    color: var(--color-text-secondary);
  }

  &::after {
    position: absolute;
    top: 50%;
    right: 30px;
    content: '';

    width: 15px;
    height: 8px;

    background-image: url(${ChevronIcon});
    background-size: 15px 8px;
    background-repet: no-repeat;

    transform: translateY(-50%)
      ${({ $isOpened }) => $isOpened && 'rotate(180deg)'};
  }
`;

const OptionList = styled.ul<{ $isOpened: boolean }>`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 1;

  display: ${({ $isOpened }) => ($isOpened ? 'block' : 'none')};
  width: 100%;
  max-height: 250px;
  margin: 0;
  padding: 0;

  border: 1px solid #e6e6e6;
  border-radius: 5px;
  list-style: none;
  overflow-x: scroll;

  li {
    border-bottom: 1px solid #e6e6e6;
  }

  li:first-child {
    border-radius: 5px 5px 0 0;
  }

  li:last-child {
    border: none;
    border-radius: 0 0 5px 5px;
  }
`;

const Option = styled.button`
  width: 100%;
  padding: 11px 21px;

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75rem;
  text-align: left;

  background-color: #f9f9f9;
  border: none;

  &:hover {
    background-color: #ffffff;
  }
`;
