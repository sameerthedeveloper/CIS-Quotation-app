import { useState, useMemo } from 'react';

const MATERIAL_DATA = [
  { metalType: "Stainless Steel", material: "Sheet", grade: 201, size: "2440x1220 mm", thk: "0.8 mm", finish: "Brush" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 201, size: "2440x1220 mm", thk: "1.0 mm", finish: "Brush" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 201, size: "2440x1220 mm", thk: "1.2 mm", finish: "Brush" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 201, size: "2440x1220 mm", thk: "2.0 mm", finish: "Brush" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 201, size: "2440x1220 mm", thk: "0.8 mm", finish: "Mirror" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 201, size: "2440x1220 mm", thk: "1.0 mm", finish: "Mirror" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 201, size: "2440x1220 mm", thk: "1.2 mm", finish: "Mirror" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 201, size: "2440x1220 mm", thk: "2.0 mm", finish: "Mirror" },

  { metalType: "Stainless Steel", material: "Sheet", grade: 304, size: "2440x1220 mm", thk: "0.8 mm", finish: "Brush" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 304, size: "2440x1220 mm", thk: "1.0 mm", finish: "Brush" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 304, size: "2440x1220 mm", thk: "1.2 mm", finish: "Brush" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 304, size: "2440x1220 mm", thk: "2.0 mm", finish: "Brush" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 304, size: "2440x1220 mm", thk: "0.8 mm", finish: "Mirror" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 304, size: "2440x1220 mm", thk: "1.0 mm", finish: "Mirror" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 304, size: "2440x1220 mm", thk: "1.2 mm", finish: "Mirror" },
  { metalType: "Stainless Steel", material: "Sheet", grade: 304, size: "2440x1220 mm", thk: "2.0 mm", finish: "Mirror" },

  { metalType: "Stainless Steel", material: "Pipe", grade: 201, size: "25 mm", thk: "1.2 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Pipe", grade: 201, size: "38 mm", thk: "1.2 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Pipe", grade: 201, size: "50 mm", thk: "1.5 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Pipe", grade: 304, size: "25 mm", thk: "1.2 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Pipe", grade: 304, size: "38 mm", thk: "1.2 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Pipe", grade: 304, size: "50 mm", thk: "1.5 mm", finish: "Matte" },

  { metalType: "Stainless Steel", material: "Rod", grade: 201, size: "8 mm", thk: "Solid", finish: "Polish" },
  { metalType: "Stainless Steel", material: "Rod", grade: 201, size: "10 mm", thk: "Solid", finish: "Polish" },
  { metalType: "Stainless Steel", material: "Rod", grade: 201, size: "12 mm", thk: "Solid", finish: "Polish" },
  { metalType: "Stainless Steel", material: "Rod", grade: 304, size: "8 mm", thk: "Solid", finish: "Polish" },
  { metalType: "Stainless Steel", material: "Rod", grade: 304, size: "10 mm", thk: "Solid", finish: "Polish" },
  { metalType: "Stainless Steel", material: "Rod", grade: 304, size: "12 mm", thk: "Solid", finish: "Polish" },

  { metalType: "Stainless Steel", material: "Angle", grade: 201, size: "25x25 mm", thk: "3 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Angle", grade: 201, size: "40x40 mm", thk: "3 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Angle", grade: 304, size: "25x25 mm", thk: "3 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Angle", grade: 304, size: "40x40 mm", thk: "3 mm", finish: "Matte" },

  { metalType: "Stainless Steel", material: "Flat", grade: 201, size: "25 mm", thk: "3 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Flat", grade: 201, size: "40 mm", thk: "5 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Flat", grade: 304, size: "25 mm", thk: "3 mm", finish: "Matte" },
  { metalType: "Stainless Steel", material: "Flat", grade: 304, size: "40 mm", thk: "5 mm", finish: "Matte" }
];

