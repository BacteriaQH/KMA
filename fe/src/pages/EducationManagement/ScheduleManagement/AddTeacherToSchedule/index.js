import CustomAxios from '~/config/RequestConfig';
import { useEffect, useState } from 'react';
import { Button, Col, FormGroup, FormLabel, FormSelect, Row, Table } from 'react-bootstrap';
import Loading from '../../../../components/Loading';
import Title from '../../../../components/Title';
import axios from 'axios';
const AddTeacherToSchedule = () => {
    const [courses, setCourses] = useState('');
    const [semesters, setSemesters] = useState('');
    const [subjectsDetail, setSubjectsDetail] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState('');
    const [classrooms, setClassrooms] = useState('');
    const [idArray, setIdArray] = useState([]);
    const [dataSend, setDataSend] = useState({
        course: '',
        semester: '',
        subject: '',
    });
    const [dataPost, setDataPost] = useState([]);
    const [message, setMessage] = useState({
        err: false,
        mess: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        CustomAxios.post(`/api/query`, ['courses']).then((res) => {
            setCourses(res.data.courses);
        });
        CustomAxios.get(`/api/teachers/list`).then((res) => {
            setTeachers(res.data);
            setIsLoading(false);
        });
    }, []);
    const handleChange = (e) => {
        setIsLoading(true);
        setDataSend({
            ...dataSend,
            course: e.target.value,
        });
        CustomAxios.get(`/api/semesters/list-by-course`, {
            params: { course_id: e.target.value },
        }).then((res) => {
            setSemesters(res.data);
            setIsLoading(false);
        });
    };
    const handleShowData = (e) => {
        semesters.map((sem) => {
            if (sem.name === e.target.value) {
                let s = sem.subject_id.split(',');
                setDataSend({
                    ...dataSend,
                    semester: sem.id,
                });
                setSubjects(s);
            }
            return 1;
        });
    };
    useEffect(() => {
        setIsLoading(true);
        axios.all(subjects.map((sub) => CustomAxios.get(`/api/subjects/id`, { params: { id: sub } }))).then((res) => {
            let rSub = [];
            res.map((r) => {
                rSub.push(r.data);
                return 1;
            });
            setSubjectsDetail(rSub);
            setIsLoading(false);
        });
    }, [subjects]);
    const handleSelectSubject = (e) => {
        setDataSend({
            ...dataSend,
            subject: e.target.value,
        });
    };
    const handleFetchData = () => {
        setIsLoading(true);
        CustomAxios.post(`/api/classrooms/find`, dataSend).then((res) => {
            setClassrooms(res.data);
            const arr = [];
            const idArr = [];
            res.data.map((r) => {
                arr.push({ id: r.id });
                idArr.push(r.id);
                return 0;
            });
            setDataPost(arr);
            setIdArray(idArr);
            setIsLoading(false);
        });
    };
    const handleSelectTeacher = (e, id) => {
        for (let i in dataPost) {
            if (dataPost[i].id === id) {
                setDataPost([
                    ...dataPost,
                    {
                        ...dataPost[i],
                        id: id,
                        teacher_id: e.target.value,
                    },
                ]);
            }
        }
    };
    const handleAddTeacher = () => {
        setIsLoading(true);
        const data = [];
        idArray.map((id) => {
            let lastElement = dataPost.findLast((item) => item.id === id);
            data.push(lastElement);
            return 0;
        });
        CustomAxios.post(`/api/classrooms/add-teacher-id`, data).then((res) => {
            setMessage({
                err: res.data.code === 200 ? false : true,
                mess: res.data.message,
            });
            setIsLoading(false);
        });
    };
    return (
        <>
            <Title title={'Thêm giảng viên vào Thời khoá biểu'} />
            {message.mess ? <div className={message.err ? 'text-danger' : 'text-success'}>{message.mess}</div> : <></>}
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
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Khoá</FormLabel>
                    <FormSelect name="course" onChange={handleChange}>
                        <option>Chọn khoá</option>
                        {courses ? courses.map((course, index) => <option key={index}>{course.code}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col}>
                    <FormLabel>Kỳ</FormLabel>
                    <FormSelect name="semester" onChange={handleShowData}>
                        <option>Chọn kỳ</option>
                        {semesters ? semesters.map((data, index) => <option key={index}>{data.name}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col}>
                    <FormLabel>Môn</FormLabel>
                    <FormSelect name="subject" onChange={handleSelectSubject}>
                        <option>Chọn môn</option>
                        {subjectsDetail ? (
                            subjectsDetail.map((data, index) => (
                                <option key={index} value={data.id}>{`${data.name} (${data.code})`}</option>
                            ))
                        ) : (
                            <></>
                        )}
                    </FormSelect>
                </FormGroup>
            </Row>
            <Button className="btn btn-primary mt-3 mb-3" onClick={handleFetchData}>
                Tra cứu
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã lớp</th>
                        <th>Tên lớp</th>
                        <th>Giảng viên</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {classrooms ? (
                        classrooms.map((clr, index) => (
                            <tr key={clr.id}>
                                <td>{++index}</td>
                                <td>{clr.code}</td>
                                <td>{clr.name}</td>
                                <td>
                                    <FormGroup>
                                        <FormSelect
                                            value={clr.teacher_id}
                                            onChange={(e) => handleSelectTeacher(e, clr.id)}
                                        >
                                            <option>Chọn giảng viên</option>
                                            {teachers ? (
                                                teachers.map((teacher) => (
                                                    <option key={teacher.id} value={teacher.id}>
                                                        {`${teacher.name} (${teacher.code})`}
                                                    </option>
                                                ))
                                            ) : (
                                                <></>
                                            )}
                                        </FormSelect>
                                    </FormGroup>
                                </td>
                                {/* <td>
                                    <Button className="btn btn-primary" onClick={}>Thêm GV</Button>
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </Table>
            <Button className="btn btn-primary mt-3" onClick={handleAddTeacher}>
                Thêm giảng viên vào lớp học
            </Button>
        </>
    );
};

export default AddTeacherToSchedule;
