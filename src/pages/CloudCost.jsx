import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Server, Globe, Database, Shield, Zap, Calculator, Download } from 'lucide-react';

const CloudCost = () => {
  const [config, setConfig] = useState({
    instances: 2,
    instanceType: 't3.medium',
    storage: 100,
    traffic: 500,
    vpn: true,
    waf: false
  });

  const prices = {
    't3.small': 15,
    't3.medium': 30,
    't3.large': 60,
    storage_per_gb: 0.1,
    traffic_per_gb: 0.08,
    vpn_fixed: 36,
    waf_fixed: 25
  };

  const calculateTotal = () => {
    let total = 0;
    total += config.instances * prices[config.instanceType];
    total += config.storage * prices.storage_per_gb;
    total += config.traffic * prices.traffic_per_gb;
    if (config.vpn) total += prices.vpn_fixed;
    if (config.waf) total += prices.waf_fixed;
    return total.toFixed(2);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="text-center space-y-4">
        <h2 className="text-4xl font-black text-slate-900">Bulutli Xarajatlar Kalkulyatori</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Loyihangiz uchun zarur bo'lgan infratuzilma narxini oldindan hisoblang va budjetingizni optimallashtiring.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Calculator className="text-blue-600" /> Infratuzilma Sozlamalari
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Instances */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 flex justify-between">
                  Serverlar Soni <span>{config.instances} dona</span>
                </label>
                <input 
                  type="range" min="1" max="20" 
                  value={config.instances}
                  onChange={(e) => setConfig({...config, instances: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="grid grid-cols-3 gap-2">
                  {['t3.small', 't3.medium', 't3.large'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setConfig({...config, instanceType: type})}
                      className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${config.instanceType === type ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'}`}
                    >
                      {type.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 flex justify-between">
                  Ma'lumotlar Saqlash <span>{config.storage} GB</span>
                </label>
                <input 
                  type="range" min="20" max="2000" step="20"
                  value={config.storage}
                  onChange={(e) => setConfig({...config, storage: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Traffic */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-500 flex justify-between">
                  Oylik Trafik <span>{config.traffic} GB</span>
                </label>
                <input 
                  type="range" min="100" max="10000" step="100"
                  value={config.traffic}
                  onChange={(e) => setConfig({...config, traffic: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Security Toggles */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setConfig({...config, vpn: !config.vpn})}
                  className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${config.vpn ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-100 text-slate-400'}`}
                >
                  <Shield size={20} />
                  <span className="text-[10px] font-bold">VPN Tunnel</span>
                </button>
                <button 
                  onClick={() => setConfig({...config, waf: !config.waf})}
                  className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${config.waf ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-100 text-slate-400'}`}
                >
                  <Zap size={20} />
                  <span className="text-[10px] font-bold">WAF Protection</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-24">
            <h3 className="text-xl font-bold mb-8">Xarajatlar Hisoboti</h3>
            
            <div className="space-y-6">
              <SummaryRow label="Compute (EC2)" value={`$${(config.instances * prices[config.instanceType]).toFixed(2)}`} icon={<Server size={16} />} />
              <SummaryRow label="Storage (EBS)" value={`$${(config.storage * prices.storage_per_gb).toFixed(2)}`} icon={<Database size={16} />} />
              <SummaryRow label="Network (Transfer)" value={`$${(config.traffic * prices.traffic_per_gb).toFixed(2)}`} icon={<Globe size={16} />} />
              {config.vpn && <SummaryRow label="VPN Gateway" value={`$${prices.vpn_fixed.toFixed(2)}`} icon={<Shield size={16} />} />}
              {config.waf && <SummaryRow label="WAF Security" value={`$${prices.waf_fixed.toFixed(2)}`} icon={<Zap size={16} />} />}
              
              <div className="pt-6 border-t border-white/10">
                <p className="text-slate-400 text-sm mb-1 font-bold uppercase tracking-wider">Umumiy (Oylik)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-blue-400">${calculateTotal()}</span>
                  <span className="text-slate-400 font-bold">/oy</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                <Download size={20} /> Hisobotni yuklash (.pdf)
              </button>
              
              <p className="text-[10px] text-slate-500 text-center italic">
                * Narxlar taxminiy hisoblangan va mintaqaga qarab farq qilishi mumkin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, icon }) => (
  <div className="flex justify-between items-center text-sm font-medium">
    <div className="flex items-center gap-3 text-slate-400">
      {icon}
      <span>{label}</span>
    </div>
    <span className="text-white font-bold">{value}</span>
  </div>
);

export default CloudCost;
