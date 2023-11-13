import React, { useState, useEffect } from "react";
import styled from "styled-components";

type OptionProps = {
  label: string;
  value: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
};

type RadioProps = {
  columns?: number;
  rows?: number;
  defaultValue: string;
  onSelect?: (value: string) => void;
  options: OptionProps[];
};

const RadioGroup = styled.div<{
  rows?: number;
  columns?: number;
}>`
  display: flex;
  flex-wrap: wrap;
  ${(props) =>
    props.rows && props.rows > 0
      ? `
      flex-direction: column;
      height: 100%;
      `
      : props.columns && props.columns > 0
      ? `
      width: 100%;`
      : null};
`;

const Radio = styled.label<{
  disabled?: boolean;
  columns?: number;
  rows?: number;
}>`
  /* styles remain the same */
`;

export default function RadioComponent(props: RadioProps) {
  const [selected, setSelected] = useState(props.defaultValue);

  useEffect(() => {
    if (props.rows && props.columns && props.rows > 0 && props.columns > 0) {
      console.error(
        "Please pass either rows prop or column prop but not both.",
      );
    }
  }, [props]);

  useEffect(() => {
    setSelected(props.defaultValue);
  }, [props.defaultValue]);

  const onChangeHandler = (value: string) => {
    setSelected(value);
    props.onSelect && props.onSelect(value);
  };

  return (
    <RadioGroup
      rows={props.rows}
      columns={props.columns}
      onChange={(e: any) => onChangeHandler(e.target.value)}
      className={props.className}
    >
      {props.options.map((option: OptionProps, index: number) => (
        <Radio
          key={index}
          columns={props.columns}
          rows={props.rows}
          disabled={props.disabled || option.disabled}
        >
          {option.label}
          <input
            type="radio"
            value={option.value}
            disabled={props.disabled || option.disabled}
            onChange={(e) => option.onSelect && option.onSelect(e.target.value)}
            checked={selected === option.value}
            name="radio"
          />
          <span className="checkbox"></span>
        </Radio>
      ))}
    </RadioGroup>
  );
}
