import Link from 'next/link';
import globalStyle from '../styles/globalStyle';
import Navbar from '../components/navbar'


const MainLayout = props => {
    return (

        <div className='container'>
                <Navbar />
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