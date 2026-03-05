import { useState, useEffect, useMemo } from "react";

const CLIENTS = [
  { name: "Dr. Fernando Junger", token: "EAAiv9p1IQmkBQZB2uwdlyKQksMekGoqKNzGt9eSoP8wQDQLXhh7Of29tJIKuuFP7oj6A2F6l3ZAI6sXIZCqDHLZC3O7PZCRZByTdQl6HIrbZCtmcg9gxrFOVZCaKrrr20fxJAkBrZBtjqvQzSO7a0WsZAZCerIsHSbEFvDCYUhYnzklkJa1tyBtvNLyhxj4tEZBPDwsQtAnBKWQhM0aJvAbH6hqchBgASv9cNud2XOEIfPjDRxfUZA8dZCt7pc8o7RNbTo2u1qmrEwhFzCzZCenkQSbmepcTGZB4" },
  { name: "Dr. Edgar", token: "EAAMsau5YB6wBQxK6FNkfzFmCTZCJS8Ruq5AxxQZBeJDlBKKZBttQsQHpZCMZBLuvwni80pA0XIsxZADcqrr0ZBtHhrqdfyphNLoqZCTBK5nQc07B3J6RjvYgPcBCEsT9FQQif2ZBJjmL2cXyQ87rUNMP2YZBjZA35lP293Kk5THaPoZCrhpUvTivRbTFGuuUz6IzWMnVmGsVWfLMTM03Eqwi2b3ZB7kL6iuZAJ72wvK9dhbfkYSl8oNSQJ1FffwkHMwTzK5EfnMfG6lajJkI3ct0ygllmAftLm" },
  { name: "Dr. Bruno Mota", token: "EAAUX9Y8QweQBQzbDmgLGdCIGdTyJlvNzDYkGvpZB2fibYmHAZATOZBvhLfkcNgCRunodEaQ61048TTOX0txJZCIeHLpFHqxPL81CdnVSmbdbeDr1wThX4of8AFTj6LIsgpdOIVPDMU24YI10jCLdvYQkZCGZCljE1KzYKybYMSm5gtGzbkP7EFNJ4sIohjUV90K4lkzTBB7Xk1H6lHdX0KZAKgBWXJX3RhpDmlZApV1frapvsCN6ZBiXiCGNWjNT7Pv1oZBHSEVOpHYxPt9UTyu0cKC5zuSgZDZD" },
  { name: "Dr. Paulo Victor", token: "EAAVNdLBGEHkBQ1vxOMMfMud0wZBpO0nx3ZCk69pGoTJZAugQpkmqf6S3QQwGqcTkZAasDzXNfWzh8OmnHqdZCHHZAvHwwzcN9fSlwaLNsybxZBBe44iTw0HJmN5krCAUijRJY3BaIUpulTtbTr12vaJBKKAHe9BB1w2ZC3kLvoZCUjQCd4ZBOTGdWvyUgB1QVFZB9FM6uZAbU6e10hqMUQcZCtM9acxANoMu89SQh51EoZC6exSamvNWZB5NQpdHdQmoZB60dQpZBooZB5BAl9j85aSH97azKd5Of5GgZDZD" },
  { name: "Stone TV", token: "EAAToKs54GuoBQ9mzidVWZAzCS72vCD1qsKZAfuuGCbeVBwGIS97PKjXrMshjvQaANn0e4ZC7o4mMepdlxNV38Ws1EKCvfwnkNP3PUipie0KqLSkSnOY1npmMsipvEYcIovpUv6YuKTCxy8BRtL33RMytZCSNgZAc3hM1kPvSZAer84zjbZB9VKaP8qEEKHmtRdZAPpzHxZBcObsuppjzIB7DQF9Wq4ZB0yXZBvd5q90f0CwK0g1ncoVY9rYJk0JP28j5FG9fy5OdMBdy2Ou9I6ZAPaPUOwEN" },
  { name: "Hortix", token: "EAANGdBrWXdIBQZBJtgGjYXEcckgx7oFvIGZCmHdHLZALMjNB2Ucie7wWeQb4WIpgQ4GkZBY7BJir8AWS1d93Luov63f6HmFHOXq4C3xHgXZCxZAzWKkhHPuxidas0XMKw5iQH1ZB8SFA6U0FxDnQFOSggym8soYkQQZBWD9xHYv1xOpmOrOy2F43YXz3ifhZA7iRoQfCFZBweQcIfcGRl50T2t0Ii705lvXMjLSRzEQfDv7Dv4oLQ4K9fHiLDyfpunmD1AEwd41HDAmBxNgj49QK4Y3bLZC" },
  { name: "Mega Minas", token: "EAAWLD1VHDL8BQzPZCcWFXSZCeAHKEcSpWKTcSqSGiOZC9kIVa7pbMgx62VGRgPGq0ht4GxVbgiYxBNWTu6VxW94neaBeKnui7E7vVI2XqHBwWDZByNUqYSlsLZCcOxTlkkZCMTA6sSZCn1vbRL9INSB6B6IMk8ufqWsnWgDA8EXP8SJhe4SulQzOXA1pZAQm7XMvX9kB4W4TFAsCEIs3WQQkyggf0fA0DphL63RnEVy9SpRlcWNMAKFv0l4DVrhYqYZBFClW7G5AULJKODw79mYOAAaui" },
  { name: "Novaderma", token: "EAAUdMuHVQXQBQ5KKZCqzwnaf7yRP8d8ZBk9cuGGtMeGF8LfHedKBaDA7uEHduNz3ZBE1LeKTTVo6iiqrBIWhqqXwZAZBmvkFg8pHKxB1kxF3e2gh6sICaroMplgwpZAPExoVUPRq5I14ZATiryl9zv0DPBzLjXSBUnP2mCnfa38QEn3C40ZBMXZBQjJrgyBxScgOlPME39ycZAUQlGudUiUOfQ32w2DByMdWy3iES3juOltlF7NCbYE82CVdTvZAveEwhzfIAcC0RHGRlbWBgJZCvZA5x2mww" },
  { name: "Itz e Açaí", token: "EAAUdMuHVQXQBQ5KKZCqzwnaf7yRP8d8ZBk9cuGGtMeGF8LfHedKBaDA7uEHduNz3ZBE1LeKTTVo6iiqrBIWhqqXwZAZBmvkFg8pHKxB1kxF3e2gh6sICaroMplgwpZAPExoVUPRq5I14ZATiryl9zv0DPBzLjXSBUnP2mCnfa38QEn3C40ZBMXZBQjJrgyBxScgOlPME39ycZAUQlGudUiUOfQ32w2DByMdWy3iES3juOltlF7NCbYE82CVdTvZAveEwhzfIAcC0RHGRlbWBgJZCvZA5x2mww" },
  { name: "Colégio Cebama", token: "EAAd5elk8V74BQxwkLmQZCObSVwzRWmZA1MPmw07Ny7aNZCT6TuRKszrAVtcJts5dZCh5Ex2zscBRWZCEZB5S72UajusKC5hkW9OUZBXyzYtSp6no2znsrl9Y6Gg7DZClZABKEGNZBKn94CGKLMSrPnGUcvWDP1nYeVhIhTSJYpyZCEtk1UI3uT17L8FN0IUG4M8mBhoqrJrsd9dTtICzqAamu0KI3nKdqy4rerOe6FXNq5mnyGa4t4PjfOCjOeZAJyng5fzS8KG5HuVSJpqZAVQrvSdJZCqka5JQZDZD" },
  { name: "Dr. Cruz", token: "EAARTEhcyZBSgBQ9tDfS2dxMoh4Q2b1eDAExYpDsBo4ORovCA9qjMHRXwNuYPpyJ3sIbqIafXiKICA5MAKAEwUybf7H4REb377aKzuXd0wAtGJZBUnSVEd9x7RwW37EnpX0200ihCZBDa49MjbzJgoyeBtPf8RVibU40uqUqp9pfFUiOWuZCQqvHHMkZC5ZBZAdMMNVzqn6Be9O0fVxZByVZAXwyuRkru3kT1ZCuqnj7ALcq30mtAQLYo3wmHJ5ubtKFK7GRDXuDgsJySTJYFADlA8l51H9MwZDZD" },
  { name: "Hikari", token: "EAAaO3IjQ5QEBQyJJ2cAtr6VanZCYQEM7zz6bttAVXIJZC0woZCUgq2AFKpW2wWZARISmoB17hDybOZAQ07z4CibhxQIx0bKIDCbEqC4Pd9ZBZBOCTWpZBAALIEGozXv8fQ0UaZBVvpTqbZCNTBZBGwZApxOsLh6bkhInJfmQjZBSSGiRl2C0Fsi2ASw713I7a8ZCLHjoKcSPfhw8qSF6Qes5XGHtstZB3Vm8qiLdJwfN9P3O6GWt5iSHjejSvuWgbiz48Mz3oE8CGUGqNKSWITdq4RVRQ6xFSid" },
  { name: "Dra. Raíza", token: "EAAUnMGrAHYABQxwy6G5gWyX2hZCBbh4Gso9gqvI8Es2cV0dK9aK8RC3AcnRHi8WNZBdH3HJZAb4iDKGKVkP4VdyZAwdciTiPJZANcg54WqohOVT6PGuTaCQfZAX6hXHsGdEmKMzL5r44XZBUFpvfawPzX5gi48NeGSn7LRFxqZAAmnA5rZARZCRZCabHos109apWVvp4k3IgG6tsO9mZCW2VFARpIZBQ7yVomwti5AY1FdkmFTOtFBVORqf5KCa86brhErc6ByyEA3OrNiaDyLe54VgpFJf5J" },
  { name: "Itz Net", token: "EAARouhlI2uoBQ8oc96cjLs7EOyWe5MKpBK8JdtrsJPoM4GouXcLmyUWSUJXU31IZBMTJfk5YZAa2HqtNZACurEh1ygxJ80Kr26iQJTdqWZB33eifNPVvCOKBldyZCuPK00kqd9gZBDgobFqwp1T2dAGOxaPrBtwxyZCw6Y73oXS3W1NLauAr0vh8fTWs1jG7Ntawf14jhcjjOuD6LEQLsJHcxEyx1YIrkYb2jgFejDZAHkUZB25QXiDYWJZAjYt3D3vkgUkMvZA2RTN5ZCh58i14yMHbfAKZA" },
  { name: "Dr. Angelo", token: "EAAZCZB9kX4nSgBQ515tvta0Jd3ZAbRXt4uYZAc0IkVX2ZAuhg5HoKTqLBiY4IM184CGThR2JZBl0rem7mATEYKv7731r3caFLVw9rUFo9GFKOwZBJHu7GXiWyLCcpfCZCq4JUi3ZChBbqzoh2VE1NR9TJ6NvtkRC52e9AjKZCYSFaoWifrzJFzqJs7fB8dT1PDknaUQkDcizpWQqtupsgoCZAq4ZArZBZCB9zTScfbeYPqcqqiApFsMwHGaPnmuSYHvLL7lM5b6QnZCLNKDK8df9Co3j00zaffC" },
  { name: "Dr. Fábio", token: "EAAMZCVt9qpwwBQ29WmeqeePtMklW6WfIf1V3lKBjUCLtn22cbCXqxPwZC5qK9ZB0CEfiYlZCIsXGixfZA303BDUb8HQFDBFGAMUWwfibJnQm4XHRq82IvGEDfpNK0x6oMD1WQusIoE5oxODrFAfZBt08jWGP9FWHwwda2ykJIl1J9fpvCOt0bXYq46ryK2vepYU5QgooljZCZCHXn76CbYyBbGhzQqKpskhSVXOkrz02ysspeP2NKLnLbUdRoMuHhG80SdgVnCwPopShxqYGHucO79ML" },
  { name: "Dra. Joelma", token: "EAANUJKx2Ac8BQy03znmepso58yv6fbfRb80kaEFsrv5dERy57iNEe0XZBDc56AsQ1AQnqZBtdZCgulDcJF06U9tSZB7bO7FGwEloYabdAurnQ3TiFBNRA0VVxFscXTp6daBON5CszniDIzInPIdHTF8WyGts3yKjP9zEvzs7jh7yvtCTGmBLA5VggYeSsxSsBX5ODqsb29Cj98FAerJtQUU4kDI01EXpGzwgmIR88Qund79WY9DZBkrZCEuHfMKpkqxRdt3ZA8zrzRcKJeHp8YnwQMGggZDZD" },
];

