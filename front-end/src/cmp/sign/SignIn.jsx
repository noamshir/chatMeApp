import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

import Error from './Error';
import { login, signup } from '../../store/user.action';
import Loader from '../Loader';

export default function SignIn({ isLogin }) {
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, 'Invalid username.')
            .max(12, 'Invalid username.')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Invalid password')
            .max(12, 'Invalid password')
            .required('Required'),
    });
    const RegisterSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, 'Invalid username.')
            .max(12, 'Invalid username.')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Invalid password')
            .max(12, 'Invalid password')
            .required('Required'),
        phone: Yup.string()
            .min(10, 'Invalid Phone')
            .max(12, 'Invalid Phone')
            .required('Required'),
    });
    const ValidationSchema = isLogin ? LoginSchema : RegisterSchema
    const Login = () => {
        return (<>
            <h1 className="sign-title">Sign in to chatMe</h1>
            <ChatBubbleOutlinedIcon className="chat-icon" />
        </>)
    }
    const Register = () => {
        return (<>
            <h1 className="sign-title">Create Account</h1>
            <PersonAddAlt1OutlinedIcon className="chat-icon" />
        </>)
    }
    let initialValues = {
        username: '',
        password: '',
        phone: ''
    }
    let btnText = 'Login'
    if (!isLogin) btnText = 'Register'

    const handleSubmit = async (values) => {
        setLoading(true)
        if (isLogin) {
            const user = { username: values.username, password: values.password }
            const ans = await dispatch(login(user));
            if (!ans) {
                setError("Invalid username or password");
                setLoading(false);
            }
        }
        else {
            const ans = dispatch(signup(values));
            if (!ans) {
                setError("Invalid username or password");
                setLoading(false);
            }
        }
    }
    return (
        <section className="login flex column">
            {isLogin ? <Login /> : <Register />}
            <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="login-form flex column">
                    <div className="input-item flex column">
                        <ErrorMessage component={Error} name="username" />
                        <div className="input-field flex">
                            <PersonOutlineSharpIcon className="icon" />
                            <Field name="username" placeholder="Enter username" onInput={() => setError('')} />
                        </div>
                    </div>
                    <div className="input-item flex column">
                        <ErrorMessage component={Error} name="password" />
                        <div className="input-field flex">
                            <LockOutlinedIcon className="icon" />
                            <Field name="password" type="password" placeholder="Enter password" onInput={() => setError('')} />
                        </div>
                    </div >
                    {isLogin !== true &&
                        <div className="input-item flex column">
                            <ErrorMessage component={Error} name="phone" />
                            <div className="input-field flex">
                                <LocalPhoneOutlinedIcon className="icon" />
                                <Field name="phone" type="tel" placeholder="Enter phone number" onInput={() => setError('')} />
                            </div>
                        </div >
                    }
                    <button className="sign-submit" type="submit">{btnText}</button>
                </Form>
            </Formik >
            {(loading && !error) && <Loader />}
            {(!loading && error) && <Error>{error}</Error>}
        </section >
    )
}
