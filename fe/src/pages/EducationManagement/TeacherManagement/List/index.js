import { useRef, useState } from 'react';

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
    Button,
} from 'react-bootstrap';

import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomAxios from '~/config/RequestConfig';

import * as xlsx from 'xlsx';

import Title from '~/components/Title';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
function ListTeacher() {
    const fileRef = useRef();
    const [showExcel, setShowExcel] = useState(false);
    const [excelHeaderValue, setExcelHeaderValue] = useState([]);
    const [excelBodyValue, setExcelBodyValue] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [valueFetch, setValueFetch] = useState('');

    const ExportToExcel = () => {
        const worksheet = xlsx.utils.json_to_sheet(valueFetch);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        xlsx.writeFile(workbook, 'DataSheet.xlsx');
    };
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
    const handleFetchData = () => {
        setIsLoading(true);
        CustomAxios.get(`/api/teachers/list`).then((res) => {
            res.data.map((data) => {
                if (data.gender === true) {
                    data.gender = 'Nam';
                } else {
                    data.gender = 'Nữ';
                }
                return 1;
            });
            setValueFetch(res.data);
            setIsLoading(false);
        });
    };
    const handleSaveDataToDB = () => {
        const data = excelBodyValue.map((i) => {
            return { name: i[1], code: i[2], department: i[3], email: i[4], gender: i[5], phone: i[6] };
        });
        CustomAxios.post(`/api/teachers/import`, data).then((res) => {
            console.log(res.data);
        });
    };
    return (
        <>
            <Title title="Danh sách giảng viên" />
            <Tabs defaultActiveKey={'list'} transition className="m-3">
                <Tab eventKey={'list'} title="Danh sách giảng viên">
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
                        <FormLabel>Tra cứu</FormLabel>
                        <br />
                        <ButtonBootstrap variant="primary" type="submit" onClick={handleFetchData}>
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
                    {valueFetch ? (
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Họ và Tên</th>
                                    <th scope="col">Giới tính</th>
                                    <th scope="col">Mã giảng viên</th>
                                    <th scope="col">Khoa</th>
                                    <th scope="col">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {valueFetch.map((value, index) => (
                                    <tr key={index}>
                                        <th scope="row">{value.id}</th>
                                        <td>{value.name}</td>
                                        <td>{value.gender}</td>
                                        <td>{value.code}</td>
                                        <td>{value.department}</td>
                                        <td>
                                            <Link
                                                className="btn btn-primary btn-sm"
                                                to={`/teachers/profile/edit/${value.id}`}
                                            >
                                                <FontAwesomeIcon icon={faPenSquare} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <></>
                    )}
                </Tab>
                <Tab eventKey={'import'} title="Import file excel">
                    <FormGroup>
                        <ButtonBootstrap onClick={() => fileRef.current.click()} className="m-2">
                            Xem excel
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
                    <Button onClick={handleSaveDataToDB}>Nhập file</Button>
                </Tab>
            </Tabs>
        </>
    );
}

export default ListTeacher;