const META_API = "https://graph.facebook.com/v25.0";
const CLAUDE_API = "https://api.anthropic.com/v1/messages";

const fmt = (n) => n != null ? Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : "—";
const fmtInt = (n) => n != null ? Number(n).toLocaleString("pt-BR") : "—";
const statusColor = (s) => ({ ACTIVE: "#22c55e", PAUSED: "#f59e0b", ARCHIVED: "#6b7280", DELETED: "#ef4444" }[s] || "#6b7280");

const DATE_PRESETS = [
  { label: "7d", value: "last_7d" },
  { label: "14d", value: "last_14d" },
  { label: "30d", value: "last_30d" },
  { label: "90d", value: "last_90d" },
];

const SORT_OPTIONS = [
  { label: "Nome", value: "name" },
  { label: "Maior gasto", value: "spend_desc" },
  { label: "Menor gasto", value: "spend_asc" },
  { label: "Mais cliques", value: "clicks_desc" },
  { label: "Maior CTR", value: "ctr_desc" },
  { label: "Pior saúde", value: "health_asc" },
];

// Compute health score 0-10 and alerts from metrics
function computeHealth(insights, campaigns) {
  if (!insights) return { score: null, alerts: [], tags: [] };
  const ctr = Number(insights.ctr || 0);
  const cpc = Number(insights.cpc || 0);
  const impressions = Number(insights.impressions || 0);
  const spend = Number(insights.spend || 0);
  const active = campaigns?.filter(c => c.status === "ACTIVE").length || 0;

  let score = 10;
  const alerts = [];
  const tags = [];

  if (impressions === 0) {
    alerts.push({ level: "red", msg: "Sem impressões no período — campanhas podem estar inativas ou com problema de entrega." });
    score -= 4;
  }
  if (ctr < 0.5 && impressions > 0) {
    alerts.push({ level: "red", msg: `CTR muito baixo (${ctr.toFixed(2)}%) — criativo ou público precisam de revisão urgente.` });
    score -= 3;
  } else if (ctr < 1.0 && impressions > 0) {
    alerts.push({ level: "yellow", msg: `CTR abaixo do ideal (${ctr.toFixed(2)}%) — considere testar novos criativos ou segmentações.` });
    score -= 1.5;
  } else if (ctr >= 2.0) {
    tags.push({ color: "#22c55e", label: "CTR excelente" });
  }
  if (cpc > 5 && spend > 0) {
    alerts.push({ level: "yellow", msg: `CPC alto (R$ ${fmt(cpc)}) — verifique a competitividade do público ou ajuste o lance.` });
    score -= 1.5;
  }
  if (active === 0) {
    alerts.push({ level: "yellow", msg: "Nenhuma campanha ativa no momento." });
    score -= 2;
  }
  if (spend === 0 && impressions > 0) {
    tags.push({ color: "#a78bfa", label: "Sem gasto registrado" });
  }
  if (ctr >= 1.0 && cpc <= 3 && active > 0) {
    tags.push({ color: "#22c55e", label: "Conta saudável" });
  }

  return { score: Math.max(0, Math.round(score * 10) / 10), alerts, tags };
}

