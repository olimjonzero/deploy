import { Layers, Boxes, Layout, Users, ShieldCheck, Database } from 'lucide-react';

const Comparison = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">Bulut Xizmatlari va Modellar Tahlili</h2>
        <p className="text-slate-600">Kompaniya ehtiyojlari uchun eng mos modellar va texnologiyalarni qiyoslash.</p>
      </section>

      {/* Service Models Section */}
      <section className="space-y-8">
        <h3 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-600 pl-4">Xizmat Modellari (IaaS, PaaS, SaaS)</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <ModelCard 
            title="IaaS"
            subtitle="Infrastructure as a Service"
            icon={<Layers className="text-blue-600" />}
            points={["Virtual serverlar (EC2)", "Tarmoq sozlamalari", "Storage boshqaruvi"]}
            bestFor="Maxsus konfiguratsiyaga muhtoj ERP tizimlari uchun."
          />
          <ModelCard 
            title="PaaS"
            subtitle="Platform as a Service"
            icon={<Boxes className="text-purple-600" />}
            points={["Runtime muhiti", "Ma'lumotlar bazalari", "Middleware"]}
            bestFor="Dasturchilar uchun ilovalarni tezkor ishlab chiqish muhiti."
          />
          <ModelCard 
            title="SaaS"
            subtitle="Software as a Service"
            icon={<Layout className="text-green-600" />}
            points={["Tayyor dasturiy ta'minot", "Mijozlar interfeysi", "Hech qanday boshqaruvsiz"]}
            bestFor="Standart CRM yoki elektron pochta xizmatlari uchun."
          />
        </div>
      </section>

      {/* Cloud Types Section */}
      <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-8">
        <h3 className="text-2xl font-bold text-slate-800 text-center">Bulut Turlari</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <TypeCard 
            title="Public Cloud"
            description="AWS, Azure yoki Google Cloud kabi provayderlar tomonidan taqdim etiladi. Xarajat samaradorligi yuqori."
          />
          <TypeCard 
            title="Private Cloud"
            description="Faqat bitta tashkilot uchun xizmat qiladi. Maksimal xavfsizlik va nazorat."
          />
          <TypeCard 
            title="Hybrid Cloud"
            description="Mahalliy (on-premises) va bulutli tizimlarning birikmasi. Ma'lumotlarni bosqichma-bosqich ko'chirish uchun mos."
          />
        </div>
      </section>

      {/* Virtualization vs Containerization */}
      <section className="space-y-8">
        <h3 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-600 pl-4">Virtualizatsiya va Konteynerizatsiya</h3>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h4 className="text-xl font-semibold flex items-center gap-2">
              <Database className="text-blue-500" /> Virtual Machines (VM)
            </h4>
            <p className="text-slate-600">
              Har bir VM o'zining operatsion tizimiga (Guest OS) ega. Resurslarni to'liq ajratish imkonini beradi, lekin ko'p joy egallaydi.
            </p>
            <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
              <li>Og'ir ERP tizimlari uchun mos</li>
              <li>To'liq izolatsiya</li>
              <li>Sekinroq yuklanadi</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold flex items-center gap-2">
              <Users className="text-orange-500" /> Containers (Docker/K8s)
            </h4>
            <p className="text-slate-600">
              Xost OS yadrosini baham ko'radi. Yengil, tez yuklanadi va portativ. Microservices arxitekturasi uchun ideal.
            </p>
            <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
              <li>CRM mikroxizmatlari uchun mos</li>
              <li>Resurslarni tejaydi</li>
              <li>Sekundlarda ishga tushadi</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const ModelCard = ({ title, subtitle, icon, points, bestFor }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all">
    <div className="mb-4">{icon}</div>
    <h4 className="text-2xl font-bold text-slate-900">{title}</h4>
    <p className="text-sm text-slate-500 mb-6">{subtitle}</p>
    <ul className="space-y-3 mb-8">
      {points.map((p, i) => (
        <li key={i} className="flex items-center text-slate-600 text-sm">
          <ShieldCheck size={16} className="text-green-500 mr-2" /> {p}
        </li>
      ))}
    </ul>
    <div className="pt-6 border-t border-slate-100 italic text-sm text-slate-500">
      <span className="font-semibold text-slate-700">Tavsiya:</span> {bestFor}
    </div>
  </div>
);

const TypeCard = ({ title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{description}</p>
  </div>
);

export default Comparison;
