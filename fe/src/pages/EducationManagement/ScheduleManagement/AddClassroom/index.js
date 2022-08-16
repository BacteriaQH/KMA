import CustomAxios from '~/config/RequestConfig';
import { useEffect, useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../../../../components/Loading';
import Title from '../../../../components/Title';
function AddClassroom() {
    const [courses, setCourses] = useState('');
    const [semesters, setSemesters] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [subjectsDetail, setSubjectsDetail] = useState([]);
    const [countClassroom, setCountClassroom] = useState(0);
    const [dataSend, setDataSend] = useState({
        course: '',
        semester: '',
        subject: '',
        number: 0,
    });
    const [message, setMessage] = useState({
        err: false,
        mess: '',
    });
    const [fetchCount, setFetchCount] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        CustomAxios.post(`/api/query`, ['courses']).then((res) => {
            setCourses(res.data.courses);
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
        setFetchCount(true);
    };
    useEffect(() => {
        setIsLoading(true);
        if (dataSend.subject && dataSend.semester && dataSend.course) {
            CustomAxios.post(`/api/classrooms/count`, dataSend).then((res) => {
                setCountClassroom(res.data.number);
                setIsLoading(false);
            });
        }
    }, [fetchCount, dataSend]);
    const handleInputNumber = (e) => {
        setDataSend({
            ...dataSend,
            number: e.target.value,
        });
    };
    const handleClickSubmit = () => {
        CustomAxios.post(`/api/classrooms/add`, dataSend).then((res) => {
            setMessage({ err: res.data.code === 200 ? false : true, mess: res.data.message });
        });
    };
    return (
        <>
            <Title title={'Thêm lớp tín chỉ'} />
            <Row>
                {message.mess ? (
                    <div className={message.err ? 'text-danger' : 'text-success'}>{message.mess}</div>
                ) : (
                    <></>
                )}
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
                        {courses ? courses.map((course, index) => <option key={index}>{course.code}</option>) : <></>}
                    </FormSelect>
                </FormGroup>

                <FormGroup as={Col}>
                    <FormLabel>Kỳ</FormLabel>
                    <FormSelect name="semester" onChange={(e) => handleShowData(e)}>
                        <option>Chọn kỳ</option>
                        {semesters ? (
                            semesters.map((data, index) => (
                                <option value={data.name} key={index}>{`Kỳ ${data.name}`}</option>
                            ))
                        ) : (
                            <></>
                        )}
                    </FormSelect>
                </FormGroup>
            </Row>
            <Row>
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
                {
                    <FormGroup as={Col}>
                        <FormLabel>Số lượng lớp tín chỉ đã có của môn</FormLabel>
                        <FormControl value={countClassroom} disabled />
                    </FormGroup>
                }
                <FormGroup as={Col}>
                    <FormLabel>Số lượng thêm mới</FormLabel>
                    <FormControl type="number" onChange={handleInputNumber} />
                </FormGroup>
            </Row>
            <Button className="btn btn-primary mt-3" onClick={handleClickSubmit}>
                Thêm lớp tín chỉ
            </Button>
        </>
    );
}

export default AddClassroom;
