import { useEffect, useRef, useState } from 'react';

import {
    FormGroup,
    Table,
    Button as ButtonBootstrap,
    FormControl,
    Tabs,
    Tab,
    FormLabel,
    Col,
    Row,
    FormSelect,
} from 'react-bootstrap';

import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as xlsx from 'xlsx';

import Title from '~/components/Title';
import Search from '~/components/Search';
import { Link } from 'react-router-dom';
import CustomAxios from '~/config/RequestConfig';
import Loading from '~/components/Loading';

function ListStudent() {
    const [showExcel, setShowExcel] = useState(false);
    const [excelHeaderValue, setExcelHeaderValue] = useState([]);
    const [excelBodyValue, setExcelBodyValue] = useState([]);
    const [valueFetch, setValueFetch] = useState([]);
    const fileRef = useRef();
    const [departments, setDepartments] = useState('');
    const [classes, setClasses] = useState('');
    const [courses, setCourses] = useState('');
    const [classSelect, setClassesSelect] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = xlsx.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
            data.splice(0, 3);
            const header = data.splice(0, 1);
            setShowExcel(true);
            setExcelHeaderValue(header);
            setExcelBodyValue(data);
        };
        reader.readAsBinaryString(file);
    };
    useEffect(() => {
        setIsLoading(true);
        CustomAxios.post(`/api/query`, ['departments', 'classes', 'courses']).then((res) => {
            setDepartments(res.data.departments);
            setClasses(res.data.classes);
            setCourses(res.data.courses);
            setIsLoading(false);
        });
    }, []);

    const handleFetchData = () => {
        setIsLoading(true);
        CustomAxios.get(`/api/students/by-class`, {
            params: { classes: classSelect },
        }).then((res) => {
            res.data.map((data) => {
                if (data.gender === true) {
                    data.gender = 'Nam';
                } else {
                    data.gender = 'Nữ';
                }
                return true;
            });
            setValueFetch(res.data);
            setIsLoading(false);
        });
    };
    const handleChange = (e) => {
        setClassesSelect(e.target.value);
    };

    const ExportToExcel = () => {
        const worksheet = xlsx.utils.json_to_sheet(valueFetch);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        xlsx.writeFile(workbook, 'DataSheet.xlsx');
    };
    return (
        <>
            <Title title="Danh sách học viên" />
            <Tabs defaultActiveKey={'list'} transition className="m-3">
                <Tab eventKey={'list'} title="Danh sách học viên">
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
                            <FormLabel>Khoa</FormLabel>
                            <FormSelect>
                                <option>Chọn khoa</option>
                                {departments ? (
                                    departments.map((dep) => <option key={dep.id}>{dep.name}</option>)
                                ) : (
                                    <></>
                                )}
                            </FormSelect>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Khoá</FormLabel>
                            <FormSelect>
                                <option>Chọn khoá</option>
                                {courses ? (
                                    courses.map((course) => <option key={course.id}>{course.code}</option>)
                                ) : (
                                    <></>
                                )}
                            </FormSelect>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Lớp</FormLabel>
                            <FormSelect onChange={handleChange}>
                                <option>Chọn lớp</option>
                                <option value={'all'}>Tất cả</option>
                                {classes ? classes.map((c) => <option key={c.id}>{c.name}</option>) : <></>}
                            </FormSelect>
                        </FormGroup>
                    </Row>
                    <FormGroup as={Col}>
                        <FormLabel>Tra cứu</FormLabel>
                        <br />
                        <ButtonBootstrap variant="primary" onClick={handleFetchData}>
                            Tra cứu
                        </ButtonBootstrap>
                        <ButtonBootstrap
                            variant="primary"
                            type="submit"
                            className="ms-1"
                            disabled={!valueFetch}
                            onClick={ExportToExcel}
                        >
                            Xuất excel
                        </ButtonBootstrap>
                    </FormGroup>
                    <Table striped hover className="table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Họ và Tên</th>
                                <th scope="col">Mã Sinh Viên</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Lớp</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {valueFetch ? (
                                valueFetch.map((value, index) => (
                                    <tr key={index}>
                                        <th scope="row">{value.id}</th>
                                        <td>{value.name}</td>
                                        <td>{value.code}</td>
                                        <td>{value.gender}</td>
                                        <td>{value.class}</td>
                                        <td>
                                            <Link
                                                className="btn btn-primary btn-sm"
                                                to={`/students/profile/edit/${value.id}`}
                                            >
                                                <FontAwesomeIcon icon={faPenSquare} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey={'import'} title="Import file excel">
                    <Search />
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
                    <input type="hidden" value={excelBodyValue} />
                    {showExcel && (
                        <>
                            <Title title="Preview" />
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        {excelHeaderValue[0].map((item, index) => (
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
                                                <th scope="col" key={index}>
                                                    {item}
                                                </th>
                                            ))}
                                            <td>
                                                <a className="btn btn-primary btn-sm" href="/">
                                                    <FontAwesomeIcon icon={faPenSquare} />
                                                </a>
                                            </td>
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

export default ListStudent;
