import React from "react";
import { XIcon } from "lucide-react";

type Props = {
  data: {
    id: number;
    value: string;
  }[];
  onDelete: (id: number) => void;
};

function List({ data, onDelete }: Props) {
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white flex items-center justify-between p-2 rounded"
          >
            <div className="w-[80%] text-left">
              <span className="text-black font-semibold">{item.value}</span>
            </div>
            <div>
              <XIcon
                onClick={() => onDelete(item.id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(List);
