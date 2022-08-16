import CustomAxios from '~/config/RequestConfig';
import { useEffect, useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import Loading from '~/components/Loading';
import Title from '~/components/Title';

function Authorization() {
    const [data, setData] = useState({
        email: '',
        password: '',
        role_symbol: 0,
    });
    const [roles, setRoles] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({
        err: false,
        mess: '',
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        setIsLoading(true);
        CustomAxios.get(`/api/roles/list`).then((res) => {
            setRoles(res.data);
            setIsLoading(false);
        });
    }, []);
    const handleSubmit = () => {
        CustomAxios.post(`/api/register`, data).then((res) => {
            setMessage({
                err: res.data.code === 200 ? false : true,
                mess: res.data.message,
            });
        });
    };
    return (
        <>
            <Title title={'Phân quyền hệ thống'} />
            <Row>
                <h5>Tạo mới user</h5>
                {isLoading ? (
                    <Row>
                        <Col></Col>
                        <Col>
                            <Loading />
                        </Col>{' '}
                        <Col></Col>
                    </Row>
                ) : (
                    <></>
                )}
                {message.mess ? (
                    <div className={message.err ? 'text-danger' : 'text-success'}>{message.mess}</div>
                ) : (
                    <></>
                )}
                <Row>
                    <FormGroup as={Col} size="lg" controlId="name">
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl autoFocus type="text" name="name" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup as={Col}>
                        <FormLabel>Quyền</FormLabel>
                        <FormSelect name="role_symbol" onChange={handleChange}>
                            <option>Chọn quyền</option>
                            {roles ? (
                                roles.map((role) => (
                                    <option value={role.role_symbol} key={role.id}>
                                        {role.role_name}
                                    </option>
                                ))
                            ) : (
                                <></>
                            )}
                        </FormSelect>
                    </FormGroup>
                </Row>
                <FormGroup as={Col} size="lg" controlId="email">
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl autoFocus type="email" name="email" onChange={handleChange} />
                </FormGroup>
                <FormGroup as={Col} size="lg" controlId="password">
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl type="password" name="password" onChange={handleChange} />
                </FormGroup>
            </Row>
            <Button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Thêm User
            </Button>
        </>
    );
}

export default Authorization;
