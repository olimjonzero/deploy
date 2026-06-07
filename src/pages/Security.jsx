import { ShieldCheck, Lock, Link as LinkIcon, Wifi, Globe, Play, XCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Security = () => {
  const [testPort, setTestPort] = useState('80');
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const runFirewallTest = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      const allowed = ['80', '443'].includes(testPort);
      setTestResult(allowed ? 'allowed' : 'blocked');
      setIsTesting(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900">Tarmoq Xavfsizligi</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Bulutli muhitda xavfsizlik "Shared Responsibility" modeliga asoslanadi. 
          Biz tarmoq darajasidagi barcha himoya qatlamlarini nazorat qilamiz.
        </p>
      </section>

      {/* Firewall Simulator */}
      <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-green-600" /> Security Group Simulyatori
            </h3>
            <p className="text-slate-600">
              Quyidagi portlarni tekshirib ko'ring. Bizning firewall qoidalarimizga ko'ra, 
              faqat Web trafik (80, 443) hamma uchun ochiq. SSH (22) va DB (3306) portlari 
              faqat ofis IP manzillari uchun cheklangan.
            </p>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Port raqami (masalan: 80, 22, 3306)"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={testPort}
                onChange={(e) => setTestPort(e.target.value)}
              />
              <button 
                onClick={runFirewallTest}
                disabled={isTesting}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {isTesting ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} />} Tekshirish
              </button>
            </div>
            
            <AnimatePresence>
              {testResult && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-xl flex items-center gap-3 font-bold ${
                    testResult === 'allowed' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                  }`}
                >
                  {testResult === 'allowed' ? <CheckCircle /> : <XCircle />}
                  Port {testPort}: {testResult === 'allowed' ? 'Ruxsat berilgan (Traffic Allowed)' : 'Bloklangan (Access Denied)'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Lock size={18} className="text-blue-400" /> Inbound Rules (SG)
            </h4>
            <div className="space-y-4 relative z-10">
              <RuleRow port="80" service="HTTP" source="0.0.0.0/0" status="Allow" />
              <RuleRow port="443" service="HTTPS" source="0.0.0.0/0" status="Allow" />
              <RuleRow port="22" service="SSH" source="192.168.1.10/32" status="Allow" />
              <RuleRow port="3306" service="MySQL" source="VPC-Internal" status="Allow" />
              <RuleRow port="*" service="All" source="Anywhere" status="Deny" />
            </div>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* VPN Section Enhanced */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-10 rounded-[2.5rem] text-white shadow-lg">
          <LinkIcon className="mb-6 opacity-50" size={48} />
          <h3 className="text-2xl font-bold mb-4">Site-to-Site VPN</h3>
          <p className="text-blue-100 leading-relaxed mb-6">
            Bosh ofis va bulutli VPC o'rtasida IPsec protokoli orqali shifrlangan tunnel. 
            Bu ofis xodimlariga bulut resurslaridan xuddi lokal tarmoqdagidek foydalanish imkonini beradi.
          </p>
          <div className="flex items-center gap-4 text-sm font-bold bg-white/10 p-4 rounded-2xl">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Status: Tunnel Established (AES-256)
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <Wifi className="text-blue-600 mb-6" size={48} />
          <h3 className="text-2xl font-bold mb-4 text-slate-900">Client VPN</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Masofadan ishlovchi xodimlar uchun OpenVPN yoki AWS Client VPN yechimi. 
            MFA (Multi-Factor Authentication) bilan birga maksimal xavfsizlikni ta'minlaydi.
          </p>
          <div className="space-y-3">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-blue-500"></div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">75 Active Connections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RuleRow = ({ port, service, source, status }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/10 text-xs font-mono">
    <div className="flex gap-4">
      <span className="w-12 text-blue-300">{port}</span>
      <span className="w-16 text-slate-400">{service}</span>
      <span className="text-slate-300">{source}</span>
    </div>
    <span className={status === 'Allow' ? 'text-green-400' : 'text-red-400'}>{status}</span>
  </div>
);

const RefreshCw = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

export default Security;
