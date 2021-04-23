import Head from 'next/head'
import Layout from '../components/layout'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import Product from '../components/homeproduct';
import MainLayout from '../layouts/MainLayout';
import UpdateBookModal from '../components/UpdateBookModal';


const URL = config.URL + "/bookshelf";
let i = 0;
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


export default function Login({ token }) {
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
    const handleUpdateBook = (id, data) => {
        setBook({ ...data });
        setVisible(true);
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
        <div className={styles.container}>
            <section className={styles.sec1} id="sec-1">
                <div className={styles.seccontainer}>
                    <h1>PSU Libary</h1>
                    <a href="#sec-2">
                        <div className={styles.scrolldown}></div>
                    </a>
                </div>
            </section>
            <section className={styles.sec2} id="sec-2">
                <Navbar></Navbar>
                <div className={styles.seccontainer}>
                    <Head>
                        <title>Home Page</title>
                    </Head>
                
                <div className={styles.productlist}>
                    {printBook()}
                </div>
                </div>
            </section>
        </div>

    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
