import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import {AuthContext} from './context';
import {useEffect, useState} from 'react';


function App() {

    const [isAuth, setIsAuth] = useState(false);

    // Тут мы проверяем, закончился запрос на сервер или нет
    const [isLoading, setLoading] = useState(true);

    // Тут мы проверяем, авторизован пользователь или нет
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        };
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}


export default App;
