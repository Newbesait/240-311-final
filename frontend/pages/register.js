import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/register.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [admin, setAdmin] = useState(0)

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password,admin })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div className={styles.gridContainer}>
            <div>
                Username:
            </div>
            <div>
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Email:
            </div>
            <div>
                <input type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                Password:
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            {/* <div>
                Adim?
                </div>
            <div>
                <input type="checkbox" id="adright1" name="adright1" value={1} 
                    onChange={(e) => setAdmin(e.target.value)}
                />
                <label for="adright1"> </label>
            </div> */}


        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <Navbar />
            <div className={styles.container}>
               
                <h1>Register</h1>
                
                <div className={styles.content}>
                    {registerForm()}
                </div>

                <div>
                    <button onClick={register}>Register</button>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
