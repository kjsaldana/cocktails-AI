import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";
import Notification from "../components/Notification";

export default function Layout() {
    const getLocalStorage = useAppStore((state) => state.getLocalStorage)
    useEffect(() => getLocalStorage(), [])

    return (
        <>
            <Header />
            <main className="container mx-auto py-16">
                <Outlet />
            </main>
            <Modal />
            <Notification />
        </>
    )
}
