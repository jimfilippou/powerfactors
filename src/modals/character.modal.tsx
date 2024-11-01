import Modal from "../components/modal";

interface CharacterModalProps {
  character: DisneyCharacter | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose} title={character?.name || "Character Details"}>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-start">
          <img
            src={character?.imageUrl}
            alt={character?.name}
            className="w-32 h-32 rounded-lg object-cover bg-gray-100"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{character?.name}</h3>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">Films</h4>
            <div className="flex gap-2 flex-wrap">
              {character?.films?.map((film) => (
                <span key={film} className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-md">
                  {film}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          {(character?.videoGames?.length ?? 0) > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Video Game Appearances</h4>
              <div className="flex gap-2 flex-wrap">
                {character?.videoGames.map((game) => (
                  <span key={game} className="px-2 py-1 bg-purple-50 text-purple-700 text-sm rounded-md">
                    {game}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(character?.parkAttractions?.length ?? 0) > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Park Attractions</h4>
              <div className="flex gap-2 flex-wrap">
                {character?.parkAttractions.map((attraction) => (
                  <span key={attraction} className="px-2 py-1 bg-green-50 text-green-700 text-sm rounded-md">
                    {attraction}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
          <a
            href={character?.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            View Source
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
