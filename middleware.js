import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Method to get the token from cookies

export async function middleware(req) {
    // Get the token from the request's cookies
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If no token (i.e., user is not authenticated), redirect to sign-in
    if (
        !token &&
        !req.nextUrl.pathname.startsWith("/account/sign-in") &&
        !req.nextUrl.pathname.startsWith("account/register")
    ) {
        return NextResponse.redirect(new URL("/account/sign-in", req.url));
    }

    // Check if the user is trying to access an admin route and if they have the correct role
    // if (req.nextUrl.pathname.startsWith("/admin") && token.role !== Roles.ADMIN) {
    //     // Redirect non-admin users to the sign-in page
    //     return NextResponse.redirect(new URL("/account/signin", req.url));
    // }

    // Allow access to the admin page if the user has the admin role
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/account/:path*", "/users/:path*"], // Protect routes under /admin/
};
