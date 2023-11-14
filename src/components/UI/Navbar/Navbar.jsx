import {NavLink} from "react-router-dom";
import MyButton from "../button/MyButton";
import {useContext} from "react";
import {AuthContext} from "../../../context";


const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = event => {
        setIsAuth(false);
        // Тут мы удаляем по ключу auth, запись из localStorage
        localStorage.removeItem('auth');
    }


    return (
        <div className='navbar'>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className='navbar__links'>
                <NavLink to="/about">О нас</NavLink>
                <NavLink to="/posts">Посты</NavLink>
            </div>
        </div>
    )
}


export default Navbar;
