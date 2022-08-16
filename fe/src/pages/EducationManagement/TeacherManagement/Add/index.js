import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomAxios from '~/config/RequestConfig';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Title from '~/components/Title';
import url from '~/config/ServerConfig';
function AddTeacher() {
    const fileRef = useRef();
    const navigate = useNavigate();
    const [image, setImage] = useState('');

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        code: '',
        gender: '',
        dob: '',
        department: '',
        phone: '',
        email: '',
    });
    const [message, setMessage] = useState('');
    const handleChangeFile = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', e.target.files[0]);
        CustomAxios.post(`/api/upload`, data).then((res) => {
            setImage(res.data);
            setFormData({
                ...formData,
                [e.target.name]: `${url.SERVER_URL}${res.data.filename}`,
            });
        });
    };
    const [department, setDepartment] = useState('');
    useEffect(() => {
        CustomAxios.post(`/api/query`, ['departments']).then((res) => {
            setDepartment(res.data.departments);
        });
    }, []);
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    const handleClick = (e) => {
        e.preventDefault();
        CustomAxios.post(`/api/teachers/add`, formData).then((res) => {
            res.data.code === 200 ? navigate('/teachers/profile/list') : setMessage(res.data.message);
        });
    };
    return (
        <>
            <Title title={'Thêm giảng viên'} />
            {message ? <div className="text-danger">{message}</div> : <></>}
            <Row className="mb-3">
                <Col>
                    <FormGroup as={Row} controlId="formFirstName">
                        <FormLabel>Họ đệm</FormLabel>
                        <FormControl type="text" placeholder="Nhập họ đệm" name="firstname" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup as={Row} controlId="formLastName">
                        <FormLabel>Tên</FormLabel>
                        <FormControl type="text" placeholder="Nhập tên" name="lastname" onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col className="d-flex justify-content-center">
                    {image ? (
                        <>
                            <Image
                                src={`${url.SERVER_URL}/${image.filename}`}
                                alt={image.filename}
                                width={'150px'}
                                height={'200px'}
                            />
                            <input type={'hidden'} value={`${url.SERVER_URL}/${image.filename}`} name="image" />
                        </>
                    ) : (
                        <FormGroup className="d-flex justify-content-center">
                            <FontAwesomeIcon
                                icon={faPlus}
                                onClick={() => fileRef.current.click()}
                                className="fa-5x border border-primary p-4"
                                color="#009cff "
                            />
                            <FormControl
                                type="file"
                                ref={fileRef}
                                accept="image/*"
                                className="d-none"
                                onChange={handleChangeFile}
                                name="image"
                            />
                        </FormGroup>
                    )}
                </Col>
            </Row>
            <Row className="mb-3">
                <FormGroup as={Col} controlId="formStudentId">
                    <FormLabel>Mã giảng viên</FormLabel>
                    <FormControl type="text" placeholder="Nhập mã giảng viên" name="code" onChange={handleChange} />
                </FormGroup>
                <FormGroup as={Col} controlId="formGender">
                    <FormLabel>Giới tính</FormLabel>{' '}
                    <FormCheck
                        name="gender"
                        type={'radio'}
                        id={'male'}
                        label={'Nam'}
                        defaultChecked
                        value={1}
                        onChange={handleChange}
                    />
                    <FormCheck
                        name="gender"
                        type={'radio'}
                        id={'female'}
                        label={'Nữ'}
                        value={0}
                        onChange={handleChange}
                    />
                </FormGroup>
            </Row>
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Khoa</FormLabel>
                    <FormSelect name="department" onChange={handleChange}>
                        <option>Chọn khoa</option>
                        {department ? department.map((dep) => <option key={dep.id}>{dep.name}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col} controlId="formPhoneNumber">
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl type="text" placeholder="Nhập số điện thoại" name="phone" onChange={handleChange} />
                </FormGroup>
            </Row>
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Ngày sinh</FormLabel>
                    <FormControl type="date" name="dob" onChange={handleChange} />
                </FormGroup>
                <FormGroup as={Col} controlId="formPhoneNumber">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Nhập email" name="email" onChange={handleChange} />
                </FormGroup>
            </Row>
            <Button className="btn btn-primary mt-3" onClick={handleClick}>
                Thêm Giảng viên
            </Button>
        </>
    );
}

export default AddTeacher;
