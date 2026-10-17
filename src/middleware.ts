import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Only match admin routes and login route.
     * All public routes bypass auth checks so Vercel can cache them at the edge.
     */
    "/admin/:path*",
    "/login",
  ],
};
