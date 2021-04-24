import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout';
import AddBookForm from '../components/AddBookForm';
import { Modal } from 'antd';
import UpdateBookModal from '../components/UpdateBookModal';
import axios from 'axios'
import config from '../config/config'
import styles from '../styles/update.module.css'
import withAuth from "../components/withAuth";

const URL = config.URL + "/bookshelf";
const URLFUN = config.URL +"/bookja"

const initProducts = [
    {
        id: 0,
        name: "teat",
        author: "Aj.Keng",
        page: 0,
        stock: 0,
        image: "static/images/add_image.png",
    }
];

const fetcher = url => axios.get(url).then(res => res.data)

let i = 0;

const admin = () => {

    const [books, setBooks] = useState(initProducts)
    const [book, setBook] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [page, setPage] = useState(0)
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState('')
    const [visible, setVisible] = useState(false);

    useEffect(() => { getBooks() }, [])

    const getBooks = async () => {
        let books = await axios.get(URL)
        setBooks(books.data)
        console.log('books:', books.data)
    }

    const handleCreateBook = (data) => {
        const newBook = { id: i++, ...data };
        setBooks([...books, newBook]);
    }

    const handleDelete = async (id) => {
        const result = await axios.delete(`${URLFUN}/${id}`)
       // console.log(result.data)
        getBooks()
    }
    const handleUpdate = async (id) => {
        const result = await axios.put(`${URLFUN}/${id}`, { id, name, author, page, stock,image })
        //console.log('student id update: ', result.data)
        getBooks()
    }


    const printBook = () => {
        if (books && books.length)
        return (books.map((book, index) => (
            <div>
                <div className='container' key={index}>
                    <img src={book.image} />
                    <h4>{book.name}</h4>
                    <small className='text-muted'>{book.author}</small>
                    <div className='info'>
                        <small className='page'>{book.page} Page</small>
                        <small className='page'>{book.stock} Lefts</small>
                    </div>
                    <hr />
                    <div className='action'>
                    <button className='Borrow' onClick={() => handleUpdate(book.id, book.stock)}>Update</button>
                        <button className='Return' onClick={() => handleDelete(book.id, book.stock)}>Delete</button>
                    </div>
                    <style jsx>{`
                .container {
                    padding: 10px;
                    border-radius: 10px;
                    min-width: 180px;
                    max-width: 200px;
                    box-shadow: 0 0 6px 0px rgba(0,0,0,.15);
                    margin: 0 10px 10px 0;
                }
                .info, .action {
                    display: flex;
                    justify-content: space-between;
                }
                img {
                    width: 100%;
                    height: 160px;
                }
                .quantity, .delete {
                    color: var(--red);
                }
                .price {
                    color: var(--green-dark);
                }
                .Borrow {
                    color: var(--blue);
                    border-right: 1px solid var(--gray);
                    width: 50%;
                    text-align: center;
                    cursor: pointer;
                }
                .Return {
                    width: 50%;
                    text-align: center;
                    cursor: pointer;
                }


            `}</style>
                </div>
                <UpdateBookModal
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    data={book}
                />
            </div>
        ))
        
        )
        else
        return <h1> No Book</h1>
    }

    return (
        <MainLayout>
            <div className={styles.container}>
               <section>
                    <h3>Books List</h3>


                    
                    <div className={styles.productlist}>
                            {printBook()}
                    </div>
                </section>
                <section>
                <div>
                    <h3>Add New Book</h3>
                    <div>
                    <AddBookForm onCreate={handleCreateBook} />
                    </div>
                    </div>
                </section>
             
            </div>
        </MainLayout>
    )
}

export default withAuth(admin);
//  export default admin;


export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}