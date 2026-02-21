import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import QuotationForm from './components/QuotationForm'
import AccessoriesPanel from './components/AccessoriesPanel'
import WoodworkPanel from './components/WoodworkPanel'
import InvoicePreview from './components/InvoicePreview'
import CustomerConfig from './components/CustomerConfig'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [accessories, setAccessories] = useState([]);
  const [woodWorkCost, setWoodWorkCost] = useState('');
  const [newAccName, setNewAccName] = useState('');
  const [newAccPrice, setNewAccPrice] = useState('');

  // Customer State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [quotationDate, setQuotationDate] = useState(new Date().toISOString().split('T')[0]);

  // Quotation Form State
  const [metalType, setMetalType] = useState('');
  const [material, setMaterial] = useState('');
  const [grade, setGrade] = useState('');
  const [size, setSize] = useState('');
  const [thk, setThk] = useState('');
  const [finish, setFinish] = useState('');
  const [usage, setUsage] = useState('');
  const [priceMode, setPriceMode] = useState('');
  const [standardPrice, setStandardPrice] = useState('');

  // Computed Values for Quotation
  const accessoriesPrice = accessories.reduce((sum, item) => sum + item.price, 0);
  // Assuming 5% VAT for accessories
  const accessoriesVAT = accessoriesPrice * 0.05; 
  
  // Calculate Material Price
  const sheetCount = parseInt(priceMode) || 1;
  const perSheetPrice = parseFloat(standardPrice) || 0;
  const matPrice = sheetCount * perSheetPrice;
  const materialVAT = matPrice * 0.05;

  // Calculate Wood Work Price
  const woodPrice = parseFloat(woodWorkCost) || 0;
  const woodVAT = woodPrice * 0.05;

  const totalCost = matPrice + accessoriesPrice + woodPrice;
  const totalVATAmount = materialVAT + accessoriesVAT + woodVAT;
  const totalCostWithVAT = totalCost + totalVATAmount;

  const quotationData = {
    customerName: customerName,
    customerEmail: customerEmail,
    customerPhone: customerPhone,
    quotationDate: quotationDate,
    metalType: metalType || '-',
    material: material || '-',
    grade: grade || '-',
    size: size || '-',
    thk: thk || '-',
    finish: finish || '-',
    usage: usage || '-',
    materialPrice: matPrice ? `OMR ${matPrice.toFixed(2)}` : '-',
    materialVAT: materialVAT ? `OMR ${(matPrice + materialVAT).toFixed(2)}` : '-',
    woodWorkPrice: woodPrice > 0 ? `OMR ${woodPrice.toFixed(2)}` : '-',
    woodWorkVAT: woodPrice > 0 ? `OMR ${(woodPrice + woodVAT).toFixed(2)}` : '-',
    accessories: accessories,
    accessoriesPrice: accessoriesPrice > 0 ? `OMR ${accessoriesPrice.toFixed(2)}` : '-',
    accessoriesVAT: accessoriesPrice > 0 ? `OMR ${(accessoriesPrice + accessoriesVAT).toFixed(2)}` : '-',
    totalCost: totalCost > 0 ? `OMR ${totalCost.toFixed(2)}` : '-',
    totalVATAmount: totalVATAmount > 0 ? `OMR ${totalVATAmount.toFixed(2)}` : '-',
    totalCostWithVAT: totalCostWithVAT > 0 ? `OMR ${totalCostWithVAT.toFixed(2)}` : '-'
  };

  const addAccessory = () => {
    if (newAccName.trim() && newAccPrice.trim()) {
      setAccessories([...accessories, { name: newAccName, price: Number(newAccPrice) }])
      setNewAccName('')
      setNewAccPrice('')
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col dark:bg-gray-900 transition-colors">
      <Header />

      <div className="flex-1 w-full flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN - Configuration Panel */}
        <div className={`w-full lg:w-1/2 h-full overflow-scroll scrollbar-hide border-r border-gray-200 p-4 ${activeTab === 'home' ? '' : 'hidden lg:block'}`}>
          <div className="flex flex-col gap-4">
            <QuotationForm 
              metalType={metalType} setMetalType={setMetalType}
              material={material} setMaterial={setMaterial}
              grade={grade} setGrade={setGrade}
              size={size} setSize={setSize}
              thk={thk} setThk={setThk}
              finish={finish} setFinish={setFinish}
              usage={usage} setUsage={setUsage}
              priceMode={priceMode} setPriceMode={setPriceMode}
              standardPrice={standardPrice} setStandardPrice={setStandardPrice}
            />
            
            <AccessoriesPanel 
              accessories={accessories}
              newAccName={newAccName}
              setNewAccName={setNewAccName}
              newAccPrice={newAccPrice}
              setNewAccPrice={setNewAccPrice}
              addAccessory={addAccessory}
            />

            <WoodworkPanel 
              woodWorkCost={woodWorkCost}
              setWoodWorkCost={setWoodWorkCost}
            />

            {/* Real-time Totals Display */}
            <div className="flex flex-col mt-2 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center bg-blue-50 dark:bg-gray-800 p-4 rounded-xl border border-blue-100 dark:border-gray-700 shadow-sm">
                 <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Total (excl. VAT)</span>
                    <span className="block text-lg font-semibold text-gray-700 dark:text-gray-300">OMR {totalCost?.toFixed(2) || '0.00'}</span>
                 </div>
                 <div className="text-right">
                    <span className="block text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-1">Grand Total (incl. 5% VAT)</span>
                    <span className="block text-2xl font-bold text-gray-900 dark:text-white">OMR {totalCostWithVAT?.toFixed(2) || '0.00'}</span>
                 </div>
              </div>
            </div>

            <div className='mb-15'></div>
          </div>
        </div>

        {/* RIGHT COLUMN - Invoice/Quotation Content */}
        <div className={`w-full lg:w-1/2 h-full overflow-y-auto p-4 ${activeTab === 'invoice' ? '' : 'hidden lg:block'}`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 dark:text-white">Quotation Preview</h2>
            <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">Enter customer details and generate PDF</p>
            
            <CustomerConfig 
                name={customerName} setName={setCustomerName}
                email={customerEmail} setEmail={setCustomerEmail}
                phone={customerPhone} setPhone={setCustomerPhone}
                date={quotationDate} setDate={setQuotationDate}
            />
          </div>
          <InvoicePreview quotation={quotationData} />
        </div>
      </div>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App
