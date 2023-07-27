import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='mb-4 bg-dark-subtle p-3 d-flex justify-content-center gap-4'>
            <Link className='text-decoration-none text-black fw-bold fs-4' to="/">Home</Link>
            <Link className='text-decoration-none text-black fw-bold fs-4' to="/login">Login</Link>
            <Link className='text-decoration-none text-black fw-bold fs-4' to="/register">Register</Link>
        </div>
    );
};

export default Header;