export default function QuotationForm({
  materials: addedMaterials,
  setMaterials: setAddedMaterials
}) {
  // Local state for the material being built
  const [metalType, setMetalType] = useState('');
  const [material, setMaterial] = useState('');
  const [grade, setGrade] = useState('');
  const [size, setSize] = useState('');
  const [thk, setThk] = useState('');
  const [finish, setFinish] = useState('');
  const [usage, setUsage] = useState('');
  const [priceMode, setPriceMode] = useState('');
  const [standardPrice, setStandardPrice] = useState('');

  const metalTypes = useMemo(() => [...new Set(MATERIAL_DATA.map(item => item.metalType))], []);
  
  const materials = useMemo(() => 
    [...new Set(MATERIAL_DATA.filter(i => !metalType || i.metalType === metalType).map(item => item.material))],
    [metalType]
  );

  const grades = useMemo(() => 
    [...new Set(MATERIAL_DATA.filter(i => 
      (!metalType || i.metalType === metalType) &&
      (!material || i.material === material)
    ).map(item => item.grade))],
    [metalType, material]
  );

  const sizes = useMemo(() => 
    [...new Set(MATERIAL_DATA.filter(i => 
      (!metalType || i.metalType === metalType) &&
      (!material || i.material === material) &&
      (!grade || String(i.grade) === String(grade))
    ).map(item => item.size))],
    [metalType, material, grade]
  );

  const thks = useMemo(() => 
    [...new Set(MATERIAL_DATA.filter(i => 
      (!metalType || i.metalType === metalType) &&
      (!material || i.material === material) &&
      (!grade || String(i.grade) === String(grade)) &&
      (!size || i.size === size)
    ).map(item => item.thk))],
    [metalType, material, grade, size]
  );

  const finishes = useMemo(() => 
    [...new Set(MATERIAL_DATA.filter(i => 
      (!metalType || i.metalType === metalType) &&
      (!material || i.material === material) &&
      (!grade || String(i.grade) === String(grade)) &&
      (!size || i.size === size) &&
      (!thk || i.thk === thk)
    ).map(item => item.finish))],
    [metalType, material, grade, size, thk]
  );

  const handleMetalTypeChange = (e) => {
    setMetalType(e.target.value);
    setMaterial('');
    setGrade('');
    setSize('');
    setThk('');
    setFinish('');
  };

  const handleMaterialChange = (e) => {
    setMaterial(e.target.value);
    setGrade('');
    setSize('');
    setThk('');
    setFinish('');
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
    setSize('');
    setThk('');
    setFinish('');
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
    setThk('');
    setFinish('');
  };

  const handleThkChange = (e) => {
    setThk(e.target.value);
    setFinish('');
  };

  const addMaterial = () => {
    if (metalType && material && standardPrice) {
      const newMaterial = {
        id: Date.now().toString(),
        metalType,
        material,
        grade,
        size,
        thk,
        finish,
        usage,
        priceMode,
        standardPrice
      };
      setAddedMaterials([...addedMaterials, newMaterial]);
      
      // Reset form
      setMetalType('');
      setMaterial('');
      setGrade('');
      setSize('');
      setThk('');
      setFinish('');
      setUsage('');
      setPriceMode('');
      setStandardPrice('');
    }
  };

  const removeMaterial = (id) => {
    setAddedMaterials(addedMaterials.filter(mat => mat.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-gray-700 font-bold mb-4 dark:text-gray-200">Material Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Metal Type</label>
          <select 
            value={metalType}
            onChange={handleMetalTypeChange}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none"
          >
            <option value="">Select the Metal Type</option>
            {metalTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Material</label>
          <select 
            value={material}
            onChange={handleMaterialChange}
            disabled={!metalType && metalTypes.length > 0}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none disabled:opacity-50"
          >
            <option value="">Select the Material</option>
            {materials.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Grade</label>
          <select 
            value={grade}
            onChange={handleGradeChange}
            disabled={!material && materials.length > 0}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none disabled:opacity-50"
          >
            <option value="">Select The Grade</option>
            {grades.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Size</label>
          <select 
            value={size}
            onChange={handleSizeChange}
            disabled={!grade && grades.length > 0}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none disabled:opacity-50"
          >
            <option value="">Select the Size</option>
            {sizes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Thickness</label>
          <select 
            value={thk}
            onChange={handleThkChange}
            disabled={!size && sizes.length > 0}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none disabled:opacity-50"
          >
            <option value="">Select the Thickness</option>
            {thks.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Finish</label>
          <select 
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            disabled={!thk && thks.length > 0}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none disabled:opacity-50"
          >
            <option value="">Select the Finish</option>
            {finishes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Price Settings</label>
          <div className="flex gap-2">
            <select 
              value={priceMode} 
              onChange={(e) => setPriceMode(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none"
            >
              <option value="">Select the Price</option>
              <option value="Standard">Standard</option>
              <option value="Custom">Custom</option>
            </select>
    
            <input 
              type="number"
              value={standardPrice}
              onChange={(e) => setStandardPrice(e.target.value)}
              placeholder="Set The Standard Price"
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            />
          </div>
        </div> */}

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Sheet Configuration</label>
          <div className="flex gap-2">
            <input  type='number'
              value={priceMode} 
              placeholder='Enter The Sheet Count'
              onChange={(e) => setPriceMode(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none"
            />
             

    
            <input 
              type="number"
              value={standardPrice}
              onChange={(e) => setStandardPrice(e.target.value)}
              placeholder="Enter the Per Sheet Price"
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Usage</label>
          <select 
            value={usage} 
            onChange={(e) => setUsage(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none appearance-none"
          >
            <option value="">Select the Usage</option>
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="100">100%</option>
          </select>
        <div className="flex flex-col md:col-span-2 mt-4">
          <button 
            type="button"
            onClick={addMaterial}
            disabled={!metalType || !material || !standardPrice}
            className="w-full px-4 py-2.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed dark:bg-black dark:hover:bg-gray-900"
          >
            Add Material
          </button>
        </div>
      </div>
      </div>

      {/* Added Materials Table */}
      <div className="mt-8 border-t border-gray-100 dark:border-gray-700 pt-6">
        <h3 className="text-gray-700 font-bold mb-4 dark:text-gray-200">Added Materials</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-3 py-2 text-left border-b dark:border-gray-600 font-medium whitespace-nowrap">Material</th>
                <th className="px-3 py-2 text-left border-b dark:border-gray-600 font-medium whitespace-nowrap">Format</th>
                <th className="px-3 py-2 text-center border-b dark:border-gray-600 font-medium whitespace-nowrap">Settings</th>
                <th className="px-3 py-2 text-right border-b dark:border-gray-600 font-medium whitespace-nowrap">Cost</th>
                <th className="px-3 py-2 text-center border-b dark:border-gray-600 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {addedMaterials.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-3 py-6 text-center text-gray-400 text-xs italic">No materials added to configuration yet</td>
                </tr>
              ) : (
                addedMaterials.map((mat) => {
                  const items = parseInt(mat.priceMode) || 1;
                  const price = parseFloat(mat.standardPrice) || 0;
                  const subtotal = items * price;

                  return (
                    <tr key={mat.id} className="border-b dark:border-gray-600 last:border-b-0 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-800 dark:text-gray-200">{mat.metalType}</div>
                        <div className="text-xs text-gray-500">{mat.grade} • {mat.finish}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium">{mat.material}</div>
                        <div className="text-xs text-gray-500">{mat.size} • {mat.thk}</div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-300">
                          {items} @ OMR {price}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right font-medium">
                        OMR {(subtotal).toFixed(2)}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <button 
                          onClick={() => removeMaterial(mat.id)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1"
                          title="Remove Material"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