function scoreColor(score) {
  if (score === null) return "#4b5563";
  if (score >= 8) return "#22c55e";
  if (score >= 5) return "#f59e0b";
  return "#ef4444";
}

async function fetchClient(client, datePreset) {
  try {
    const [uRes, aRes] = await Promise.all([
      fetch(`${META_API}/me?fields=id,name&access_token=${client.token}`),
      fetch(`${META_API}/me/adaccounts?fields=id,name,account_status,currency,amount_spent&access_token=${client.token}`)
    ]);
    const uData = await uRes.json();
    const aData = await aRes.json();
    if (uData.error) throw new Error(uData.error.message);
    const accounts = aData.data || [];
    const accountsWithInsights = await Promise.all(accounts.map(async (acc) => {
      try {
        const [iRes, cRes] = await Promise.all([
          fetch(`${META_API}/${acc.id}/insights?fields=impressions,clicks,spend,reach,cpc,ctr&date_preset=${datePreset}&access_token=${client.token}`),
          fetch(`${META_API}/${acc.id}/campaigns?fields=id,name,status,objective&limit=20&access_token=${client.token}`)
        ]);
        const iData = await iRes.json();
        const cData = await cRes.json();
        const campaigns = cData.data || [];
        const insights = iData.data?.[0] || null;
        const health = computeHealth(insights, campaigns);
        return { ...acc, insights, campaigns, health };
      } catch { return { ...acc, insights: null, campaigns: [], health: { score: null, alerts: [], tags: [] } }; }
    }));
    return { ...client, fbName: uData.name, accounts: accountsWithInsights, error: null };
  } catch (e) {
    return { ...client, fbName: null, accounts: [], error: e.message };
  }
}

