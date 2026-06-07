import { Network, Unlock, Lock, Globe, Server, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Infrastructure = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold text-slate-900">Bulutli Tarmoq Arxitekturasi</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          VPC (Virtual Private Cloud) kompaniyaning raqamli infratuzilmasini mantiqiy izolatsiya qilish 
          va xavfsiz boshqarishning poydevori hisoblanadi.
        </p>
      </motion.section>

      {/* Interactive VPC Diagram */}
      <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden relative">
        <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
          <Network className="text-blue-600" /> Interaktiv VPC Strukturasi
        </h3>
        
        <div className="relative border-4 border-dashed border-blue-100 rounded-[2rem] p-4 md:p-12 bg-blue-50/30">
          <div className="absolute top-4 left-6 text-xs font-bold text-blue-400 uppercase tracking-widest">
            AWS Region / VPC (10.0.0.0/16)
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mt-6">
            {/* Public Subnet */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-green-50/50 border-2 border-green-200 rounded-3xl p-6 relative group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center gap-2 font-bold text-green-700">
                  <Unlock size={18} /> Public Subnet
                </span>
                <span className="text-[10px] bg-green-200 text-green-800 px-2 py-1 rounded">10.0.1.0/24</span>
              </div>
              
              <div className="space-y-4">
                <ComponentNode icon={<Globe />} title="Internet Gateway" desc="Tashqi dunyoga chiqish" color="green" />
                <ComponentNode icon={<Shield />} title="Load Balancer" desc="Trafikni taqsimlash" color="green" />
                <ComponentNode icon={<Server />} title="Web Servers" desc="Frontend ilovalar" color="green" />
              </div>
            </motion.div>

            {/* Private Subnet */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-red-50/50 border-2 border-red-200 rounded-3xl p-6 relative group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center gap-2 font-bold text-red-700">
                  <Lock size={18} /> Private Subnet
                </span>
                <span className="text-[10px] bg-red-200 text-red-800 px-2 py-1 rounded">10.0.2.0/24</span>
              </div>

              <div className="space-y-4">
                <ComponentNode icon={<Server />} title="ERP/CRM Backend" desc="Biznes mantiqi" color="red" />
                <ComponentNode icon={<Lock />} title="Database" desc="Maxfiy ma'lumotlar" color="red" />
                <ComponentNode icon={<Network />} title="NAT Gateway" desc="Faqat chiquvchi aloqa" color="red" />
              </div>
            </motion.div>
          </div>

          {/* Connection Lines Simulation */}
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-1 bg-blue-200"
            ></motion.div>
          </div>
        </div>
      </section>

      {/* Detail Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <DetailCard 
          title="Marshrutlash (Routing)"
          desc="Route Table orqali paketlar qayerga yo'naltirilishini belgilaymiz. Public subnet IGW ga, Private esa NAT ga ulanadi."
        />
        <DetailCard 
          title="Xavfsizlik (Firewall)"
          desc="Security Groups va Network ACL yordamida har bir port va IP manzillar uchun ruxsatlarni boshqaramiz."
        />
        <DetailCard 
          title="Yuqori Barqarorlik"
          desc="Resurslarni bir nechta Availability Zone'larga taqsimlash orqali tizim uzluksizligini 99.9% ga yetkazamiz."
        />
      </div>
    </div>
  );
};

const ComponentNode = ({ icon, title, desc, color }) => (
  <div className={`flex items-center gap-4 p-4 bg-white rounded-2xl border border-${color}-100 shadow-sm group-hover:shadow-md transition-all`}>
    <div className={`p-2 bg-${color}-100 text-${color}-600 rounded-lg`}>{icon}</div>
    <div>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
      <p className="text-[10px] text-slate-500">{desc}</p>
    </div>
  </div>
);

const DetailCard = ({ title, desc }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default Infrastructure;
