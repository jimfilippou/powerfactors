interface TableProps {
  characters: DisneyCharacter[];
  onCharacterClick: (character: DisneyCharacter) => void;
}

function Table({ characters = [], onCharacterClick }: TableProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Participations in shows</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Participations in video games</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Allies</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Enemies</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {characters.map((character) => (
              <tr
                key={character._id}
                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150 ease-in-out"
                onClick={() => onCharacterClick(character)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{character.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{character.tvShows.length}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{character.videoGames.length}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{character.allies.length}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{character.enemies.length}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
