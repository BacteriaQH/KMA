import CustomAxios from '~/config/RequestConfig';

import { useEffect, useState } from 'react';
import { Button, Col, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row, Table } from 'react-bootstrap';
import Loading from '../../../../components/Loading';
import Title from '../../../../components/Title';

function ManagementClass() {
    const [courses, setCourses] = useState('');
    const [classes, setClasses] = useState('');

    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(0);

    const [valueFetch, setValueFetch] = useState([]);
    const [dataPost, setDataPost] = useState({
        id: [],
        class: '',
    });

    const [check, setCheck] = useState(false);
    const [reloading, setReloading] = useState(0);
    const [formData, setFormData] = useState({
        course: '',
        class_number: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    useEffect(() => {
        setIsLoading(true);
        CustomAxios.post(`/api/query`, ['courses']).then((res) => {
            setCourses(res.data.courses);
        });
        setIsLoading(false);
    }, []);
    useEffect(() => {
        setIsLoading(true);

        CustomAxios.post(`/api/query`, ['classes']).then((res) => {
            setClasses(res.data.classes);
        });
        setIsLoading(false);
    }, [reloading]);
    useEffect(() => {
        setIsLoading(true);

        CustomAxios.get(`/api/students/no-class`).then((res) => {
            res.data.map((data) => {
                if (data.gender === true) {
                    data.gender = 'Nam';
                } else {
                    data.gender = 'Nữ';
                }
                return true;
            });
            setValueFetch(res.data);
        });
        setIsLoading(false);
    }, []);
    const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);

        CustomAxios.post(`/api/classes/add`, formData).then((res) => {
            if (res.data.code === 200) {
                setReloading(1);
                setSuccess(1);
                setMessage(res.data.message);
            } else {
                setSuccess(0);
                setMessage(res.data.message);
            }
        });
        setIsLoading(false);
    };

    return (
        <>
            <Title title="Quản lý lớp học" />
            <Row>
                {message ? <div className={success ? 'text-success' : 'text-danger'}>{message}</div> : <></>}
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
                <FormGroup as={Col}>
                    <FormLabel>Khoá</FormLabel>
                    <FormSelect name="course" onChange={handleChange}>
                        <option>Chọn khoá</option>
                        {courses ? courses.map((course) => <option key={course.id}>{course.code}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col} controlId="formStudentId">
                    <FormLabel>Số lượng lớp</FormLabel>
                    <FormControl
                        type="number"
                        placeholder="Nhập Số lượng lớp"
                        name="class_number"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup as={Col}>
                    <Button style={{ marginTop: '1.9rem' }} onClick={handleClick}>
                        Thêm lớp học
                    </Button>
                </FormGroup>
            </Row>
            <Row>
                <FormGroup as={Col} lg="3">
                    <FormLabel>Lớp</FormLabel>
                    <FormSelect
                        name="classes"
                        onChange={(e) => {
                            setCheck(!check);
                            setDataPost({
                                ...dataPost,
                                class: e.target.value,
                            });
                        }}
                    >
                        <option>Chọn lớp</option>
                        {classes ? classes.map((nClass) => <option key={nClass.id}>{nClass.name}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col}>
                    <Button
                        style={{ marginTop: '1.9rem' }}
                        onClick={() => {
                            const arr = dataPost.id.split('-');
                            arr.shift();
                            dataPost.id = arr;
                            const d = [];
                            const { id, ...other } = dataPost;
                            arr.map((value) => {
                                d.push({
                                    id: value,
                                    ...other,
                                });
                                return true;
                            });
                            CustomAxios.post(`/api/students/update-class`, d).then((res) => {
                                if (res.data.code === 200) {
                                    setSuccess(1);
                                    setMessage(res.data.message);
                                } else {
                                    setSuccess(0);
                                    setMessage(res.data.message);
                                }
                            });
                        }}
                    >
                        Thêm sinh viên vào lớp học
                    </Button>
                </FormGroup>
            </Row>
            <Table striped hover>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Họ và Tên</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {valueFetch ? (
                        valueFetch.map((value, index) => (
                            <tr key={index}>
                                <th scope="row">{value.id}</th>
                                <td>{value.name}</td>
                                <td>{value.gender}</td>
                                <td>
                                    <FormCheck
                                        type={'checkbox'}
                                        check={check.toString()}
                                        onChange={() => {
                                            setCheck(!check);
                                            setDataPost({
                                                ...dataPost,
                                                id: dataPost.id + '-' + value.id,
                                            });
                                        }}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default ManagementClass;
