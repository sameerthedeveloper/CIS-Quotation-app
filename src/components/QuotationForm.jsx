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
  metalType, setMetalType,
  material, setMaterial,
  grade, setGrade,
  size, setSize,
  thk, setThk,
  finish, setFinish,
  usage, setUsage,
  priceMode, setPriceMode,
  standardPrice, setStandardPrice
}) {
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
        </div>
      </div>
    </div>
  )
}
