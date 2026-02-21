export default function WoodworkPanel({ woodWorkCost, setWoodWorkCost }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-bold dark:text-gray-200">Wood Work</h2>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Estimated Wood Work Cost (OMR)
        </label>
        <div className="flex gap-2">
          <input 
            value={woodWorkCost}
            onChange={(e) => setWoodWorkCost(e.target.value)}
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter Amount"
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
          />
        </div>
      </div>
    </div>
  )
}
