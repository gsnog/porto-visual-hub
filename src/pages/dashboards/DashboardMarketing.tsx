import { GradientCard } from "@/components/financeiro/GradientCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Target, DollarSign, TrendingUp, Users, BarChart3, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { getMetricasGerais, funilMarketingData, leadsPorCanalData, roiPorCampanhaData } from "@/data/marketing-mock";

const formatCurrency = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export default function DashboardMarketing() {
  const [periodo, setPeriodo] = useState("30d");
  const metricas = getMetricasGerais();

  return (
    <div className="space-y-6">
      <Card className="border border-border rounded p-4">
        <div className="flex flex-wrap items-center gap-4">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Período:</span>
          <div className="flex gap-1">
            {["7d", "30d", "90d"].map(p => (
              <Button key={p} variant={periodo === p ? "default" : "outline"} size="sm" onClick={() => setPeriodo(p)} className="h-8 px-3">{p}</Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard title="Leads Captados" value={metricas.leads.toString()} icon={Users} variant="info" trend={{ value: "+15%", positive: true }} />
        <GradientCard title="MQL → SQL" value={`${metricas.mql} → ${metricas.sql}`} icon={Target} variant="warning" />
        <GradientCard title="CAC" value={formatCurrency(metricas.cac)} icon={DollarSign} variant="orange" />
        <GradientCard title="ROI Médio" value={`${metricas.roi.toFixed(0)}%`} icon={TrendingUp} variant="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border rounded">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Funil de Marketing</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={funilMarketingData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="etapa" type="category" width={90} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="valor" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border rounded">
          <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Leads por Canal</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={leadsPorCanalData.slice(0, 5)}>
                <XAxis dataKey="canal" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border rounded">
        <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">ROI por Campanha</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {roiPorCampanhaData.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/50">
                <span className="font-medium text-sm">{c.campanha}</span>
                <span className={`font-bold ${c.roi >= 0 ? 'text-success' : 'text-destructive'}`}>{c.roi > 0 ? '+' : ''}{c.roi.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
