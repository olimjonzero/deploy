import { GitBranch, Terminal, Cpu, RefreshCw, CheckCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const DevOps = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    // Real-time metrics simulation
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newData = [...prev, {
          time: new Date().toLocaleTimeString().slice(-8),
          cpu: Math.floor(Math.random() * 30) + 40, // 40-70%
          memory: Math.floor(Math.random() * 20) + 60, // 60-80%
        }].slice(-10);
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold text-slate-900">CI/CD va Avtomatlashtirish</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Dasturiy ta'minotni yetkazib berish (Delivery) va infratuzilmani monitoring qilish jarayonlari.
        </p>
      </motion.section>

      {/* Real-time Monitoring Section */}
      <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="text-red-500" /> Real-vaqtdagi Monitoring
          </h3>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div> CPU
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <div className="w-3 h-3 bg-indigo-400 rounded-full"></div> Memory
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" />
              <Area type="monotone" dataKey="memory" stroke="#818cf8" fillOpacity={1} fill="url(#colorMem)" />
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* CI/CD Pipeline Visual */}
      <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200">
        <h3 className="text-xl font-bold mb-10 flex items-center gap-2">
          <GitBranch className="text-blue-600" /> Avtomatlashtirilgan Pipeline
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <PipelineNode icon={<Terminal />} label="Commit" status="Success" time="2m ago" />
          <PipelineNode icon={<Cpu />} label="Build" status="Success" time="1m ago" />
          <PipelineNode icon={<RefreshCw />} label="Deploy" status="Active" time="Now" />
          <PipelineNode icon={<CheckCircle />} label="Verify" status="Pending" time="--" />
        </div>
      </section>

      {/* IaC Code Block */}
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Infratuzilma Kod Sifatida (IaC)</h3>
          <p className="text-slate-600">
            Terraform yordamida tarmoq resurslarini avtomatik yaratish. Bu usul "Human Error"ni 
            nolga tushiradi va infratuzilmani versiyalash imkonini beradi.
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-slate-600">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
              <span>Replicability: Bir xil muhitni istalgancha qayta yaratish.</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
              <span>Speed: Qo'lda sozlashdan 10 barobar tezroq.</span>
            </li>
          </ul>
        </div>
        <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl overflow-hidden font-mono text-sm">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="text-blue-300">
{`resource "aws_autoscaling_group" "main" {
  name     = "erp-scaling-group"
  max_size = 10
  min_size = 2
  
  health_check_type = "ELB"
  
  tag {
    key   = "Environment"
    value = "Production"
  }
}`}
          </pre>
        </div>
      </section>
    </div>
  );
};

const PipelineNode = ({ icon, label, status, time }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center"
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
      status === 'Success' ? 'bg-green-100 text-green-600' : 
      status === 'Active' ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-400'
    }`}>
      {icon}
    </div>
    <h4 className="font-bold text-slate-800 text-sm">{label}</h4>
    <p className={`text-[10px] font-bold uppercase mt-1 ${
      status === 'Success' ? 'text-green-500' : 
      status === 'Active' ? 'text-blue-500' : 'text-slate-400'
    }`}>{status}</p>
    <p className="text-[10px] text-slate-400 mt-2">{time}</p>
  </motion.div>
);

export default DevOps;
