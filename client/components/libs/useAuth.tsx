import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAuth(shouldRedirect:any) {
    const { data: session }:any = useSession();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log("useAuth", session)
        if (session?.error === "RefreshAccessTokenError") {
            signOut({ callbackUrl: '/auth/login', redirect: shouldRedirect });
        }

        if (session === null) {
            if (router.route !== '/auth/login') {
                router.replace('/auth/login');
            }
            setIsAuthenticated(false);
        } else if (session !== undefined) {
            if (router.route === '/auth/login') {
                router.replace('/');
            }
            setIsAuthenticated(true);
        }
    }, [router, session, shouldRedirect]);

    return isAuthenticated;
}