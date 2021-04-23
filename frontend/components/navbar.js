import Link from 'next/link'

const Navbar = () => (
    <div>
        <ul>
            <li> <Link href="/"><a> Home </a></Link> </li>
            <li><Link href="/register"><a> Register </a></Link>  </li>
            <li><Link href="/login"><a> Login </a></Link> </li>
            <li><Link href="/admin"><a> Admin </a></Link></li>
            <li><Link href="/logout"><a> Logout </a></Link></li>


        </ul>



        <style jsx>{`
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #333;
        }

        li {
            float: left;
            border-right:1px solid #bbb;
        }
        li:nth-last-child(2) {
            border-right: none;
        }
        li:last-child {
            margin-left: 1010px;
            border-right: none;
        }

        li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        li a:hover:not(.active) {
            background-color: #111;
        }

        .active {
            background-color: #4CAF50;
        }



            `}</style>


    </div>


)

export default Navbar