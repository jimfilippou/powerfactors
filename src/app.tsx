import { useDisneyCharacters } from "./hooks/useDisneyCharacters";
import { CharacterModal } from "./modals/character.modal";
import TableLoadingSkeleton from "./components/skeleton";
import TableToolbar from "./components/toolbar";
import PieChart from "./components/pie-chart";
import { useModal } from "./hooks/modal";
import Table from "./components/table";
import logo from "./assets/logo.png";
import { useMemo } from "react";

function App() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const { isOpen, open, close, state } = useModal<DisneyCharacter>();

  const {
    isPending,
    error,
    data: characterData,
  } = useDisneyCharacters({
    page: params.get("page") || "1",
    pageSize: params.get("pageSize") || "50",
    query: params.get("q") || "",
    field: params.get("field") || "character",
  });

  const charactersToRender = characterData
    ? Array.isArray(characterData.data)
      ? characterData.data
      : [characterData.data]
    : [];

  if (params.get("page") && isNaN(parseInt(params.get("page") || ""))) {
    return <div className="container mx-auto mt-10">Invalid page number</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mt-10 flex flex-col items-center">
      <small className="text-center">
        A take-home assignment by{" "}
        <a className="text-sky-600 hover:underline" href="https://jimfilippou.com" target="_blank">
          @jimfilippou
        </a>{" "}
      </small>
      <img src={logo} width={350} alt="" className="mx-auto" />

      {isPending ? (
        <>
          <TableToolbar totalPages={1} />
          <TableLoadingSkeleton />
        </>
      ) : (
        <>
          <PieChart characters={charactersToRender} />
          <TableToolbar totalPages={characterData.info.totalPages} />
          <Table onCharacterClick={(character) => open(character)} characters={charactersToRender} />
          <CharacterModal character={state} isOpen={isOpen} onClose={close} />
        </>
      )}
    </div>
  );
}

export default App;
