import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, Receipt, Download,
  Building2, ArrowUpRight, ArrowDownRight, Wallet, PiggyBank,
  CreditCard, FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const monthlyFinance = [
  { month: 'Oct', income: 185000, expense: 62000 },
  { month: 'Nov', income: 210000, expense: 71000 },
  { month: 'Dec', income: 320000, expense: 95000 },
  { month: 'Jan', income: 295000, expense: 88000 },
  { month: 'Feb', income: 230000, expense: 76000 },
  { month: 'Mar', income: 247500, expense: 82000 },
];

const expenseBreakdown = [
  { name: 'แม่บ้าน', nameEn: 'Housekeeping', value: 28, color: 'hsl(200, 65%, 48%)' },
  { name: 'ค่าน้ำ/ไฟ', nameEn: 'Utilities', value: 22, color: 'hsl(38, 80%, 58%)' },
  { name: 'ช่างซ่อม', nameEn: 'Repairs', value: 18, color: 'hsl(6, 72%, 55%)' },
  { name: 'ของใช้/อุปกรณ์', nameEn: 'Supplies', value: 15, color: 'hsl(152, 56%, 45%)' },
  { name: 'ค่าคอมมิชชัน OTA', nameEn: 'OTA Commission', value: 12, color: 'hsl(270, 50%, 55%)' },
  { name: 'อื่นๆ', nameEn: 'Other', value: 5, color: 'hsl(210, 10%, 60%)' },
];

const unitProfitData = [
  { name: 'Seaview Villa', income: 68000, expense: 22000, profit: 46000, occupancy: 82 },
  { name: 'Sunset Villa', income: 52000, expense: 18500, profit: 33500, occupancy: 71 },
  { name: 'Hillside Retreat', income: 38000, expense: 15000, profit: 23000, occupancy: 65 },
  { name: 'Beachfront Suite', income: 55000, expense: 16500, profit: 38500, occupancy: 88 },
  { name: 'Pool Night Villa', income: 34500, expense: 10000, profit: 24500, occupancy: 75 },
];

const recentTransactions = [
  { id: 1, type: 'income', desc: 'Booking #1247 – K. Tanaka', amount: 14000, date: '10 มี.ค.', unit: 'Seaview Villa', platform: 'Airbnb' },
  { id: 2, type: 'income', desc: 'Booking #1248 – K. Smith', amount: 21000, date: '10 มี.ค.', unit: 'Beachfront Suite', platform: 'Booking.com' },
  { id: 3, type: 'expense', desc: 'ค่าแม่บ้าน – 3 ยูนิต', amount: -4500, date: '9 มี.ค.', unit: 'ทุกยูนิต', platform: '' },
  { id: 4, type: 'income', desc: 'Booking #1246 – K. Park', amount: 9500, date: '9 มี.ค.', unit: 'Hillside Retreat', platform: 'LINE' },
  { id: 5, type: 'expense', desc: 'ค่าไฟ – Seaview Villa', amount: -3200, date: '8 มี.ค.', unit: 'Seaview Villa', platform: '' },
  { id: 6, type: 'income', desc: 'มัดจำ – K. Chen', amount: 5000, date: '8 มี.ค.', unit: 'Sunset Villa', platform: 'Facebook' },
  { id: 7, type: 'expense', desc: 'ซ่อมเครื่องปรับอากาศ', amount: -6500, date: '7 มี.ค.', unit: 'Pool Night Villa', platform: '' },
  { id: 8, type: 'income', desc: 'Booking #1245 – K. Wilson', amount: 18500, date: '7 มี.ค.', unit: 'Seaview Villa', platform: 'Airbnb' },
];

const depositTracking = [
  { guest: 'K. Tanaka', unit: 'Seaview Villa', deposit: 5000, status: 'held', checkin: '10 มี.ค.' },
  { guest: 'K. Smith', unit: 'Beachfront Suite', deposit: 8000, status: 'held', checkin: '10 มี.ค.' },
  { guest: 'K. Park', unit: 'Hillside Retreat', deposit: 3000, status: 'refunded', checkin: '5 มี.ค.' },
  { guest: 'K. Chen', unit: 'Sunset Villa', deposit: 5000, status: 'pending', checkin: '15 มี.ค.' },
];

