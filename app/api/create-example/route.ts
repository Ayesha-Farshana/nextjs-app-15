import { NextResponse } from "next/server";

// same can be used for PUT
export async function POST(req: Request) {
    try {
      // 1. Parse parameters from request body
      const body = await req.json();
      // Example parameters
      // the incomming parameter has been destructured  
      const { lead_name, status, email } = body;
  
      // 2. Call Frappe API (POST)
      const res = await fetch("<siteurl>/api/resouce/<doctypename>", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": ""
        },
        body: JSON.stringify({
          lead_name,
          status,
          email,
        }),
      });
  
      // 3. Handle errors
      if (!res.ok) {
        return NextResponse.json(
          { error: "Failed to post data to Frappe" },
          { status: res.status }
        );
      }
  
      // 4. Return Frappe response
      const data = await res.json();
      return NextResponse.json({ message: "Success", data }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
  }