import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setTitle } from "./setTitle";
import { signout } from "../../store/slices/user";


function HOC({child, auth}){
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenIsValid, setTokenIsValid] = useState(false);
    const TOKEN = localStorage.getItem("auth");

    const Child = child;

    useEffect(()=>{
        const title = setTitle(pathname);
        document.title = title;
    },[pathname])

    useEffect(()=>{
        async function checkAuth(){
            if ( auth){
                if(!TOKEN){
                    navigate("/");
                }
                if (TOKEN){
                    const res = await fetch ("/api/vi/user/check_token", {
                        headers: {Authentication: "bearer " + TOKEN},
                    });
                    if (res.status === 401){
                        dispatch(signout());
                        navigate("/");
                    }
                    if(res.status ===200){
                        console.log("200");
                        setTokenIsValid(true)
                    }
                }
            }
        }
        checkAuth();
    },[auth]);

    return(
        <>
        {(!auth || (auth && tokenIsValid)) && <Child/>} 
        </>
    )
}

export default HOC