const FinanceView = () => {
  const { t, language } = useLanguage();

  const totalIncome = 247500;
  const totalExpense = 82000;
  const grossProfit = totalIncome - totalExpense;
  const profitMargin = ((grossProfit / totalIncome) * 100).toFixed(1);

  const stats = [
    { label: t('finance.total_income'), value: `฿${totalIncome.toLocaleString()}`, icon: TrendingUp, color: 'text-accent', sub: '+18.5%' },
    { label: t('finance.total_expense'), value: `฿${totalExpense.toLocaleString()}`, icon: TrendingDown, color: 'text-destructive', sub: '+5.2%' },
    { label: t('finance.gross_profit'), value: `฿${grossProfit.toLocaleString()}`, icon: PiggyBank, color: 'text-accent', sub: `${profitMargin}%` },
    { label: t('finance.deposits_held'), value: '฿13,000', icon: Wallet, color: 'text-villa-ocean', sub: t('finance.two_guests') },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <DollarSign size={22} className="text-accent" />
          <h2 className="font-display font-bold text-xl text-foreground">{t('finance.title')}</h2>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 font-display text-sm h-10">
          <Download size={16} />
          {t('finance.export')}
        </Button>
      </div>
      <p className="font-body text-sm text-muted-foreground mb-5">{t('finance.subtitle')}</p>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="stat-card text-center group hover:ring-1 hover:ring-accent/20"
          >
            <stat.icon size={20} className={`mx-auto mb-2 ${stat.color} transition-transform group-hover:scale-110`} />
            <div className="font-display text-2xl font-bold text-foreground leading-none">{stat.value}</div>
            <div className="font-display text-xs text-muted-foreground mt-1.5">{stat.label}</div>
            <div className="font-display text-xs font-semibold mt-0.5 text-accent">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Income vs Expense Chart */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5 mb-4">
        <h3 className="font-display text-base font-bold text-foreground mb-1">{t('finance.income_vs_expense')}</h3>
        <p className="font-display text-xs text-muted-foreground mb-4">{t('finance.six_months')}</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyFinance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 13, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 13, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(210, 16%, 90%)', borderRadius: '12px', fontSize: '14px', fontFamily: 'Plus Jakarta Sans' }}
                formatter={(value: number, name: string) => [
                  `฿${value.toLocaleString()}`,
                  name === 'income' ? t('finance.income') : t('finance.expense'),
                ]}
              />
              <Bar dataKey="income" fill="hsl(152, 56%, 45%)" radius={[6, 6, 0, 0]} opacity={0.85} />
              <Bar dataKey="expense" fill="hsl(6, 72%, 55%)" radius={[6, 6, 0, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-3 justify-center">
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-sm bg-accent" /><span className="font-display text-xs text-muted-foreground">{t('finance.income')}</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-sm bg-destructive" /><span className="font-display text-xs text-muted-foreground">{t('finance.expense')}</span></div>
        </div>
      </motion.div>

      {/* Two column: Expense Breakdown + Per-Unit Profit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Expense Breakdown Pie */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5">
          <h3 className="font-display text-base font-bold text-foreground mb-4">{t('finance.expense_breakdown')}</h3>
          <div className="flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={38} outerRadius={62} dataKey="value" strokeWidth={2} stroke="hsl(0, 0%, 100%)">
                    {expenseBreakdown.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2.5">
              {expenseBreakdown.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="font-display text-sm text-foreground flex-1">{language === 'th' ? s.name : s.nameEn}</span>
                  <span className="font-display text-sm font-bold text-foreground">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Per-Unit Profit */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="font-display text-base font-bold text-foreground mb-4">{t('finance.unit_profit')}</h3>
          <div className="space-y-3">
            {unitProfitData.map((unit) => (
              <div key={unit.name} className="flex items-center gap-3">
                <Building2 size={16} className="text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm font-semibold text-foreground truncate">{unit.name}</div>
                  <div className="font-display text-xs text-muted-foreground">
                    {t('finance.income')}: ฿{unit.income.toLocaleString()} · {t('finance.expense')}: ฿{unit.expense.toLocaleString()}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-display text-sm font-bold text-accent">฿{unit.profit.toLocaleString()}</div>
                  <div className="font-display text-xs text-muted-foreground">{unit.occupancy}%</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Deposit Tracking */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-base font-bold text-foreground">{t('finance.deposit_tracking')}</h3>
          <CreditCard size={18} className="text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {depositTracking.map((d, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-semibold text-foreground">{d.guest}</div>
                <div className="font-display text-xs text-muted-foreground">{d.unit} · {d.checkin}</div>
              </div>
              <div className="font-display text-sm font-bold text-foreground">฿{d.deposit.toLocaleString()}</div>
              <span className={`font-display text-xs font-semibold px-2.5 py-1 rounded-full ${
                d.status === 'held' ? 'bg-villa-ocean/10 text-villa-ocean' :
                d.status === 'refunded' ? 'bg-accent/10 text-accent' :
                'bg-villa-gold/10 text-villa-gold'
              }`}>
                {d.status === 'held' ? t('finance.held') :
                 d.status === 'refunded' ? t('finance.refunded') :
                 t('finance.pending')}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-base font-bold text-foreground">{t('finance.recent_transactions')}</h3>
          <Button variant="ghost" size="sm" className="text-xs gap-1 h-9">
            <FileText size={14} />
            {t('finance.view_all')}
          </Button>
        </div>
        <div className="space-y-2">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                tx.type === 'income' ? 'bg-accent/10' : 'bg-destructive/10'
              }`}>
                {tx.type === 'income'
                  ? <ArrowUpRight size={18} className="text-accent" />
                  : <ArrowDownRight size={18} className="text-destructive" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-semibold text-foreground truncate">{tx.desc}</div>
                <div className="font-display text-xs text-muted-foreground">{tx.unit} · {tx.date} {tx.platform && `· ${tx.platform}`}</div>
              </div>
              <div className={`font-display text-sm font-bold ${tx.type === 'income' ? 'text-accent' : 'text-destructive'}`}>
                {tx.type === 'income' ? '+' : ''}฿{Math.abs(tx.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FinanceView;
