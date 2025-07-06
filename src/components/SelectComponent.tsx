import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

type Props = {
  placeholder?: string;
  label?: string;
  selectLabel?: string;
  value?: string;
  onChange?: (value: string) => void;
  items?: { label: string; value: number }[];
  required?: boolean;
  disabled?: boolean;
};

export default function SelectComponent({
  placeholder,
  label,
  selectLabel,
  items,
  onChange,
  value,
  required,
  disabled,
}: Props) {
  return (
    <div className="flex flex-col">
      {label && (
        <Label className="pb-2 text-[16px] font-semibold">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Select disabled={disabled} value={value} onValueChange={onChange}>
        <SelectTrigger className="min-w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="dark:bg-neutral-900 max-h-60">
          <SelectGroup>
            <SelectLabel>{selectLabel}</SelectLabel>
            {items?.length ? (
              items.map((item) => (
                <SelectItem key={item.value} value={String(item.value)}>
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value="no-options">
                No options available
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
