import { Outlet } from "react-router-dom"
import { LoggerComponent } from "../components/layout/LoggerComponent"
import { Footer } from "../components/layout/Footer"

export function MainLayout() {
    return(<>
    <LoggerComponent/>
    <Outlet/>
    <Footer/>
    </>)   
}