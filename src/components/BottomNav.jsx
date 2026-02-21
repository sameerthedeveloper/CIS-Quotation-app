import { Home, FileText } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="w-full fixed bottom-0 bg-white dark:bg-gray-800 shadow-xl border-t border-gray-200 dark:border-gray-700 z-50 lg:hidden transition-colors">
      <div className="flex justify-around items-center py-3">
        {/* Home Tab */}
        <div 
          onClick={() => setActiveTab('home')} 
          id="tab-home"
          className={`flex flex-col items-center cursor-pointer transition-colors ${activeTab === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
        >
          <Home size={20} className="mb-1" />
          <span className="text-sm font-medium">Main</span>
        </div>

        {/* Invoice Tab */}
        <div 
          onClick={() => setActiveTab('invoice')} 
          id="tab-invoice"
          className={`flex flex-col items-center cursor-pointer transition-colors ${activeTab === 'invoice' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
        >
          <FileText size={20} className="mb-1" />
          <span className="text-sm font-medium">Invoice</span>
        </div>
      </div>
    </div>
  )
}

