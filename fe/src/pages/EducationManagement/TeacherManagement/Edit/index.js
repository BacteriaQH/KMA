import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomAxios from '~/config/RequestConfig';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '~/components/Title';
import url from '~/config/ServerConfig';
import Loading from '~/components/Loading';

const EditTeacher = () => {
    const fileRef = useRef();
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const match = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: ' ',
        code: '  ',
        gender: '1',
        dob: '    ',
        department: '     ',
        phone: '      ',
        email: '       ',
    });
    const [message, setMessage] = useState('');
    const [department, setDepartment] = useState('');
    const handleChangeFile = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', e.target.files[0]);
        CustomAxios.post(`/api/upload`, data).then((res) => {
            setImage(res.data.filename);
            setFormData({
                ...formData,
                [e.target.name]: `${url.SERVER_URL}/${res.data.filename}`,
            });
        });
    };
    useEffect(() => {
        CustomAxios.post(`/api/query`, ['departments']).then((res) => {
            setDepartment(res.data.departments);
        });
    }, []);
    useEffect(() => {
        setIsLoading(true);
        CustomAxios.get(`/api/teachers/${match.id}`, {
            params: { id: match.id },
        }).then((res) => {
            if (res.data.code === 403) {
                alert('Bạn không có quyền truy cập');
                navigate('/home');
            } else if (res.status === 200) {
                setImage(res.data.image);
                const nameF = res.data.name.split(' ');
                const last = nameF.pop();
                let str = '';
                nameF.map((val) => {
                    str = str + ' ' + val;
                    return str;
                });
                const first = str.trim();
                res.data.gender.toString() === 'true' ? (res.data.gender = '1') : (res.data.gender = '0');
                const { name, createdAt, updatedAt, ...other } = res.data;
                setFormData({
                    ...other,
                    firstname: first,
                    lastname: last,
                });
                setIsLoading(false);
            }
        });
    }, [match.id, navigate]);
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    const handleClick = (e) => {
        e.preventDefault();
        CustomAxios.post(`/api/teachers/update/${match.id}`, formData).then((res) => {
            res.data.code === 200 ? navigate('/teachers/profile') : setMessage(res.data.message);
        });
    };
    return (
        <>
            <Title title={'Thêm giảng viên'} />
            {message ? <div className="text-danger">{message}</div> : <></>}
            {isLoading && (
                <Row>
                    <Col></Col>
                    <Col>
                        <Loading />
                    </Col>{' '}
                    <Col></Col>
                </Row>
            )}
            <Row className="mb-3">
                <Col>
                    <FormGroup as={Row} controlId="formFirstName">
                        <FormLabel>Họ đệm</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Nhập họ đệm"
                            name="firstname"
                            onChange={handleChange}
                            value={formData.firstname}
                        />
                    </FormGroup>
                    <FormGroup as={Row} controlId="formLastName">
                        <FormLabel>Tên</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Nhập tên"
                            name="lastname"
                            onChange={handleChange}
                            value={formData.lastname}
                        />
                    </FormGroup>
                </Col>
                <Col className="d-flex justify-content-center">
                    {image ? (
                        <>
                            <Image
                                src={`${url.SERVER_URL}/${image}`}
                                alt={image.filename}
                                width={'150px'}
                                height={'200px'}
                            />
                            <input type={'hidden'} value={`${image}`} name="image" />
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
                    <FormControl
                        type="text"
                        placeholder="Nhập mã giảng viên"
                        name="code"
                        onChange={handleChange}
                        value={formData.code}
                    />
                </FormGroup>
                <FormGroup as={Col} controlId="formGender">
                    <FormLabel>Giới tính</FormLabel>{' '}
                    <FormCheck
                        name="gender"
                        type={'radio'}
                        id={'male'}
                        label={'Nam'}
                        value={'1'}
                        checked={formData.gender === '1'}
                        onChange={handleChange}
                    />
                    <FormCheck
                        name="gender"
                        type={'radio'}
                        id={'female'}
                        label={'Nữ'}
                        value={'0'}
                        checked={formData.gender === '0'}
                        onChange={handleChange}
                    />
                </FormGroup>
            </Row>
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Khoa</FormLabel>
                    <FormSelect name="department" onChange={handleChange} value={formData.department}>
                        <option>Chọn khoa</option>
                        {department ? department.map((dep) => <option key={dep.id}>{dep.name}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col} controlId="formPhoneNumber">
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Nhập số điện thoại"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                    />
                </FormGroup>
            </Row>
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Ngày sinh</FormLabel>
                    <FormControl type="date" name="dob" onChange={handleChange} value={formData.dob} />
                </FormGroup>
                <FormGroup as={Col} controlId="formPhoneNumber">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="email"
                        placeholder="Nhập email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                    />
                </FormGroup>
            </Row>
            <Button className="btn btn-primary mt-3" onClick={handleClick}>
                Chỉnh Sửa Giảng viên
            </Button>
        </>
    );
};

export default EditTeacher;