async function askClaude(clientName, summary) {
  const prompt = `Você é um especialista em tráfego pago no Meta Ads trabalhando para a agência Hikari Consultoria.

Analise os dados abaixo do cliente "${clientName}" e forneça:
1. Um diagnóstico rápido (2-3 linhas)
2. Até 3 recomendações práticas e específicas numeradas

Dados do período:
- Impressões: ${fmtInt(summary.impressions)}
- Cliques: ${fmtInt(summary.clicks)}
- CTR: ${Number(summary.ctr || 0).toFixed(2)}%
- Gasto: R$ ${fmt(summary.spend)}
- CPC: R$ ${fmt(summary.cpc)}
- Alcance: ${fmtInt(summary.reach)}
- Campanhas ativas: ${summary.active} de ${summary.campaigns} total
- Score de saúde: ${summary.score}/10

Seja direto, prático e fale em português brasileiro. Não use markdown com asteriscos, use texto limpo.`;

  const res = await fetch(CLAUDE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Não foi possível gerar análise.";
}

const Pill = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "5px 13px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.15s",
    background: active ? "#1877f2" : "#0d0d14", color: active ? "#fff" : "#4b5563",
    outline: active ? "none" : "1px solid #1a1f2e",
  }}>{label}</button>
);

const HealthBar = ({ score }) => {
  if (score === null) return <span style={{ fontSize: 11, color: "#4b5563" }}>—</span>;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 5, background: "#1a1f2e", borderRadius: 99, overflow: "hidden", minWidth: 50 }}>
        <div style={{ width: `${score * 10}%`, height: "100%", background: scoreColor(score), borderRadius: 99, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: scoreColor(score), minWidth: 24 }}>{score}</span>
    </div>
  );
};

