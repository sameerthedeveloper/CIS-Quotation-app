export default function AccessoriesPanel({
  accessories,
  newAccName,
  setNewAccName,
  newAccPrice,
  setNewAccPrice,
  addAccessory
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-bold dark:text-gray-200">Accessories</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-3 py-2 text-left border-b dark:border-gray-600 font-medium">Accessory</th>
              <th className="px-3 py-2 text-left border-b dark:border-gray-600 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {accessories.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-3 py-4 text-center text-gray-400 text-xs italic">No accessories added yet</td>
              </tr>
            ) : (
              accessories.map((acc, index) => (
                <tr key={index} className="border-b dark:border-gray-600 last:border-b-0 dark:text-gray-300">
                  <td className="px-3 py-2">{acc.name}</td>
                  <td className="px-3 py-2">OMR {acc.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4">
        {/* Inputs Row */}
        <div className="flex gap-2">
          <input 
            value={newAccName}
            onChange={(e) => setNewAccName(e.target.value)}
            type="text"
            placeholder="Enter Accessory"
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
          />
  
          <input 
            value={newAccPrice}
            onChange={(e) => setNewAccPrice(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addAccessory()}
            type="number"
            placeholder="Enter Price"
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
          />
        </div>
  
        {/* Add Button */}
        <button 
          onClick={addAccessory} 
          className="w-full px-3 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray transition font-medium dark:bg-black dark:hover:bg-gray-900"
        >
          Add Accessory
        </button>
      </div>
    </div>
  )
}
