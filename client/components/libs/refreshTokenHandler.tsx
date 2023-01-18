import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshTokenHandler = (props:any) => {
    const { data: session }:any = useSession();

    useEffect(() => {
        if(!!session) {
            props.setInterval(session.expires <  Date.now()? 0 :session.expires - Date.now());
            
            // const timeRemaining = Math.round((((session.exp - 30 * 60 * 1000) - Date.now()) / 1000));
            // props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
        }
    }, [props, session]);

    return null;
}

export default RefreshTokenHandler;