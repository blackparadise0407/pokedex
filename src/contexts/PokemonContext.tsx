import React from "react";

interface IPokemonContext {
  selectedId: number | null;
  select: (id: number) => void;
}

interface PokemonProviderProps {
  children: React.ReactNode;
}

const PokemonContext = React.createContext<IPokemonContext>({
  selectedId: null,
  select: () => {},
});

export default function PokemonProvider({ children }: PokemonProviderProps) {
  const [selectedId, setSelectedId] =
    React.useState<IPokemonContext["selectedId"]>(null);

  const handleSelect = React.useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        selectedId,
        select: handleSelect,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemonContext = () => React.useContext(PokemonContext);
