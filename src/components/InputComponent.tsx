import { Label } from "./ui/label";
import { Input } from "./ui/input";

type Props = {
  value: string | null;
  setValue: (value: string) => void;
  placeholder?: string;
  label: string;
  required: boolean;
  disabled: boolean;
  type: React.HTMLInputTypeAttribute;
};

export default function InputComponent({
  label,
  required,
  disabled,
  placeholder,
  type,
  value,
  setValue,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Allow empty value
    if (inputValue === "") {
      setValue("");
      return;
    }

    // Only allow digits and strip leading zeros
    if (/^\d+$/.test(inputValue)) {
      const normalized = inputValue.replace(/^0+/, "") || "0";
      setValue(normalized);
    }
  };

  return (
    <div>
      {label && (
        <Label className="pb-2 text-[16px] font-semibold">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Input
        type={type}
        min={0}
        placeholder={placeholder}
        value={value ?? ""}
        disabled={disabled}
        onWheel={(e) => e.currentTarget.blur()}
        onKeyDown={(e) => {
          if (["-", "+", "e", ".", ","].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={handleChange}
      />
    </div>
  );
}
