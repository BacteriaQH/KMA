import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Image from '~/components/Image';
import Loading from '~/components/Loading';
import { loginUser } from '~/redux/api';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    function validateForm() {
        return password.length > 4;
    }

    let loginState = useSelector((state) => state.auth.login);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            email: email,
            password: password,
        };

        setIsLoading(loginState.isFetching);
        loginUser(newUser, dispatch, navigate);
        if (loginState.error) {
            setCode(loginState.code);
            setMessage(loginState.message);
        }
        setIsLoading(loginState.isFetching);
    };

    return (
        <Container className="Login">
            <Row>
                <Col lg={3}>
                    <Row>
                        <Col lg={3}>
                            <Link to={'/'}>
                                <Image isLogo alt={'logo'} />
                            </Link>
                        </Col>
                        <Col lg={9} className="d-flex justify-content-center align-items-center">
                            <Link to={'/'}>
                                <h5 className="text-primary navbar-brand-name fw-bold">Quản Lý Sinh Viên</h5>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col lg={5}></Col>
                <Col lg={4}></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {code !== 200 && <div className="text-danger">{message}</div>}
                        <Row>
                            <Col>
                                <Button
                                    block="true"
                                    size="lg"
                                    type="submit"
                                    disabled={!validateForm()}
                                    className="mt-3"
                                >
                                    Login
                                </Button>
                            </Col>
                            <Col className="mt-3">{isLoading && <Loading />}</Col>
                        </Row>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}
