import CustomAxios from '~/config/RequestConfig';
import { useEffect, useState } from 'react';

const { Form, Row, FormGroup, Col, FormLabel, FormSelect } = require('react-bootstrap');

const Search = ({ showStudentSelect = false, showSubjectSelect = false }) => {
    // showStudentSelect = true;
    // showSubjectSelect = true;
    const [departments, setDepartments] = useState('');
    const [classes, setClasses] = useState('');
    const [courses, setCourses] = useState('');
    const [classSelect, setClassSelect] = useState('');
    const [student, setStudent] = useState('');
    useEffect(() => {
        CustomAxios.post(`/api/query`, ['departments', 'classes', 'courses']).then((res) => {
            setDepartments(res.data.departments);
            setClasses(res.data.classes);
            setCourses(res.data.courses);
        });
    }, []);
    const handleChangeClass = (e) => {
        setClassSelect(e.target.value);
    };
    useEffect(() => {
        CustomAxios.get(`/api/students/by-class`, {
            params: { classes: classSelect },
        }).then((res) => {
            setStudent(res.data);
        });
    }, [classSelect]);
    return (
        <>
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Khoa</FormLabel>
                    <FormSelect>
                        <option>Chọn khoa</option>
                        {departments ? departments.map((dep) => <option key={dep.id}>{dep.name}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
                <FormGroup as={Col}>
                    <FormLabel>Khoá</FormLabel>
                    <FormSelect>
                        <option>Chọn khoá</option>
                        {courses ? courses.map((course) => <option key={course.id}>{course.code}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
            </Row>
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Lớp</FormLabel>
                    <FormSelect onChange={handleChangeClass}>
                        <option>Chọn lớp</option>
                        {classes ? classes.map((c) => <option key={c.id}>{c.name}</option>) : <></>}
                    </FormSelect>
                </FormGroup>
                {showStudentSelect && (
                    <>
                        <FormGroup as={Col}>
                            <FormLabel>Học viên</FormLabel>
                            <FormSelect>
                                <option>Chọn học viên</option>
                                {student ? (
                                    student.map((std) => (
                                        <option key={std.id} value={std.id}>
                                            {std.name}
                                        </option>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </FormSelect>
                        </FormGroup>
                    </>
                )}
                {showSubjectSelect && (
                    <Row>
                        <FormGroup as={Col} controlId="formSubject">
                            <FormLabel>Loại học phần</FormLabel>{' '}
                            <Form.Check
                                name="subject"
                                type={'radio'}
                                id={'all'}
                                label={'Tất cả'}
                                defaultChecked={true}
                                value={1}
                            />
                            <Form.Check name="subject" type={'radio'} id={'2nd'} label={'Nhóm ngành 2'} value={0} />
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Học phần</FormLabel>
                            <FormSelect>
                                <option>Toàn bộ</option>
                                <option value="1">Ngân hàng 1</option>
                                <option value="2">Ngân hàng 2</option>
                                <option value="3">Ngân hàng 3</option>
                            </FormSelect>
                        </FormGroup>
                    </Row>
                )}
            </Row>
        </>
    );
};

export default Search;
