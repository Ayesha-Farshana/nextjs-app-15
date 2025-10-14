import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("<site_name>/api/method/<end-point>", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from Frappe" },
        { status: res.status }
      );
    }

    const data = await res.json();
     // Transform to unified structure
     const items = [
      ...(data.message.lead || []).map((lead: any, idx: number) => ({
        id: `lead-${idx}`,
        title: lead.first_name,
        subtitle: `Gender: ${lead.gender || "N/A"}, Language: ${lead.language}`,
        type: "lead",
      })),
      ...(data.message.Opportunity || []).map((opp: any, idx: number) => ({
        id: `opp-${idx}`,
        title: opp.customer_name,
        subtitle: `Status: ${opp.status}`,
        type: "opportunity",
      })),
    ];


    console.log(items)
    return NextResponse.json({ items }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
