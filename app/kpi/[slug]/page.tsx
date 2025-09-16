import {kpis} from "@/app/data/kpi";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
   slug: string ; // `slug` comes from the URL (e.g. /kpi/lead-to-opportunity)
}

/**
 * generateStaticParams is the App Router equivalent of getStaticPaths (Pages Router).
 * It runs only at build time and tells Next.js which [slug] pages to pre-generate.
 * This is why we DON'T need getStaticProps here — Next.js already handles static generation
 * when we directly import or fetch data inside our component.
 * 
 * In Next.js 15 App Router, there is NO getStaticProps or getServerSideProps anymore.
 *
 * Why?
 *  - Every component in the app directory is a Server Component by default.
 *  - This means we can just import data (or fetch) at the top level and it will
 *    run on the server during build (static) or on demand (SSR) depending on how we fetch.
 */
export async function generateStaticParams() {
  return kpis.map((kpi) => ({ id: kpi.id }));
}


export default function KpiDetailPage({ params }: {params : Props}) {
  // Find the correct KPI based on the `id` in the URL
  const kpi = kpis.find((k) => k.id === params.slug);
  if(!kpi){
    notFound()
  }
  return (
    <main className="p-6 max-w-xl mx-auto my-20 border rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-2">{kpi.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{kpi.details}</p>
      <p className="text-3xl font-bold mb-6">{kpi.value}</p>

      {/* Link to go back to the KPI list */}
      <Link href="/" className="text-blue-600">
         Back to all KPIs
      </Link>
    </main>
  );
}
