import {useRef, useState} from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';


const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', body: ''});

    // const bodyInputRef = useRef();

    // const addNewPost = (e) => {
    //     e.preventDefault()
    //     console.log(bodyInputRef.current.value);
    // }

    const addNewPost = (e) => {
        e.preventDefault();
        // setPosts([...posts, {...post, id: Date.now()}]);
        const newPost = {
            ...post,
            id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''});
    }

    return (
        <form>

            {/* Неуправляемый компонент */}
            {/* <input 
                ref={bodyInputRef}
                type='text' 
                placeholder='Название поста'
            />
            <input
                ref={bodyInputRef}
                type='text' 
                placeholder='Описание поста'
            /> */}
            {/* <MyInput 
                ref={bodyInputRef}
                type='text' 
                placeholder='Название поста'
            />
            <MyInput
                ref={bodyInputRef}
                type='text' 
                placeholder='Описание поста'
            /> */}

            {/* Управляемый компонент */}
            <MyInput 
                value={post.title} 
                onChange={e => setPost({...post, title: e.target.value})}
                type='text' 
                placeholder='Название поста'
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type='text' 
                placeholder='Описание поста'
            />

            <MyButton onClick={addNewPost}>Создать пост</MyButton>

        </form>
    )
}


export default PostForm;
