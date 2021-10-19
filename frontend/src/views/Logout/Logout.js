import React , { useState , useEffect } from "react";
import { Redirect } from "react-router";
// axios, loading component and redux
import axios from "axios";
import { ThreeDots } from '@agney/react-loading';
import store from "redux/store";

export default function Logout()
{
    const [ requestState , setRequest ] = useState(null);
    useEffect(() => {
        (async () => {
            await axios.post(`/logout`);
            store.dispatch({type: 'logout'});
            setRequest('done');
        })()
    } , []);
    return <>{ requestState ? <Redirect to='/'/> : <ThreeDots width='200'/> }</>
}