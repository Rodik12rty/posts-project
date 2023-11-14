import {useRef, useEffect} from "react";


export const useObserver = (ref, canLoad, isLoading, callback) => {

    // Сохраняем сюда данные что-бы не терять их от рендера к рендеру, и что-бы у нас был доступ к переменной observer(на 19 строчке) внутри компонента
    const observer = useRef();

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        let cb = function(entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                // console.log("div в зоне");
                callback();
            };
        };
        observer.current = new IntersectionObserver(cb);
        // Тут мы указываем, за каким элементом мы будем наблюдаем
        observer.current.observe(ref.current);
    }, [isLoading]);

}
