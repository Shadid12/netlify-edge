import type { NextRequest } from "next/server";
import { MiddlewareRequest } from "@netlify/next";
import { getClient, q } from "./db";



export async function middleware(nextRequest: NextRequest) {
  const pathname = nextRequest.nextUrl.pathname;

  const middlewareRequest = new MiddlewareRequest(nextRequest);

  if (pathname.startsWith("/marketing")) {
    // Unlike NextResponse.next(), MiddlewareRequest.next() actually sends the request to the origin
    // So we can grab the response and transform it!
    const response = await middlewareRequest.next();

    const message = `This was a static page but has been transformed in ${nextRequest?.geo?.city}, ${nextRequest?.geo?.country} using @netlify/next in middleware.ts!`;

    // Transform the response HTML and props
    response.replaceText("#message", message);
    response.setPageProp("message", message);

    // Send Customized Promotions
    const client = getClient(nextRequest?.geo?.country);
    const promotionResponse = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('Promotion'))),
        q.Lambda(x => q.Get(x))
      )
    ) as any;
    response.setPageProp("promotion", promotionResponse.data);

    return response;
  }
}