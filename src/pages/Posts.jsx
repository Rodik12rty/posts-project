import {useState, useMemo, useEffect, useRef} from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/myModal/MyModal';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import {usePosts} from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import {useFetching} from '../hooks/useFetching';
import {getPageCount} from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import {useObserver} from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


const Posts = () => {

    // const [posts, setPosts] = useState([
    //     {id: 1, title: 'A', body: 'Cescription'},
    //     {id: 2, title: 'B', body: 'BDescription'},
    //     {id: 3, title: 'C', body: 'ADescription'}
    // ]);

    const [posts, setPosts] = useState([]);

    const [filter, setFilter] = useState({sort: '', query: ''});

    const [modal, setModal] = useState(false);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const[fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    // Получаем ссылку на DOM элемент, который находится последним в списке
    const lastElement = useRef();

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        // console.log(page);
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);


    // Получаем newPost из дочернего компонента
    const createPost = (newPost) => {
        setPosts([newPost, ...posts]);
        setModal(false);
    }

    // Получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
        // fetchPosts(limit, page);
    }


    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Добавить пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <MySelect 
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Кол-во подгружаемых элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: 50, name: '50'},
                    {value: -1, name: 'Показать все'}
                ]}
            />

            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов 1' />
            {/* <div ref={lastElement} style={{height: 20, background: 'red'}}></div> */}
            <div ref={lastElement}></div>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
            }
            {/* <Pagination
                totalPages={totalPages}
                changePage={changePage}
                page={page}
            /> */}
        </div>
    );

}


export default Posts;
