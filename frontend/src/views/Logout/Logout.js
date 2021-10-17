import React from "react";
import { Redirect } from "react-router";
import store from "redux/store";
import axios from "axios";

export default function Logout()
{
    axios.post(`/logout`);
    store.dispatch({type: 'logout'});
    return <><Redirect to='/'/></>
}