import { Outlet } from 'react-router-dom';
import Header from '../common/header/Header';

const Main = () => {
    return (
        <div className='container'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;