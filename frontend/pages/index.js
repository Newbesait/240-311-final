import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import UpdateBookModal from '../components/UpdateBookModal';


const URL = config.URL + "/bookshelf";
const BORURL = config.URL + "/borrow";
const REURL = config.URL + "/return";


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


export default function home() {
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
        //console.log('books:', books.data)
    }

    const handleBorrow = async (id, stock) => {
        if (stock > 0) {
            let st = stock - 1
            setStock(st)
            console.log('st=' + st)
            const result = await axios.put(`${BORURL}/${id}`, { id, stock })
        }
        console.log(stock)
        getBooks()
    }

    const handleReturn = async (id, stock) => {
        const result = await axios.put(`${REURL}/${id}`, { id, stock })
        console.log(stock)
        getBooks()
    }

    const printBooks = () => {
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
                        <button className='Borrow' onClick={() => handleBorrow(book.id, book.stock)}>Borrow</button>
                        <button className='Return' onClick={() => handleReturn(book.id, book.stock)}>Return</button>

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
    }

    return (
        <div className={styles.container}>
            <section className={styles.sec1} id="sec-1">
                <div className={styles.seccontainer}>
                    {/* <h1 className={styles.head}>PSU Libary</h1> */}
                    <div className={styles.sign}>
                        <span className={styles.fastflicker}>PS</span>U<span className={styles.flicker}>Li</span>bary
                    </div>
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
                        {printBooks()}
                    </div>
                </div>
            </section>
        </div>

    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
