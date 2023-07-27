import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleRegister = event => {
        event.preventDefault();
        setSuccess('');
        setError('');

        // collect data from form
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)

        // validation
        if (!/(?=.*[A-Z])/.test(password)) {
            alert('Should contain at least one upper case');
            return;
        }
        else if (!password.length > 6) {
            alert('Password should be at least seven characters');
            return;
        }

        // firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                form.reset();
                const user = result.user;
                console.log(user);
                setSuccess('Register Successfully');

                // update username function call
                updateUserData(user, name);

                // email verification
                // verifyEmail(user);
                sendEmailVerification(user)
                    .then(() => {
                        alert('Please verify your email')
                    })

            })
            .catch(error => {
                // console.log(error.message);
                setError(error.message);
            })

        // verify email
        // const verifyEmail = user => {
        //     sendEmailVerification(user)
        //         .then(result => {
        //             console.log(result);
        //             alert('Please verify your email');
        //         })
        // }

        // update username function
        const updateUserData = (user, name) => {
            updateProfile(user, {
                displayName: name
            })
                .then(() => { })
                .catch((error) => {
                    setError(error.message)
                })
        }

    }

    return (
        <div className='bg-success-subtle p-4'>
            <h2 className='text-center mb-4 text-success'>Please Register</h2>
            <div className='w-50 mx-auto'>
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter your name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                        <p className='text-success'>{success}</p>
                        <p className='text-danger'>{error}</p>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <p className='mt-3'>Already have an account? Please <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;