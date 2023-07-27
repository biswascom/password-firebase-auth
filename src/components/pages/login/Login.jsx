import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const auth = getAuth(app);

const Login = () => {
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        setSuccess('');
        setError('');

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user);
                setSuccess('Login Successfully');
                form.reset();
            })
            .catch(error => {
                setError(error);
            })
    }
    const handleSignout = () => {
        signOut(auth)
            .then(() => { })
            .catch((error) => {
                setError(error.message)
            })
    }
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address to reset password');
            return
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check yoor email')
            })
            .catch(error => {
                setError(error.message)
            })
    }
    return (
        <div className='bg-success-subtle p-4'>
            <h2 className='text-center mb-4 text-success'>Please Login</h2>
            <div className='d-flex justify-content-center gap-4'>
                <p>{user?.email}</p>
                <p>{user?.displayName}</p>
            </div>
            <div className='w-50 mx-auto'>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                        <p className='text-success'>{success}</p>
                        <p className='text-danger'>{error}</p>
                    </Form.Group>
                    {
                        user ? <Button onClick={handleSignout} variant="primary">Logout</Button> :
                            <div className='d-flex justify-content-start gap-4'>
                                <Button variant="primary" type="submit">Login</Button>
                                <Button onClick={handleResetPassword} variant="primary">Reset Password</Button>
                            </div>

                    }
                </Form>
                <p className='mt-3'>Do not have an account? Please <Link to="/register">Register</Link></p>
            </div>

        </div>
    );
};

export default Login;