import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  Trash2, 
  Edit, 
  TrendingUp, 
  Users, 
  DollarSign, 
  AlertCircle,
  CheckCircle2,
  Search
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Mock data for local development (when backend is not running)
const MOCK_PRODUCTS = [
  { 
    id: 1,
    name: "Erkaklar Klassik Kostyumi (Premium)", 
    category: "Ustki kiyim", 
    count: "450", 
    status: "Yetarli", 
    price: "$45.00",
    origin: "Turkiya",
    material: "100% Jun",
    description: "Turkiyaning eng sifatli matolaridan tayyorlangan premium klassik kostyum.",
    img: "https://images.unsplash.com/photo-1594932224828-b4b059b6ff6f?auto=format&fit=crop&q=80&w=500",
    minOrder: "10 dona"
  },
  { 
    id: 2,
    name: "Ayollar Bahorgi Trenchi", 
    category: "Ustki kiyim", 
    count: "1120", 
    status: "Yetarli", 
    price: "$28.00",
    origin: "Xitoy",
    material: "Paxta",
    description: "Zamonaviy dizayndagi ayollar trenchi.",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=500",
    minOrder: "12 dona"
  },
  { 
    id: 3,
    name: "Slim Fit Djinni Shim (Vintage)", 
    category: "Djinni shimlar", 
    count: "890", 
    status: "Yetarli", 
    price: "$18.00",
    origin: "O'zbekiston",
    material: "Denim",
    description: "Sifatli va hamyonbop denim shimlar.",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500",
    minOrder: "50 dona"
  },
  { 
    id: 4,
    name: "Kechki Ipak Libosi", 
    category: "Ayollar liboslari", 
    count: "150", 
    status: "Kam qolgan", 
    price: "$65.00",
    origin: "Turkiya",
    material: "Ipak",
    description: "Bayramlar va tantanali tadbirlar uchun maxsus oqshom libosi.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500",
    minOrder: "5 dona"
  },
  { 
    id: 5,
    name: "Bolalar Paxtali Kombinezoni", 
    category: "Bolalar kiyimi", 
    count: "600", 
    status: "Yetarli", 
    price: "$12.00",
    origin: "O'zbekiston",
    material: "100% Paxta",
    description: "Chaqaloqlar uchun yumshoq va xavfsiz kiyimlar.",
    img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=500",
    minOrder: "30 dona"
  }
];

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/data/wms');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.warn('Falling back to mock data:', error);
        setProducts(MOCK_PRODUCTS); // Use mock if API fails
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-12 transition-colors">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <LayoutDashboard className="text-blue-600" /> Admin Boshqaruv Paneli
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Marketplace va logistika jarayonlarini nazorat qilish</p>
        </div>
        <button 
          onClick={() => alert("Yangi mahsulot qo'shish oynasi (Hali tayyor emas)")}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} /> Yangi mahsulot qo'shish
        </button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Jami Sotuvlar" value="$124,500" change="+14%" icon={<DollarSign className="text-green-600" />} />
        <StatCard title="Faol Mijozlar" value="1,240" change="+8%" icon={<Users className="text-blue-600" />} />
        <StatCard title="Ombordagi Tovar" value="4,850" change="-2%" icon={<Package className="text-amber-600" />} />
        <StatCard title="O'sish Ko'rsatkichi" value="22.4%" change="+5%" icon={<TrendingUp className="text-indigo-600" />} />
      </div>

      {/* Tabs */}
      <div className="flex bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 w-fit transition-colors">
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          Invertar
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          Buyurtmalar
        </button>
      </div>

      {activeTab === 'inventory' ? (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Mahsulotlar Ro'yxati</h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Mahsulot yoki kategoriya..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Mahsulot</th>
                  <th className="px-8 py-4">Kategoriya</th>
                  <th className="px-8 py-4">Zaxira</th>
                  <th className="px-8 py-4">Narx</th>
                  <th className="px-8 py-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-bold">Yuklanmoqda...</td>
                  </tr>
                ) : filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={product.img} alt="" className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{product.name}</p>
                          <p className="text-xs text-slate-400">{product.origin}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-xs font-bold">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${product.status === 'Yetarli' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{product.count} dona</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-900 dark:text-white">{product.price}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => alert("Tahrirlash: " + product.name)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => alert("O'chirish: " + product.name)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-20 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 text-center space-y-4 transition-colors">
          <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Barcha buyurtmalar bajarilgan</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Hozirda yangi yoki kechiktirilgan buyurtmalar mavjud emas.</p>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
    <div className="space-y-1">
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2">
        <h4 className="text-2xl font-black text-slate-900">{value}</h4>
        <span className={`text-[10px] font-bold ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
    </div>
    <div className="bg-slate-50 p-4 rounded-2xl">
      {icon}
    </div>
  </div>
);

export default Admin;
