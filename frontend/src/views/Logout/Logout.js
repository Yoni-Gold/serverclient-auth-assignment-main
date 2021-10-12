import React from "react";
import { Redirect } from "react-router";
import store from "redux/store";

export default function Logout()
{
    store.dispatch({type: 'logout'});
    return <><Redirect to='/'/></>
}