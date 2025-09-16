import Link from "next/link";
import { kpis } from "@/app/data/kpi"; //imported the local data (statically available at build time)


export default function Home() {
  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    {kpis.map((kpi) => (
      // here each items in data will be of separate pages in kpi slug
      <Link
        key={kpi.id}
        href={`/kpi/${kpi.id}`} 
        className="block border rounded-2xl shadow p-4 hover:shadow-lg transition"
      >
        <h2 className="text-xl font-bold">{kpi.title}</h2>
        <p className="text-gray-600">{kpi.description}</p>
        <p className="text-2xl font-semibold mt-2">{kpi.value}</p>
      </Link>
    ))}
  </main>
  );
}