export default function MultiDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("overview");
  const [datePreset, setDatePreset] = useState("last_30d");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("name");
  const [campaignSearch, setCampaignSearch] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("ALL");
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [aiLoading, setAiLoading] = useState({});

  async function loadData(preset) {
    const results = await Promise.all(CLIENTS.map(c => fetchClient(c, preset)));
    setData(results);
    return results;
  }

  useEffect(() => {
    setLoading(true);
    loadData(datePreset).finally(() => setLoading(false));
  }, []);

  async function handleDateChange(preset) {
    setDatePreset(preset);
    setReloading(true);
    setAiAnalysis({});
    await loadData(preset);
    setReloading(false);
  }

  const clientSummary = (c) => {
    const spend = c.accounts.reduce((s, a) => s + Number(a.insights?.spend || 0), 0);
    const clicks = c.accounts.reduce((s, a) => s + Number(a.insights?.clicks || 0), 0);
    const impressions = c.accounts.reduce((s, a) => s + Number(a.insights?.impressions || 0), 0);
    const reach = c.accounts.reduce((s, a) => s + Number(a.insights?.reach || 0), 0);
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpc = clicks > 0 ? spend / clicks : 0;
    const campaigns = c.accounts.reduce((s, a) => s + (a.campaigns?.length || 0), 0);
    const active = c.accounts.reduce((s, a) => s + (a.campaigns?.filter(cp => cp.status === "ACTIVE").length || 0), 0);
    const totalAmount = c.accounts.reduce((s, a) => s + Number((a.amount_spent || 0)) / 100, 0);
    const scores = c.accounts.map(a => a.health?.score).filter(s => s !== null);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    const allAlerts = c.accounts.flatMap(a => a.health?.alerts || []);
    return { spend, clicks, impressions, reach, ctr, cpc, campaigns, active, totalAmount, avgScore, allAlerts };
  };

  const filteredData = useMemo(() => {
    let d = [...data];
    if (search) d = d.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter === "OK") d = d.filter(c => !c.error);
    if (statusFilter === "ERRO") d = d.filter(c => !!c.error);
    d.sort((a, b) => {
      const sa = clientSummary(a), sb = clientSummary(b);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "spend_desc") return sb.spend - sa.spend;
      if (sortBy === "spend_asc") return sa.spend - sb.spend;
      if (sortBy === "clicks_desc") return sb.clicks - sa.clicks;
      if (sortBy === "ctr_desc") return sb.ctr - sa.ctr;
      if (sortBy === "health_asc") return (sa.avgScore ?? 99) - (sb.avgScore ?? 99);
      return 0;
    });
    return d;
  }, [data, search, statusFilter, sortBy]);

  const totalSpend = data.reduce((s, c) => s + clientSummary(c).spend, 0);
  const totalClicks = data.reduce((s, c) => s + clientSummary(c).clicks, 0);
  const totalCampaigns = data.reduce((s, c) => s + clientSummary(c).campaigns, 0);
  const totalActive = data.reduce((s, c) => s + clientSummary(c).active, 0);
  const alertCount = data.reduce((s, c) => s + clientSummary(c).allAlerts.filter(a => a.level === "red").length, 0);

  const clientDetail = selected ? data.find(d => d.name === selected) : null;

  const filteredCampaigns = (campaigns) => {
    let r = [...campaigns];
    if (campaignSearch) r = r.filter(c => c.name.toLowerCase().includes(campaignSearch.toLowerCase()));
    if (campaignStatus !== "ALL") r = r.filter(c => c.status === campaignStatus);
    return r;
  };

  async function handleAnalyze(clientName) {
    const client = data.find(d => d.name === clientName);
    if (!client) return;
    const s = clientSummary(client);
    setAiLoading(p => ({ ...p, [clientName]: true }));
    try {
      const text = await askClaude(clientName, { ...s, score: s.avgScore });
      setAiAnalysis(p => ({ ...p, [clientName]: text }));
    } catch (e) {
      setAiAnalysis(p => ({ ...p, [clientName]: "Erro ao gerar análise. Tente novamente." }));
    }
    setAiLoading(p => ({ ...p, [clientName]: false }));
  }

  const presetLabel = DATE_PRESETS.find(d => d.value === datePreset)?.label || "30d";

  if (loading) return (
    <div style={{ background: "#050508", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 52, height: 52, border: "3px solid #1877f2", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
        <div style={{ color: "#fff", fontWeight: 700, marginBottom: 6, fontFamily: "monospace" }}>Hikari Consultoria</div>
        <div style={{ color: "#4b5563", fontSize: 13, fontFamily: "monospace" }}>Carregando {CLIENTS.length} clientes...</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#050508", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", color: "#e5e7eb" }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        .card { animation: fadeIn 0.35s ease forwards; background: #0d0d14; border: 1px solid #1a1f2e; border-radius: 14px; }
        .client-card:hover { border-color: #1877f2 !important; transform: translateY(-2px); }
        .client-card { transition: all 0.2s; cursor: pointer; }
        input[type=text] { background: #0d0d14; color: #e5e7eb; border: 1px solid #1a1f2e; border-radius: 8px; padding: 7px 12px; font-size: 13px; outline: none; }
        input[type=text]:focus { border-color: #1877f2; }
        select { background: #0d0d14; color: #e5e7eb; border: 1px solid #1a1f2e; border-radius: 8px; padding: 7px 12px; font-size: 13px; cursor: pointer; outline: none; }
        .ai-btn { background: linear-gradient(135deg, #1877f2, #7c3aed); color: #fff; border: none; border-radius: 8px; padding: 8px 16px; font-size: 12px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .ai-btn:hover { opacity: 0.85; }
        .ai-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* Top bar */}
      <div style={{ borderBottom: "1px solid #1a1f2e", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {view === "detail" && (
            <button onClick={() => { setView("overview"); setSelected(null); setCampaignSearch(""); setCampaignStatus("ALL"); }}
              style={{ background: "none", border: "1px solid #1a1f2e", color: "#9ca3af", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Voltar</button>
          )}
          <div style={{ width: 34, height: 34, background: "#1877f2", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 900 }}>𝕗</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>Hikari · Meta Ads</div>
            <div style={{ fontSize: 11, color: "#4b5563" }}>{view === "detail" ? clientDetail?.name : `${filteredData.length} de ${data.length} clientes`}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          {reloading && <div style={{ width: 16, height: 16, border: "2px solid #1877f2", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />}
          {DATE_PRESETS.map(d => (
            <Pill key={d.value} label={d.label} active={datePreset === d.value} onClick={() => handleDateChange(d.value)} />
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>

        {view === "overview" && (
          <>
            {/* Global metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Clientes", value: data.length, icon: "👥", color: "#1877f2" },
                { label: `Gasto (${presetLabel})`, value: `R$ ${fmt(totalSpend)}`, icon: "💰", color: "#22c55e" },
                { label: "Campanhas ativas", value: `${totalActive}/${totalCampaigns}`, icon: "📢", color: "#f59e0b" },
                { label: `Cliques (${presetLabel})`, value: fmtInt(totalClicks), icon: "🖱️", color: "#a78bfa" },
                { label: "Alertas críticos", value: alertCount, icon: "🚨", color: alertCount > 0 ? "#ef4444" : "#22c55e" },
              ].map((m, i) => (
                <div key={i} className="card" style={{ padding: "15px", animationDelay: `${i * 0.05}s` }}>
                  <div style={{ fontSize: 19, marginBottom: 7 }}>{m.icon}</div>
                  <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontWeight: 800, fontSize: 17, color: m.color }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Filters bar */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              <input type="text" placeholder="🔍  Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 180 }} />
              <div style={{ display: "flex", gap: 6 }}>
                {["ALL", "OK", "ERRO"].map(s => (
                  <Pill key={s} label={s === "ALL" ? "Todos" : s} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
                ))}
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div style={{ fontSize: 11, color: "#374151", marginBottom: 12, fontWeight: 700, letterSpacing: 1 }}>
              CLIENTES {filteredData.length !== data.length && <span style={{ color: "#1877f2" }}>({filteredData.length} filtrado{filteredData.length !== 1 ? "s" : ""})</span>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 12 }}>
              {filteredData.map((c, i) => {
                const s = clientSummary(c);
                const redAlerts = s.allAlerts.filter(a => a.level === "red");
                const yellowAlerts = s.allAlerts.filter(a => a.level === "yellow");
                return (
                  <div key={i} className="card client-card" style={{ padding: 18, border: `1px solid ${redAlerts.length > 0 ? "#7f1d1d66" : "#1a1f2e"}`, animationDelay: `${i * 0.06}s` }}
                    onClick={() => { setSelected(c.name); setView("detail"); }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "#4b5563" }}>{c.fbName || "—"}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                        <span style={{ background: c.error ? "#7f1d1d22" : "#14532d22", color: c.error ? "#f87171" : "#22c55e", border: `1px solid ${c.error ? "#7f1d1d44" : "#14532d44"}`, borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>
                          {c.error ? "ERRO" : "OK"}
                        </span>
                        {redAlerts.length > 0 && (
                          <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 700 }}>🚨 {redAlerts.length} alerta{redAlerts.length > 1 ? "s" : ""}</span>
                        )}
                        {redAlerts.length === 0 && yellowAlerts.length > 0 && (
                          <span style={{ fontSize: 10, color: "#f59e0b", fontWeight: 700 }}>⚠️ {yellowAlerts.length}</span>
                        )}
                      </div>
                    </div>

                    {/* Health score */}
                    {s.avgScore !== null && (
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 4 }}>SAÚDE DA CONTA</div>
                        <HealthBar score={s.avgScore} />
                      </div>
                    )}

                    {c.error ? (
                      <div style={{ fontSize: 12, color: "#f87171" }}>{c.error}</div>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                        {[
                          { label: `Gasto (${presetLabel})`, value: `R$ ${fmt(s.spend)}` },
                          { label: `Cliques`, value: fmtInt(s.clicks) },
                          { label: "CTR", value: `${s.ctr.toFixed(2)}%` },
                          { label: "Ativas/Total", value: `${s.active}/${s.campaigns}` },
                        ].map((m, j) => (
                          <div key={j} style={{ background: "#080810", borderRadius: 7, padding: "8px 10px" }}>
                            <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 2 }}>{m.label}</div>
                            <div style={{ fontWeight: 700, fontSize: 13 }}>{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ marginTop: 10, fontSize: 12, color: "#1877f2", textAlign: "right" }}>Ver detalhes →</div>
                  </div>
                );
              })}

              {filteredData.length === 0 && (
                <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#4b5563", padding: "40px 0", fontSize: 14 }}>
                  Nenhum cliente encontrado.
                </div>
              )}
            </div>
          </>
        )}

        {view === "detail" && clientDetail && (() => {
          const s = clientSummary(clientDetail);
          const analysis = aiAnalysis[clientDetail.name];
          const analyzing = aiLoading[clientDetail.name];

          return (
            <div>
              {/* Campaign filters */}
              <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
                <input type="text" placeholder="🔍  Buscar campanha..." value={campaignSearch} onChange={e => setCampaignSearch(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
                <div style={{ display: "flex", gap: 6 }}>
                  {["ALL", "ACTIVE", "PAUSED", "ARCHIVED"].map(st => (
                    <Pill key={st} label={st === "ALL" ? "Todas" : st} active={campaignStatus === st} onClick={() => setCampaignStatus(st)} />
                  ))}
                </div>
              </div>

              {/* Alerts */}
              {s.allAlerts.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  {s.allAlerts.map((a, i) => (
                    <div key={i} style={{
                      background: a.level === "red" ? "#1a0808" : "#1a1200",
                      border: `1px solid ${a.level === "red" ? "#7f1d1d55" : "#78350f55"}`,
                      borderRadius: 10, padding: "10px 14px", marginBottom: 8,
                      display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13
                    }}>
                      <span style={{ fontSize: 15 }}>{a.level === "red" ? "🚨" : "⚠️"}</span>
                      <span style={{ color: a.level === "red" ? "#fca5a5" : "#fde68a" }}>{a.msg}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* AI Analysis box */}
              <div className="card" style={{ padding: 20, marginBottom: 18, border: "1px solid #2d1f5e" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #1877f2, #7c3aed)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✦</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Análise por IA</div>
                      <div style={{ fontSize: 11, color: "#4b5563" }}>Claude · Hikari Consultoria</div>
                    </div>
                  </div>
                  <button className="ai-btn" onClick={() => handleAnalyze(clientDetail.name)} disabled={analyzing}>
                    {analyzing ? "Analisando..." : analysis ? "Reanalisar" : "Analisar conta"}
                  </button>
                </div>

                {analyzing && (
                  <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#6b7280", fontSize: 13 }}>
                    <div style={{ width: 14, height: 14, border: "2px solid #7c3aed", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    Gerando análise com base nos dados de {presetLabel}...
                  </div>
                )}

                {!analyzing && !analysis && (
                  <div style={{ color: "#374151", fontSize: 13, padding: "8px 0" }}>
                    Clique em "Analisar conta" para receber um diagnóstico detalhado e recomendações práticas geradas pela IA.
                  </div>
                )}

                {!analyzing && analysis && (
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: "#d1d5db", whiteSpace: "pre-wrap", borderTop: "1px solid #1a1f2e", paddingTop: 14 }}>
                    {analysis}
                  </div>
                )}
              </div>

              {/* Accounts */}
              {clientDetail.error ? (
                <div style={{ background: "#1a0a0a", border: "1px solid #7f1d1d", borderRadius: 12, padding: 24, color: "#fca5a5" }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Erro ao carregar dados</div>
                  <div style={{ fontSize: 13 }}>{clientDetail.error}</div>
                </div>
              ) : clientDetail.accounts.map((acc, ai) => {
                const camps = filteredCampaigns(acc.campaigns);
                return (
                  <div key={ai} style={{ marginBottom: 20 }}>
                    <div className="card" style={{ padding: 18, marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{acc.name}</div>
                          <div style={{ fontSize: 11, color: "#4b5563" }}>{acc.id} · {acc.currency}</div>
                        </div>
                        {acc.health?.score !== null && (
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 4 }}>SAÚDE</div>
                            <HealthBar score={acc.health.score} />
                          </div>
                        )}
                      </div>
                      {acc.insights && (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 9 }}>
                          {[
                            { label: "Alcance", value: fmtInt(acc.insights.reach) },
                            { label: "Impressões", value: fmtInt(acc.insights.impressions) },
                            { label: "Cliques", value: fmtInt(acc.insights.clicks) },
                            { label: "Gasto", value: `R$ ${fmt(acc.insights.spend)}` },
                            { label: "CPC", value: `R$ ${fmt(acc.insights.cpc)}` },
                            { label: "CTR", value: `${Number(acc.insights.ctr || 0).toFixed(2)}%` },
                          ].map((m, j) => (
                            <div key={j} style={{ background: "#080810", borderRadius: 8, padding: "10px 12px" }}>
                              <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 2 }}>{m.label}</div>
                              <div style={{ fontWeight: 700, fontSize: 14 }}>{m.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {acc.campaigns.length > 0 && (
                      <div className="card" style={{ padding: 18 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 12, color: "#374151", letterSpacing: 1, display: "flex", justifyContent: "space-between" }}>
                          <span>CAMPANHAS</span>
                          <span style={{ color: "#4b5563" }}>{camps.length} de {acc.campaigns.length}</span>
                        </div>
                        {camps.length === 0 ? (
                          <div style={{ color: "#4b5563", fontSize: 13, padding: "8px 0" }}>Nenhuma campanha com esse filtro.</div>
                        ) : camps.map((c, ci) => (
                          <div key={ci} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: ci < camps.length - 1 ? "1px solid #111" : "none", flexWrap: "wrap", gap: 8 }}>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                              <div style={{ fontSize: 11, color: "#4b5563" }}>{c.objective || "—"}</div>
                            </div>
                            <div style={{ background: statusColor(c.status) + "22", color: statusColor(c.status), border: `1px solid ${statusColor(c.status)}44`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                              {c.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
