import CustomAxios from '~/config/RequestConfig';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
    Col,
    FormGroup,
    FormLabel,
    Tab,
    Tabs,
    Button as ButtonBootstrap,
    Table,
    FormControl,
    Row,
    FormSelect,
} from 'react-bootstrap';
import * as xlsx from 'xlsx';
import Search from '~/components/Search';
import Title from '~/components/Title';
import Loading from '~/components/Loading';

function FindGrade() {
    const [showExcel, setShowExcel] = useState('');
    const [excelHeaderValue, setExcelHeaderValue] = useState([]);
    const [excelBodyValue, setExcelBodyValue] = useState([]);

    const [classes, setClasses] = useState('');
    const [departments, setDepartments] = useState('');

    //data from sv
    const [subjects, setSubjects] = useState('');

    const [student, setStudent] = useState('');
    const [studentSelect, setStudentSelect] = useState('');

    const [classSelect, setClassSelect] = useState('');

    const [subjectSelect, setSubjectSelect] = useState('');

    const [resultStudentID, setResultStudentID] = useState('');
    const [resultClass, setResultClass] = useState('');
    const [resultSubject, setResultSubject] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const valueFetch = false;

    const fileRef = useRef();
    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = xlsx.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

            data.splice(0, 1);
            const header = data.splice(0, 2);
            setShowExcel(true);
            setExcelHeaderValue(header);
            setExcelBodyValue(data);
        };
        reader.readAsBinaryString(file);
    };

    useEffect(() => {
        setIsLoading(true);
        CustomAxios.post(`/api/query`, ['classes', 'departments']).then((res) => {
            setClasses(res.data.classes);
            setDepartments(res.data.departments);
            setIsLoading(false);
        });
    }, []);

    /*    get data for find grade by student*/
    const handleChangeClassToGetStudent = (e) => {
        setIsLoading(true);
        CustomAxios.get(`/api/students/by-class`, {
            params: { classes: e.target.value },
        })
            .then((res) => {
                setStudent(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChangeStudent = (e) => {
        setStudentSelect(e.target.value);
    };
    const handleClickToFindGradeByStudentId = () => {
        setIsLoading(true);
        CustomAxios.get(`/api/grades/find-grade/student/${studentSelect}`, {
            params: { id: studentSelect },
        }).then((res) => {
            setResultStudentID(res.data);
            setIsLoading(false);
        });
    };

    /*get data for find grade by class*/
    const handleChangeClass = (e) => {
        setClassSelect(e.target.value);
    };
    const handleClickToFindGradeByClass = () => {
        setIsLoading(true);
        CustomAxios.get(`/api/grades/find-grade-by-class`, { params: { classes: classSelect } })
            .then((res) => {
                setResultClass(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleChangeDepartment = (e) => {
        setIsLoading(true);
        CustomAxios.get(`/api/subjects/department`, {
            params: {
                department: e.target.value,
            },
        }).then((res) => {
            setSubjects(res.data);
            setIsLoading(false);
        });
    };

    const handleChangeSubject = (e) => {
        setSubjectSelect(e.target.value);
    };

    const handleClickToFindGradeBySubject = (e) => {
        CustomAxios.get(`/api/grades/find-grade-by-subject`, { params: { subject: subjectSelect } })
            .then((res) => {
                setResultSubject(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Title title={'Tra cứu điểm'} />
            <Tabs defaultActiveKey={'find'} transition className="m-3">
                <Tab eventKey={'find'} title="Tra cứu điểm">
                    <Tabs defaultActiveKey={'student'} transition className="mb-3">
                        <Tab eventKey={'student'} title="Theo từng học sinh">
                            {isLoading && (
                                <Row>
                                    <Col></Col>
                                    <Col>
                                        <Loading />
                                    </Col>{' '}
                                    <Col></Col>
                                </Row>
                            )}
                            <Row>
                                <FormGroup as={Col}>
                                    <FormLabel>Lớp</FormLabel>
                                    <FormSelect onChange={handleChangeClassToGetStudent}>
                                        <option>Chọn lớp</option>
                                        {classes && classes.map((c) => <option key={c.id}>{c.name}</option>)}
                                    </FormSelect>
                                </FormGroup>
                                <FormGroup as={Col}>
                                    <FormLabel>Học viên</FormLabel>
                                    <FormSelect onChange={handleChangeStudent}>
                                        <option>Chọn học viên</option>
                                        {student &&
                                            student.map((std) => (
                                                <option key={std.id} value={std.id}>
                                                    {std.name}
                                                </option>
                                            ))}
                                    </FormSelect>
                                </FormGroup>
                            </Row>
                            <FormGroup as={Col}>
                                <FormLabel>Tra cứu</FormLabel>
                                <br />
                                <ButtonBootstrap
                                    variant="primary"
                                    className="btn btn-primary mb-3"
                                    onClick={handleClickToFindGradeByStudentId}
                                >
                                    Tra cứu
                                </ButtonBootstrap>
                                <ButtonBootstrap
                                    variant="primary"
                                    className="btn btn-primary mb-3 ms-1"
                                    type="submit"
                                    disabled={!valueFetch}
                                >
                                    Xuất excel
                                </ButtonBootstrap>
                            </FormGroup>
                            {resultStudentID && (
                                <>
                                    <Title
                                        title={
                                            <>
                                                Điểm thi của sinh viên: <strong>{resultStudentID.name}</strong> Lớp:{' '}
                                                <strong>{resultStudentID.class}</strong> Mã sinh viên:{' '}
                                                <strong>{resultStudentID.code}</strong>
                                            </>
                                        }
                                    />
                                    <div className="scroll">
                                        <Table striped hover bordered className="text-center table-responsive">
                                            <thead>
                                                <tr>
                                                    <th colSpan="4" scope="colgroup">
                                                        Học viên
                                                    </th>
                                                    {resultStudentID.subject &&
                                                        resultStudentID.subject.map((sbj, index) => (
                                                            <th colSpan="5" scope="colgroup" key={sbj.id}>
                                                                {sbj.name}
                                                            </th>
                                                        ))}
                                                </tr>
                                                <tr>
                                                    <td>STT</td>
                                                    <td>MSV</td>
                                                    <td style={{ width: '100px' }}>Họ Tên</td>
                                                    <td>Lớp</td>
                                                    {resultStudentID.subject &&
                                                        resultStudentID.subject.map((sbj) => {
                                                            return (
                                                                <React.Fragment key={sbj.id}>
                                                                    <td>TP1</td>
                                                                    <td>TP2</td>
                                                                    <td>THI</td>
                                                                    <td>TKHP</td>
                                                                    <td>Chữ</td>
                                                                </React.Fragment>
                                                            );
                                                        })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <th>{resultStudentID.code}</th>
                                                    <th>{resultStudentID.name}</th>
                                                    <th>{resultStudentID.class}</th>
                                                    {resultStudentID.subject &&
                                                        resultStudentID.subject.map((sub, index) => (
                                                            <React.Fragment key={sub.id}>
                                                                <th>{sub.grade.grade1}</th>
                                                                <th>{sub.grade.grade2}</th>
                                                                <th>
                                                                    {sub.grade.exam2
                                                                        ? `${sub.grade.exam1}|${sub.grade.exam2}`
                                                                        : sub.grade.exam1}
                                                                </th>
                                                                <th>
                                                                    {sub.grade.average2
                                                                        ? `${sub.grade.average1}|${sub.grade.average2}`
                                                                        : sub.grade.average1}
                                                                </th>
                                                                <th>
                                                                    {sub.grade.letter2
                                                                        ? `${sub.grade.letter1}|${sub.grade.letter2}`
                                                                        : sub.grade.letter1}
                                                                </th>
                                                            </React.Fragment>
                                                        ))}
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </>
                            )}
                        </Tab>
                        <Tab eventKey={'class'} title="Theo từng lớp">
                            {isLoading && (
                                <Row>
                                    <Col></Col>
                                    <Col>
                                        <Loading />
                                    </Col>{' '}
                                    <Col></Col>
                                </Row>
                            )}
                            <Row>
                                <FormGroup as={Col} lg={4}>
                                    <FormLabel>Lớp</FormLabel>
                                    <FormSelect onChange={handleChangeClass}>
                                        <option>Chọn lớp</option>
                                        {classes && classes.map((c) => <option key={c.id}>{c.name}</option>)}
                                    </FormSelect>
                                </FormGroup>
                                <FormGroup as={Col}>
                                    <FormLabel>Tra cứu</FormLabel>
                                    <br />
                                    <ButtonBootstrap
                                        variant="primary"
                                        className="btn btn-primary mb-3"
                                        onClick={handleClickToFindGradeByClass}
                                    >
                                        Tra cứu
                                    </ButtonBootstrap>
                                    <ButtonBootstrap
                                        variant="primary"
                                        className="btn btn-primary mb-3 ms-1"
                                        type="submit"
                                        disabled={!valueFetch}
                                    >
                                        Xuất excel
                                    </ButtonBootstrap>
                                </FormGroup>
                                {resultClass && (
                                    <>
                                        <Title title={<>Điểm thi lớp: {resultClass[0].class}</>} />
                                        <div className="scroll">
                                            <Table bordered className="text-center table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="4" width={'800px'}>
                                                            Học viên
                                                        </th>
                                                        {resultClass[0].subject.map((sbj, index) => (
                                                            <th colSpan="5" key={sbj.id}>
                                                                {sbj.name}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                    <tr>
                                                        <td>STT</td>
                                                        <td>MSV</td>
                                                        <td width={'80%'}>Họ Tên</td>
                                                        <td>Lớp</td>
                                                        {resultClass[0].subject &&
                                                            resultClass[0].subject.map((sbj, index) => (
                                                                <React.Fragment key={`${sbj.id}`}>
                                                                    <td>TP1</td>
                                                                    <td>TP2</td>
                                                                    <td>THI</td>
                                                                    <td>TKHP</td>
                                                                    <td>Chữ</td>
                                                                </React.Fragment>
                                                            ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {resultClass &&
                                                        resultClass.map((student) => (
                                                            <tr key={student.id}>
                                                                <th scope="row">1</th>
                                                                <th>{student.code}</th>
                                                                <th>{student.name}</th>
                                                                <th>{student.class}</th>
                                                                {student.subject &&
                                                                    student.subject.map((grd, index) => (
                                                                        <React.Fragment key={index}>
                                                                            <th>{grd.grade.grade1}</th>
                                                                            <th>{grd.grade.grade2}</th>
                                                                            <th>
                                                                                {grd.grade.exam2
                                                                                    ? `${grd.grade.exam1}|${grd.grade.exam2}`
                                                                                    : grd.grade.exam1}
                                                                            </th>
                                                                            <th>
                                                                                {grd.grade.average2
                                                                                    ? `${grd.grade.average1}|${grd.grade.average2}`
                                                                                    : grd.grade.average1}
                                                                            </th>
                                                                            <th>
                                                                                {grd.grade.letter2
                                                                                    ? `${grd.grade.letter1}|${grd.grade.letter2}`
                                                                                    : grd.grade.letter1}
                                                                            </th>
                                                                        </React.Fragment>
                                                                    ))}
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </>
                                )}
                            </Row>
                        </Tab>
                        <Tab eventKey={'subject'} title="Theo từng môn học">
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
                                <FormGroup as={Col} lg={4}>
                                    <FormLabel>Khoa</FormLabel>
                                    <FormSelect onChange={handleChangeDepartment}>
                                        <option>Chọn khoa</option>
                                        {departments && departments.map((c) => <option key={c.id}>{c.name}</option>)}
                                    </FormSelect>
                                </FormGroup>
                                <FormGroup as={Col} lg={4}>
                                    <FormLabel>Môn</FormLabel>
                                    <FormSelect onChange={handleChangeSubject}>
                                        <option>Chọn môn</option>
                                        {subjects &&
                                            subjects.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                    </FormSelect>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup as={Col}>
                                    <FormLabel>Tra cứu</FormLabel>
                                    <br />
                                    <ButtonBootstrap
                                        variant="primary"
                                        className="btn btn-primary mb-3"
                                        onClick={handleClickToFindGradeBySubject}
                                    >
                                        Tra cứu
                                    </ButtonBootstrap>
                                    <ButtonBootstrap
                                        variant="primary"
                                        className="btn btn-primary mb-3 ms-1"
                                        type="submit"
                                        disabled={!valueFetch}
                                    >
                                        Xuất excel
                                    </ButtonBootstrap>
                                </FormGroup>
                            </Row>
                            {resultSubject && (
                                <>
                                    <Title title={<>Điểm thi môn: {resultSubject[0].subject.name}</>} />
                                    <div className="scroll">
                                        <Table bordered className="text-center table-responsive">
                                            <thead>
                                                <tr>
                                                    <th colSpan="4" width={'800px'}>
                                                        Học viên
                                                    </th>
                                                    <th colSpan="5">{resultSubject[0].subject.name}</th>
                                                </tr>
                                                <tr>
                                                    <td>STT</td>
                                                    <td>MSV</td>
                                                    <td width={'80%'}>Họ Tên</td>
                                                    <td>Lớp</td>
                                                    <td>TP1</td>
                                                    <td>TP2</td>
                                                    <td>THI</td>
                                                    <td>TKHP</td>
                                                    <td>Chữ</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {resultSubject &&
                                                    resultSubject.map((student) => (
                                                        <tr key={student.id}>
                                                            <th scope="row">1</th>
                                                            <th>{student.code}</th>
                                                            <th>{student.name}</th>
                                                            <th>{student.class}</th>
                                                            {student.subject && (
                                                                <>
                                                                    <th>{student.subject.grade.grade1}</th>
                                                                    <th>{student.subject.grade.grade2}</th>
                                                                    <th>
                                                                        {student.subject.grade.exam2
                                                                            ? `${student.subject.grade.exam1}|${student.subject.grade.exam2}`
                                                                            : student.subject.grade.exam1}
                                                                    </th>
                                                                    <th>
                                                                        {student.subject.grade.average2
                                                                            ? `${student.subject.grade.average1}|${student.subject.grade.average2}`
                                                                            : student.subject.grade.average1}
                                                                    </th>
                                                                    <th>
                                                                        {student.subject.grade.letter2
                                                                            ? `${student.subject.grade.letter1}|${student.subject.grade.letter2}`
                                                                            : student.subject.grade.letter1}
                                                                    </th>
                                                                </>
                                                            )}
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </>
                            )}
                        </Tab>
                    </Tabs>
                </Tab>
                <Tab eventKey={'import'} title="Import file excel">
                    <Search showStudentSelect showSubjectSelect />
                    <FormGroup>
                        <ButtonBootstrap onClick={() => fileRef.current.click()} className="m-2">
                            Nhập file excel
                        </ButtonBootstrap>
                        <FormControl
                            type="file"
                            ref={fileRef}
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            className="d-none"
                            onChange={handleChangeFile}
                        />
                    </FormGroup>
                    {showExcel && (
                        <>
                            <Title title="Preview" />
                            <Table striped hover bordered className="text-center">
                                <col />
                                <colgroup span="2"></colgroup>
                                <colgroup span="2"></colgroup>
                                <thead>
                                    <tr>
                                        {excelHeaderValue[0].map((item, index) => (
                                            <React.Fragment key={index}>
                                                {index === 0 ? (
                                                    <th colSpan="12" scope="colgroup" key={index}>
                                                        {item}
                                                    </th>
                                                ) : (
                                                    <th colSpan="5" key={index}>
                                                        {item}
                                                    </th>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                    <tr>
                                        {excelHeaderValue[1].map((item, index) => (
                                            <th scope="col" key={index}>
                                                {item}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {excelBodyValue.map((items, index) => (
                                        <tr key={index}>
                                            {items.map((item, index) => (
                                                <th key={index}>{item}</th>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Tab>
            </Tabs>
        </>
    );
}

export default FindGrade;
