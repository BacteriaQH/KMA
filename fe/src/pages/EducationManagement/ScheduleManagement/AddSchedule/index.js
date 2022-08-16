import CustomAxios from '~/config/RequestConfig';
import { useEffect, useState } from 'react';
import { Button, Col, FormCheck, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import Loading from '../../../../components/Loading';
import Title from '../../../../components/Title';
function AddSchedule() {
    const [courses, setCourses] = useState('');
    const [department, setDepartment] = useState('');
    const [subjects, setSubjects] = useState('');
    const [semester, setSemester] = useState([]);
    const [message, setMessage] = useState({
        code: 0,
        message: '',
    });
    const [formData, setFormData] = useState({
        course: '   ',
        semester: 0,
        subject: [],
    });
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const arr = [];
    for (let i = 1; i < 10; i++) {
        arr.push(i);
    }
    useEffect(() => {
        setIsLoading(true);
        CustomAxios.post(`/api/query`, ['courses', 'departments']).then((res) => {
            setCourses(res.data.courses);
            setDepartment(res.data.departments);
            setIsLoading(false);
        });
    }, []);
    const handleChange = (e) => {
        setSemester(arr);
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    const handleChangeToFetch = (e) => {
        setIsLoading(true);
        CustomAxios.get(`/api/subjects/department`, {
            params: { department: e.target.value },
        }).then((res) => {
            setSubjects(res.data);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        setList(subjects);
    }, [list, subjects]);
    const handleClickAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map((li) => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };
    const handleClickSubject = (e) => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };
    useEffect(() => {
        const subs = isCheck;
        setFormData({
            ...formData,
            subject: subs,
        });
    }, [isCheck]);

    const handleClick = () => {
        setIsLoading(true);
        CustomAxios.post(`/api/semesters/add`, formData).then((res) => {
            setMessage({ code: res.data.code, message: res.data.message });
            setIsLoading(false);
        });
    };
    return (
        <>
            <Title title={'Thêm môn học vào khoá'} />
            {message.code !== 0 ? (
                message.code === 200 ? (
                    <div className="text-success">{message.message}</div>
                ) : (
                    <div className="text-danger">{message.message}</div>
                )
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
                    <FormSelect name="semester" onChange={handleChange}>
                        <option>Chọn kỳ</option>
                        {semester ? semester.map((data, index) => <option key={index}>{data}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
            </Row>
            <FormGroup as={Col}>
                <FormLabel>Khoa</FormLabel>
                <FormSelect name="semester" onChange={handleChangeToFetch}>
                    <option>Chọn khoa</option>
                    {department ? department.map((data, index) => <option key={index}>{data.name}</option>) : <></>}
                </FormSelect>
            </FormGroup>
            <Row className="m-3">
                {subjects ? (
                    <>
                        <FormCheck
                            type="checkbox"
                            name="selectAll"
                            label="Tất cả"
                            id="selectAll"
                            onChange={handleClickAll}
                            checked={isCheckAll}
                        />
                        {subjects.map((data, index) => (
                            <FormCheck
                                key={data.id}
                                type="checkbox"
                                name={data.name}
                                id={data.id}
                                label={data.name + ' ( ' + data.code + ' )'}
                                checked={isCheck.includes(data.id)}
                                onChange={handleClickSubject}
                            />
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </Row>
            <Button onClick={handleClick}>Thêm </Button>
        </>
    );
}

export default AddSchedule;
