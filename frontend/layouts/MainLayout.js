import Link from 'next/link';
import globalStyle from '../styles/globalStyle';

const MainLayout = props => {
    return (
        <div className='container'>
            <div className='topbar'>
                <div className='logo-container'>
                    <Link href='/'>
                        <a className='link'>STOCK</a>
                    </Link>
                </div>
                <div className='menu-container'>
                    <div>
                        <Link href='/products'>
                            <a className='link'>Products</a>
                        </Link>
                    </div>
                    <div>
                        <Link href='/manage'>
                            <a className='link'>Manage</a>
                        </Link>
                    </div>
                    <div>
                        <Link href='/profile'>
                            <a className='link'>Profile</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='content'>
                {props.children}
            </div>
            <style jsx>{`
                .topbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 32px;
                    padding: 0 40px;
                    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
                }
                .menu-container {
                    display: flex;
                }
                .menu-container div {
                    margin-left: 20px;
                }
                .link {
                    text-decoration: none;
                    color: black;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
            <style jsx global>{globalStyle}</style>
        </div>
    )
}

export default MainLayout;