import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/bookshelf"><a> Shelf </a></Link> |
        <Link href="/user"><a> User </a></Link> |
        <Link href="/admin"><a> Admin </a></Link> |
        <Link href="/logout"><a> Logout </a></Link>

    </div>
)

export default Navbar