import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Table } from 'react-bootstrap';

import CustomAxios from '~/config/RequestConfig';
import Title from '~/components/Title';
import Loading from '~/components/Loading';
function FindGradeStudent() {
    const match = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [grade, setGrade] = useState('');

    useEffect(() => {
        setIsLoading(true);
        CustomAxios.get(`/api/grades/find-grade/student/${match.id}`, {
            params: { id: match.id },
        }).then((res) => {
            setGrade(res.data);
            setIsLoading(false);
        });
    }, [match.id]);
    return (
        <>
            <Title title={'Xem điểm'} />
            {isLoading && (
                <Row>
                    <Col></Col>
                    <Col>
                        <Loading />
                    </Col>
                    <Col></Col>
                </Row>
            )}
            {grade && (
                <div className="scroll">
                    <Table striped hover bordered className="text-center table-responsive">
                        <thead>
                            <tr>
                                <th colSpan="4" scope="colgroup">
                                    Học viên
                                </th>
                                {grade.subject &&
                                    grade.subject.map((sbj, index) => (
                                        <th colSpan="5" scope="colgroup" key={index}>
                                            {sbj.name}
                                        </th>
                                    ))}
                            </tr>
                            <tr>
                                <td>STT</td>
                                <td>MSV</td>
                                <td style={{ width: '100px' }}>Họ Tên</td>
                                <td>Lớp</td>
                                {grade.subject &&
                                    grade.subject.map((sbj, index) => (
                                        <React.Fragment key={index}>
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
                            <tr>
                                <th scope="row">1</th>
                                <th>{grade.code}</th>
                                <th>{grade.name}</th>
                                <th>{grade.class}</th>

                                {grade.subject &&
                                    grade.subject.map((grd, index) => (
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
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
}

export default FindGradeStudent;
