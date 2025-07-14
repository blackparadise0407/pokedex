import { getTypeBg } from "../helpers/common";

interface TypeTagProps {
  data: PokemonType;
}

export default function TypeTag({ data }: TypeTagProps) {
  return (
    <div
      className="px-2 text-sm font-medium rounded-sm bg-slate-950"
      style={{ backgroundColor: getTypeBg(data.name) }}
    >
      {data.name}
    </div>
  );
}
