// applo client import
// https://www.apollographql.com/docs/react/get-started
import { client } from "@/app/lib/apollo-client";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";

interface AboutUsData {
    aboutUs: {
      heroSection: {
        heading: {
          title: string;
          subtitle: string;
          highlight: string;
        };
      };
    };
  }
  
export async function GET() {
  try {
    // sample single type from strapi cms
    const GET_ABOUT_US = gql`
      query Heading {
        aboutUs {
          heroSection {
            heading {
              title
              subtitle
              highlight
            }
          }
        }
      }
    `;

    // Execute GraphQL query
    const { data } = await client.query<AboutUsData>({ query: GET_ABOUT_US });
    //Use optional chaining (?) to safely access nested data
    return NextResponse.json({ success: true, data: data?.aboutUs }); 
  } catch (error: any) {
    console.error("GraphQL Error:", error);
    return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
  }
}
