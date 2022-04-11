import React from "react";
import Branches from "../pages/branches";
import Dashboard from "../pages/dashboard";
import Employees from "../pages/employees";


export interface baseRoutesInterface{
    title:string;
    path:string;
    component:React.FC;
}
export const baseRoutes:baseRoutesInterface[] = [
    {
        title:'Branches',
        path:'/',
        component:Branches,
    },
    {
        title:'Employees',
        path:'/employees',
        component:Employees,
    }
    
    
]