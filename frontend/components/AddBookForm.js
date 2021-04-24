import React, { useState } from 'react';
import Button from './Button';
import config from '../config/config'
import axios from 'axios'

const addImageUrl = '/static/images/add_image.png';
const emptyImageUrl = '/static/images/noim.png';

const URL = config.URL + "/addbook";

const AddProductForm = props => {
    const [books, setBooks] = useState({})
    const [book, setBook] = useState({})
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [page, setPage] = useState(0)
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState(emptyImageUrl)
    const [buttonimage,setButton] = useState(addImageUrl)


    const disabled = name === '' || author === ''

    const handleChangeImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImage(e.target.result)
            setButton(e.target.result)
        }

        if (file)
            reader.readAsDataURL(file);
    }

    const handleCreate = e => {
        props.onCreate && props.onCreate({ name, author, page, stock, image })
        {addBook(name, author, page, stock, image)}
        setButton(addImageUrl)

    }

    const addBook = async (name, author, page, stock, image) => {
        let book = await axios.post(URL, { name, author, page, stock, image})
        setBook(book.data)

    }

    return (
        <div className='container'>
            <label className='form-control'>
                <p>Name</p>
                <input type='text' placeholder='Book Name' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className='form-control'>
                <p>Author</p>
                <input value={author} placeholder='Author Name' onChange={(e) => setAuthor(e.target.value)} />
            </label>
            <label className='form-control'>
                <p>Page</p>
                <input type='text' value={page} onChange={(e) => setPage(e.target.value)} />
            </label>
            <label className='form-control'>
                <p>Stock</p>
                <input type='text' value={stock} onChange={(e) => setStock(e.target.value)} />
            </label>
            <label className='form-control'>
                <img className='image' src={buttonimage} />
                <input className='input-file' type='file' onChange={handleChangeImage} />
            </label>
            <Button onClick={handleCreate} disabled={disabled}>Create</Button>
            <style jsx>{`
                .container {
                    padding: 12px;
                    border: 1px solid var(--gray-light2);
                    border-radius: 6px;
                    max-width: 350px;
                    margin-left: 500px;

                }
                input, textarea {
                    border: 1px solid var(--gray-light2);
                    border-radius: 6px;
                    padding: 8px;
                }
                .form-control, p {
                    margin-bottom: 4px;
                    display: flex;
                    flex-direction: column;
                }
                .image {
                    width: 80px;
                    height: 80px;
                    cursor: pointer;
                }
                .input-file {
                    display: none;
                }
            `}</style>
        </div>
    )
}

export default AddProductForm;