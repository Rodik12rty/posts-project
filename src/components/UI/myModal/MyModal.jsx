import classes from './MyModal.module.css';


const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {/* stopPropagation() специальная функция которая предотвращает результат выполнение функции setVisible(false) для ребёнка */}
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}


export default MyModal;
