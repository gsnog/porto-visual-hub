import { GradientCard } from "@/components/financeiro/GradientCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Target, DollarSign, TrendingUp, Users, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getMetricasGerais, funilMarketingData, leadsPorCanalData, roiPorCampanhaData } from "@/data/marketing-mock";

const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const axisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 11 };

export default function DashboardMarketing() {
  const [periodo, setPeriodo] = useState("30d");
  const metricas = getMetricasGerais();

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-card border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Período:</span>
            <div className="flex gap-1">
              {["7d", "30d", "90d"].map(p => (
                <Button key={p} variant={periodo === p ? "default" : "outline"} size="sm" onClick={() => setPeriodo(p)} className="h-7 px-2.5 text-xs">{p}</Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stat */}
      <div className="bg-card border border-border rounded p-6">
        <p className="text-sm text-muted-foreground mb-2">Leads Captados no Período</p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold tracking-tight text-foreground">{metricas.leads}</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-lime-400/10 text-lime-600 dark:bg-lime-400/15 dark:text-lime-400">+15% vs período anterior</span>
        </div>
        <div className="flex gap-6 mt-4">
          <div>
            <p className="text-xs text-muted-foreground">MQL</p>
            <p className="text-lg font-bold text-foreground">{metricas.mql}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">SQL</p>
            <p className="text-lg font-bold text-foreground">{metricas.sql}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversões</p>
            <p className="text-lg font-bold text-foreground">{metricas.conversoes}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">ROI Médio</p>
            <p className="text-lg font-bold text-lime-600 dark:text-lime-400">{metricas.roi.toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard title="Leads Captados" value={metricas.leads.toString()} icon={Users} variant="info" trend={{ value: "+15%", positive: true }} />
        <GradientCard title="MQL → SQL" value={`${metricas.mql} → ${metricas.sql}`} icon={Target} variant="warning" />
        <GradientCard title="CAC" value={formatCurrency(metricas.cac)} icon={DollarSign} variant="orange" />
        <GradientCard title="ROI Médio" value={`${metricas.roi.toFixed(0)}%`} icon={TrendingUp} variant="success" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Funil de Marketing</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funilMarketingData} layout="vertical" barSize={18}>
                <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis dataKey="etapa" type="category" width={90} tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px' }} />
                <Bar dataKey="valor" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Leads por Canal</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadsPorCanalData.slice(0, 5)}>
                <XAxis dataKey="canal" tick={{ ...axisStyle, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '4px' }} />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROI Table */}
      <div className="bg-card border border-border rounded p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">ROI por Campanha</h3>
        <div className="space-y-2">
          {roiPorCampanhaData.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 rounded bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
              <span className="font-medium text-sm text-foreground">{c.campanha}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{formatCurrency(c.gasto)} investido</span>
                <span className={`font-bold text-sm px-2.5 py-1 rounded-full ${
                  c.roi >= 0 
                    ? 'bg-lime-400/10 text-lime-600 dark:bg-lime-400/15 dark:text-lime-400' 
                    : 'bg-rose-400/10 text-rose-600 dark:bg-rose-400/15 dark:text-rose-400'
                }`}>
                  {c.roi > 0 ? '+' : ''}{c.roi.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
