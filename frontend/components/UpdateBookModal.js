import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Button from './Button';

const UpdateProductModal = props => {
    const { data } = props;

    const [book, setBook] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState(data.name)
    const [author, setAuthor] = useState(data.author)
    const [page, setPage] = useState(data.page)
    const [stock, setStock] = useState(data.stock)
    const [image, setImage] = useState(data.imageUrl)

    const handleChangeImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImageUrl(e.target.result)
        }

        if (file)
            reader.readAsDataURL(file);
    }

    useEffect(() => {
        console.log(props.data);
        if (data.name !== name)
            setName(data.name);
        if (data.author !== author)
            setAuthor(data.author);
        if (data.page !== page)
            setPage(data.page);
        if (data.quantity !== stock)
            setStock(data.stock);
        if (data.image !== image)
            setImage(data.image);

    }, [props])

    return (
        <Modal
            title='Update Product'
            visible={props.visible}
            onOk={() => { }}
            onCancel={props.onCancel}
        >
            <label className='form-control'>
                <p>Name</p>
                <input type='text' placeholder='Product name' value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label className='form-control'>
                <p>Author</p>
                <textarea value={author} placeholder='Product description' onChange={e => setAuthor(e.target.value)} />
            </label>
            <label className='form-control'>
                <p>Page</p>
                <input type='text' value={page} onChange={e => setPage(e.target.value)} />
            </label>
            <label className='form-control'>
                <p>Stock</p>
                <input type='text' value={stock} onChange={e => setStock(e.target.value)} />
            </label>
            <label className='form-control'>
                <img className='image' src={image} />
                <input className='input-file' type='file' onChange={handleChangeImage} />
            </label>
            <style jsx>{`
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
        </Modal>
    )
}

export default UpdateProductModal;