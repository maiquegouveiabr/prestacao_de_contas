import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  btnText: string | React.ReactNode;
  placeholder?: string;
  label: string;
  required: boolean;
  disabled: boolean;
  type: React.HTMLInputTypeAttribute;
  onClick: (value: string) => void;
};

export default function InputWithButton({
  label,
  required,
  disabled,
  placeholder,
  type,
  btnText,
  onClick,
}: Props) {
  const [value, setValue] = useState("");

  const handleClick = () => {
    const stripped = value.trim().toUpperCase();
    if (!stripped) {
      return alert("Digite o nome da pessoa antes de adicionar.");
    }
    onClick(stripped);
    setValue("");
  };

  return (
    <div>
      {label && (
        <Label className="pb-2 text-[16px] font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="flex gap-2">
        <Input
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button
          disabled={disabled}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded cursor-pointer"
          type="submit"
          variant="outline"
          onClick={handleClick}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}
