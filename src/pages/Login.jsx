import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {useContext} from "react";
import {AuthContext} from "../context";


const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        // Тут мы сохраняем true в localStorage, и в localStorage можно сохранять только строки
        localStorage.setItem('auth', 'true');
    }

    
    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введите логин" />
                <MyInput type="password" placeholder="Введите пароль" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
}


export default Login;
