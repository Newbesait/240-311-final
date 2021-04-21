import React, { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout';
import AddBookForm from '../components/AddBookForm';
import Product from '../components/Product';
import { Modal } from 'antd';
import UpdateBookModal from '../components/UpdateBookModal';
import axios from 'axios'
import config from '../config/config'
import styles from '../styles/update.module.css'

const URL = config.URL + "/bookshelf";

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

const ProductsPage = () => {

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

    const handleUpdateBook = (id, data) => {
        setBook({ ...data });
        setVisible(true);
    }

    const handleDeleteBook = (id) => {
        const filteredProducts = books.filter((book) => book.id !== id);
        setBooks([...filteredProducts]);
    }
    const printBook = () => {
        return (books.map((book, index) => (
            <div>
                <Product
                    key={index}
                    data={book}
                    onUpdate={handleUpdateBook}
                    onDelete={handleUpdateBook}
                />
                <UpdateBookModal
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    data={book}
                />
            </div>
        ))

        )
    }

    return (
        <MainLayout>
            <div className={styles.container}>
                <section>
                    <h3>Add New Book</h3>
                    <AddBookForm onCreate={handleCreateBook} />
                </section>
                <section>
                    <h3>Books List</h3>
                    <div className={styles.productlist}>
                      
                            {printBook()}
                        
                    </div>
                </section>
            </div>
        </MainLayout>
    )
}

export default ProductsPage;