import {Routes, Route, Navigate} from "react-router-dom";
// import About from "../pages/About";
// import Posts from "../pages/Posts";
// import PostIdPage from "../pages/PostIdPage";
// import Login from "../pages/Login";
// import Error from "../pages/Error";
import {privateRoutes, publicRoutes} from "../router/routes";
import {useContext} from "react";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";


const AppRouter = () => {

    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth
            ?
            <Routes>
                {/* <Route path="/about" element={<About />} />
                <Route path="/" element={<Navigate to={"/posts"} />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:id" element={<PostIdPage />} /> */}
                {privateRoutes.map((route, index) => 
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.element />} 
                    />
                )}
                {/* <Route path="/posts" element={<Posts />} /> */}
                <Route path="*" element={<Navigate to={"/posts"} />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map((route, index) => 
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.element />} 
                    />
                )}
                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
    )
}


export default AppRouter;
