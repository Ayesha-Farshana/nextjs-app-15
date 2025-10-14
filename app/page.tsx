// // example for fetching from loacl json
// import Link from "next/link";
// import { kpis } from "@/app/data/kpi"; //imported the local data (statically available at build time)


// export default function Home() {
//   return (
//     <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//     {kpis.map((kpi) => (
//       // here each items in data will be of separate pages in kpi slug
//       <Link
//         key={kpi.id}
//         href={`/kpi/${kpi.id}`} 
//         className="block border rounded-2xl shadow p-4 hover:shadow-lg transition"
//       >
//         <h2 className="text-xl font-bold">{kpi.title}</h2>
//         <p className="text-gray-600">{kpi.description}</p>
//         <p className="text-2xl font-semibold mt-2">{kpi.value}</p>
//       </Link>
//     ))}
//   </main>
//   );
// }


// example for fetching from LENS and Strapi CMS
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Item = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetching from LENS
    async function fetchItems() {
      try {
        const res = await fetch("/api/lead-opp"); 
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setItems(data.items || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();

    // fetching from Strapi
    async function getApolloClient() {
      const res = await fetch("/api/get-from-apollo"); 
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      console.log("from apollo", data)
    }

    getApolloClient();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    // example
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/kpi}/${item.id}`}
          className="block border rounded-2xl shadow p-4 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">{item.title}</h2>
          <p className="text-gray-600">{item.subtitle}</p>
          <p className="mt-2 text-sm text-gray-400">{item.type.toUpperCase()}</p>
        </Link>
      ))}
    </main>
  );
}
