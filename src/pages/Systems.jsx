import { useState, useEffect } from 'react';
import { ShoppingCart, Users, Package, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

const Systems = () => {
  const [activeTab, setActiveTab] = useState('erp');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/data/${type}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Biznes Boshqaruv Markazi</h2>
          <p className="text-slate-600">ERP, CRM va WMS tizimlarining integratsiyalashgan paneli.</p>
        </div>
        <div className="flex bg-slate-200 p-1 rounded-xl">
          <TabButton active={activeTab === 'erp'} onClick={() => setActiveTab('erp')}>ERP</TabButton>
          <TabButton active={activeTab === 'crm'} onClick={() => setActiveTab('crm')}>CRM</TabButton>
          <TabButton active={activeTab === 'wms'} onClick={() => setActiveTab('wms')}>WMS</TabButton>
        </div>
      </header>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="animate-spin text-blue-600" size={48} />
          <p className="text-slate-500 font-medium">Ma'lumotlar yuklanmoqda...</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'erp' && data && <ERPPanel data={data} />}
          {activeTab === 'crm' && data && <CRMPanel data={data} />}
          {activeTab === 'wms' && data && <WMSPanel data={data} />}
        </div>
      )}

      {/* Auto-scaling Demo Simulation */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">
        <div className="relative z-10 space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <RefreshCw size={24} /> Bulutli Auto-scaling Simulyatsiyasi
          </h3>
          <p className="text-blue-100 max-w-2xl">
            Tizim yuklamasi 80% dan oshganda, Auto-scaling guruhi avtomatik ravishda yangi serverlarni ishga tushiradi 
            va Load Balancer trafikni ular o'rtasida taqsimlaydi.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ServerStatus id="srv-01" status="Online" load="42%" />
            <ServerStatus id="srv-02" status="Online" load="38%" />
            <ServerStatus id="srv-03" status="Scaling..." load="--" />
            <ServerStatus id="srv-04" status="Pending" load="--" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </section>
    </div>
  );
};

const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
      active ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
    }`}
  >
    {children}
  </button>
);

const ERPPanel = ({ data }) => (
  <div className="grid md:grid-cols-3 gap-6">
    <StatCard title="Yillik Budjet" value={data.budget} change="+12%" icon={<ShoppingCart className="text-blue-500" />} />
    <StatCard title="Xarajatlar" value={data.expenses} change="-5%" icon={<AlertCircle className="text-red-500" />} />
    <StatCard title="Sof Foyda" value={data.profit} change="+18%" icon={<CheckCircle2 className="text-green-500" />} />
    <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-slate-200">
      <h4 className="font-bold mb-4">Moliyaviy Operatsiyalar</h4>
      <div className="space-y-4">
        {data.transactions.map(item => (
          <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">#</div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs text-slate-500">{item.time}</p>
              </div>
            </div>
            <span className="font-bold text-green-600">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CRMPanel = ({ data }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <div className="bg-white p-6 rounded-2xl border border-slate-200">
      <h4 className="font-bold mb-4 flex items-center gap-2"><Users size={20} className="text-blue-600" /> Yangi Mijozlar</h4>
      <div className="space-y-4">
        {data.customers.map((customer, i) => (
          <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold">
              {customer.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold">{customer.name}</p>
              <p className="text-xs text-slate-500">{customer.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white p-6 rounded-2xl border border-slate-200">
      <h4 className="font-bold mb-4">Mijozlar faolligi</h4>
      <div className="h-40 flex items-end justify-between gap-2">
        {data.activity.map((h, i) => (
          <div key={i} className="w-full bg-blue-100 rounded-t-md relative group">
            <div style={{ height: `${h}%` }} className="bg-blue-500 rounded-t-md group-hover:bg-blue-600 transition-all"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const WMSPanel = ({ data }) => (
  <div className="grid md:grid-cols-3 gap-6">
    <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200">
      <h4 className="font-bold mb-4 flex items-center gap-2"><Package size={20} className="text-amber-600" /> Ombordagi mahsulotlar</h4>
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-500 text-sm border-b">
            <th className="pb-3">Mahsulot nomi</th>
            <th className="pb-3">Kategoriya</th>
            <th className="pb-3">Soni</th>
            <th className="pb-3">Holat</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.products.map((product, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-3 font-medium">{product.name}</td>
              <td className="py-3">{product.category}</td>
              <td className="py-3">{product.count}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  product.status === 'Yetarli' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'
                }`}>
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="bg-white p-6 rounded-2xl border border-slate-200">
      <h4 className="font-bold mb-4">Ombor yuklamasi</h4>
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path className="text-slate-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
          <path className="text-amber-500" strokeDasharray={`${data.storageLoad}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{data.storageLoad}%</span>
          <span className="text-[10px] text-slate-500 uppercase">To'lgan</span>
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className={`text-xs font-bold px-2 py-1 rounded ${change.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
        {change}
      </span>
    </div>
    <p className="text-slate-500 text-sm mb-1">{title}</p>
    <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
  </div>
);

const ServerStatus = ({ id, status, load }) => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl">
    <p className="text-[10px] text-blue-200 uppercase font-bold">{id}</p>
    <div className="flex justify-between items-center mt-1">
      <span className="text-xs font-semibold">{status}</span>
      <span className="text-xs text-blue-300">{load}</span>
    </div>
    <div className="w-full bg-white/20 h-1 mt-2 rounded-full overflow-hidden">
      <div style={{ width: load === '--' ? '0%' : load }} className="bg-white h-full transition-all duration-1000"></div>
    </div>
  </div>
);

export default Systems;
