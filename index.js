import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data for Wholesale Market
const data = {
  erp: {
    budget: "$4.8M",
    expenses: "$2.2M",
    profit: "$2.6M",
    transactions: [
      { id: 1001, title: "Turkiya - Erkaklar kiyimi partiyasi", time: "Bugun, 09:15", amount: "-$12,450.00" },
      { id: 1002, title: "Ulgurji sotuv - 'Chorsu' dilerlari", time: "Bugun, 10:45", amount: "+$8,320.00" },
      { id: 1003, title: "Xitoy - Bolalar poyabzali importi", time: "Bugun, 11:30", amount: "-$5,890.00" }
    ]
  },
  crm: {
    customers: [
      { name: 'Bekzod Rahimov', role: "Abu Saxiy bozori dileri" },
      { name: 'Omina Gulyamova', role: "Butik do'konlar tarmog'i" },
      { name: 'Farrux Tursunov', role: "Mintaqaviy ulgurji xaridor" }
    ],
    activity: [65, 85, 55, 95, 75, 90, 80]
  },
  wms: {
    products: [
      { 
        id: 1,
        name: "Erkaklar Klassik Kostyumi (Premium)", 
        category: "Ustki kiyim", 
        count: "450", 
        status: "Yetarli", 
        price: "$45.00",
        origin: "Turkiya",
        material: "100% Jun",
        description: "Turkiyaning eng sifatli matolaridan tayyorlangan premium klassik kostyum. Rasmiy tadbirlar va biznes uchrashuvlar uchun ideal.",
        img: "https://images.unsplash.com/photo-1594932224828-b4b059b6ff6f?auto=format&fit=crop&q=80&w=500",
        minOrder: "10 dona"
      },
      { 
        id: 2,
        name: "Ayollar Bahorgi Trenchi", 
        category: "Ustki kiyim", 
        count: "1,120", 
        status: "Yetarli", 
        price: "$28.00",
        origin: "Xitoy",
        material: "Paxta",
        description: "Zamonaviy dizayndagi ayollar trenchi. Bahorgi mavsum uchun juda qulay va zamonaviy tanlov.",
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
        description: "Sifatli va hamyonbop denim shimlar. Vintage uslubidagi ishlov berilgan, juda chidamli.",
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
        description: "Bayramlar va tantanali tadbirlar uchun maxsus oqshom libosi. Naqshinkor ishlov berilgan.",
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
        description: "Chaqaloqlar uchun yumshoq va xavfsiz kiyimlar. Tabiiy matodan tayyorlangan, allergiyaga qarshi.",
        img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=500",
        minOrder: "30 dona"
      },
      { 
        id: 6,
        name: "Qishki Junli Palto", 
        category: "Ustki kiyim", 
        count: "200", 
        status: "Yetarli", 
        price: "$85.00",
        origin: "Turkiya",
        material: "Jun",
        description: "Sovuq qish kunlari uchun issiq va sifatli junli palto. Klassik uslubda.",
        img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=500",
        minOrder: "5 dona"
      },
      { 
        id: 7,
        name: "Klassik Djinni Kurtka", 
        category: "Djinni shimlar", 
        count: "400", 
        status: "Yetarli", 
        price: "$25.00",
        origin: "Xitoy",
        material: "Denim",
        description: "Har qanday kiyim bilan mos tushadigan klassik djinni kurtka. Chidamli mato.",
        img: "https://images.unsplash.com/photo-1576995883057-122971134671?auto=format&fit=crop&q=80&w=500",
        minOrder: "20 dona"
      },
      { 
        id: 8,
        name: "Yozgi Gulli Libos", 
        category: "Ayollar liboslari", 
        count: "950", 
        status: "Yetarli", 
        price: "$15.00",
        origin: "O'zbekiston",
        material: "Shatel",
        description: "Yozgi issiq kunlar uchun yengil va havo o'tkazuvchan gulli libos.",
        img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500",
        minOrder: "40 dona"
      },
      { 
        id: 9,
        name: "Bolalar Sport To'plami", 
        category: "Bolalar kiyimi", 
        count: "350", 
        status: "Yetarli", 
        price: "$20.00",
        origin: "Turkiya",
        material: "Triko",
        description: "Faol bolalar uchun qulay va sifatli sport kiyimlari to'plami.",
        img: "https://images.unsplash.com/photo-151927847797a-3634df7e452a?auto=format&fit=crop&q=80&w=500",
        minOrder: "15 dona"
      }
    ],
    storageLoad: 82
  }
};

app.get('/api/data/:type', (req, res) => {
  const type = req.params.type;
  if (data[type]) {
    res.json(data[type]);
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
