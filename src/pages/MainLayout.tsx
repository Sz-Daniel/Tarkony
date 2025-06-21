import { Outlet } from "react-router-dom"

import { Footer } from "../components/layout/Footer"
import { LoggerComponent } from "../devtools/LoggerComponent"


export function MainLayout() {
    return(<>
    <LoggerComponent/>
    <Outlet/>
    <Footer/>
    </>)   
}