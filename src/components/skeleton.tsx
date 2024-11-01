export default function TableLoadingSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Participations in shows
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Participations in video games
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Allies
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Enemies
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...Array(20)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-48"></div>
                </td>
                {[...Array(4)].map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-10"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
