import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import useSWR, { mutate } from 'swr'
import Head from 'next/head'
import styles from '../styles/booksshelf.module.css'
import Navbar from "../components/navbar";
import config from '../config/config'



const URL = config.URL + "/bookshelf";

const fetcher = url => axios.get(url).then(res => res.data)
const shelf = () => {
    const [books, setBooks] = useState({ list: [{ id: 1, name: "Math", author: "Aj.Keng", page: 200, stock: 1, image: "aa" },] })
    const [book, setBook] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [page, setPage] = useState(0)
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState('')


    const getBooks = async () => {
        let books = await axios.get(URL)
        setBooks(books.data)
        //console.log('books:', books.data)
    }

    const printBooks = () => {
        if (books && books.length)
            return books.map((books, index) =>
                <li className={styles.listItem} key={index}>
                    <img src={books.image} alt="Trulli" width="200" height="250"></img><br />
                    Bookname:{(books) ? books.name : '-'}<br />
                    Author:{(books) ? books.author : '-'}<br />
                    Page:{(books) ? books.page : 0}<br />
                    Stock:{(books) ? books.stock : 0}<br />
                </li>
            )
        else
            return <li> No Book</li>
    }


    return (
        <div className={styles.container}>


            <Navbar />
            <h1>library</h1>
            <ul className={styles.list} >
                {printBooks()}
            </ul>
        </div>
    )




}

export default shelf

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}