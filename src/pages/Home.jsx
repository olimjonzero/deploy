import { ArrowRight, ShoppingCart, Star, Tag, Truck, ShieldCheck, Zap, Download, X, Info, Search, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Hammasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/data/wms');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    setOrderStatus('processing');
    setTimeout(() => {
      setOrderStatus('success');
      setTimeout(() => {
        setOrderStatus(null);
        setSelectedProduct(null);
      }, 2000);
    }, 1500);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Hammasi' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Marketplace Hero */}
      <section className="relative h-[500px] rounded-[3rem] overflow-hidden bg-slate-900 flex items-center px-12">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
            alt="Clothing Wholesale"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 max-w-2xl space-y-6"
        >
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            Ulgurji Bozor №1
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            Kiyim-kechak <br />
            <span className="text-blue-500">Ulgurji Markazi</span>
          </h1>
          <p className="text-xl text-slate-300">
            Turkiya, Xitoy va O'zbekistonning eng yaxshi ishlab chiqaruvchilaridan 
            to'g'ridan-to'g'ri ulgurji narxlarda xarid qiling.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
              Katalogni ko'rish
            </button>
            <Link to="/infrastructure" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
              Texnik Hisobot
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Product Categories */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Mahsulot Kategoriyalari</h2>
            <p className="text-slate-500 dark:text-slate-400">Eng ommabop ulgurji yo'nalishlar</p>
          </div>
          <button 
            onClick={() => setSelectedCategory('Hammasi')}
            className={`font-bold flex items-center gap-2 transition-colors ${selectedCategory === 'Hammasi' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            Hammasini ko'rish <ArrowRight size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard 
            img="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=500" 
            name="Ustki kiyim" 
            count="1,200+ partiya" 
            isActive={selectedCategory === 'Ustki kiyim'}
            onClick={() => setSelectedCategory('Ustki kiyim')}
          />
          <CategoryCard 
            img="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=500" 
            name="Djinni shimlar" 
            count="850+ partiya" 
            isActive={selectedCategory === 'Djinni shimlar'}
            onClick={() => setSelectedCategory('Djinni shimlar')}
          />
          <CategoryCard 
            img="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500" 
            name="Ayollar liboslari" 
            count="2,400+ partiya" 
            isActive={selectedCategory === 'Ayollar liboslari'}
            onClick={() => setSelectedCategory('Ayollar liboslari')}
          />
          <CategoryCard 
            img="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=500" 
            name="Bolalar kiyimi" 
            count="900+ partiya" 
            isActive={selectedCategory === 'Bolalar kiyimi'}
            onClick={() => setSelectedCategory('Bolalar kiyimi')}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 dark:bg-slate-800/50 -mx-4 px-4 py-16 space-y-10 transition-colors">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                {selectedCategory === 'Hammasi' ? 'Yangi Kelgan Partiyalar' : `${selectedCategory} partiyalari`}
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Bugungi eng qaynoq takliflar</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Mahsulot qidirish..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <p className="col-span-3 text-center py-10 font-bold text-slate-400">Yuklanmoqda...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))
            ) : (
              <p className="col-span-3 text-center py-10 font-bold text-slate-400">Bu kategoriyada mahsulotlar topilmadi.</p>
            )}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden grid md:grid-cols-2"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="h-full min-h-[400px]">
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 md:p-12 space-y-6 overflow-y-auto max-h-[90vh]">
                <div className="space-y-2">
                  <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">{selectedProduct.origin} mahsuloti</span>
                  <h3 className="text-3xl font-black text-slate-900 leading-tight">{selectedProduct.name}</h3>
                </div>

                <div className="flex items-center gap-6 py-4 border-y border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Ulgurji Narx</p>
                    <p className="text-3xl font-black text-blue-600">{selectedProduct.price}</p>
                  </div>
                  <div className="h-10 w-px bg-slate-100"></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Min. Buyurtma</p>
                    <p className="text-xl font-bold text-slate-800">{selectedProduct.minOrder}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">{selectedProduct.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Material</p>
                      <p className="font-bold text-slate-800">{selectedProduct.material}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Kategoriya</p>
                      <p className="font-bold text-slate-800">{selectedProduct.category}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <button 
                    onClick={() => handleOrder(selectedProduct)}
                    disabled={orderStatus !== null}
                    className={`w-full py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 ${
                      orderStatus === 'success' 
                        ? 'bg-green-500 text-white shadow-green-500/20' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                    }`}
                  >
                    {orderStatus === 'processing' ? (
                      <> <Zap className="animate-spin" size={20} /> Tasdiqlanmoqda...</>
                    ) : orderStatus === 'success' ? (
                      <> <CheckCircle2 size={20} /> Buyurtma qabul qilindi!</>
                    ) : (
                      <> <ShoppingCart size={20} /> Savatga qo'shish</>
                    )}
                  </button>
                  <button className="w-full bg-slate-50 text-slate-600 py-5 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-3">
                    <Info size={20} /> Vendor bilan bog'lanish
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Platform Features (Connecting to BTEC) */}
      <section className="grid lg:grid-cols-2 gap-12 items-center bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-slate-900 leading-tight">
            Nega bizning <span className="text-blue-600">Bulutli Platformamiz?</span>
          </h2>
          <div className="grid gap-6">
            <BenefitItem 
              icon={<Zap className="text-amber-500" />} 
              title="Tezkor Buyurtma" 
              desc="Cloud CDN va Auto-scaling yordamida saytimiz har doim tez ishlaydi."
            />
            <BenefitItem 
              icon={<ShieldCheck className="text-green-500" />} 
              title="Xavfsiz To'lovlar" 
              desc="VPC izolatsiyasi va shifrlangan tarmoq orqali tranzaksiyalaringiz himoyalangan."
            />
            <BenefitItem 
              icon={<Truck className="text-blue-500" />} 
              title="Real-vaqt Monitoring" 
              desc="WMS tizimimiz orqali ombordagi qoldiqni soniyalar ichida ko'ra olasiz."
            />
          </div>
          <Link 
            to="/infrastructure" 
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
          >
            Texnik infratuzilmani o'rganish <ArrowRight size={18} />
          </Link>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" 
            alt="Warehouse Management"
            className="rounded-[2rem] shadow-2xl"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">Ombor Yuklamasi</p>
            <div className="h-2 bg-slate-100 rounded-full mb-2">
              <div className="w-4/5 h-full bg-blue-600 rounded-full"></div>
            </div>
            <p className="text-xl font-black text-slate-800">82% To'lgan</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ img, name, count, isActive, onClick }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={onClick}
    className={`group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${
      isActive ? 'ring-4 ring-blue-600 ring-offset-4 scale-[1.02]' : ''
    }`}
  >
    <img 
      src={img} 
      alt={name} 
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
    <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent transition-opacity ${isActive ? 'opacity-90' : 'opacity-70'}`}></div>
    <div className="absolute bottom-6 left-6 text-white">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-xs text-slate-300 font-medium">{count}</p>
    </div>
    {isActive && (
      <div className="absolute top-4 right-4 bg-blue-600 p-2 rounded-full text-white shadow-lg animate-in zoom-in duration-300">
        <Tag size={16} />
      </div>
    )}
  </motion.div>
);

const ProductCard = ({ product, onClick }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    onClick={onClick}
    className="bg-white rounded-[2rem] overflow-hidden shadow-md border border-slate-100 group cursor-pointer"
  >
    <div className="h-64 overflow-hidden relative">
      <img 
        src={product.img} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-800 shadow-sm">
        {product.origin}
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
          Batafsil ko'rish
        </span>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <h3 className="font-bold text-slate-900 text-lg leading-tight h-12 line-clamp-2">{product.name}</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Ulgurji Narx</p>
          <p className="text-2xl font-black text-blue-600">{product.price}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 font-bold uppercase">Min. Buyurtma</p>
          <p className="font-bold text-slate-800">{product.minOrder}</p>
        </div>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); alert("Savatga qo'shildi!"); }}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
      >
        <ShoppingCart size={18} /> Savatga qo'shish
      </button>
    </div>
  </motion.div>
);

const BenefitItem = ({ icon, title, desc }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Home;
