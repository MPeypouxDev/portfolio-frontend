import { Outlet  } from "react-router-dom";
import Background from './Background';

export default function EmptyLayout() {
    return (
        <>
            <Background />
            <Outlet />
        </>
    );
}