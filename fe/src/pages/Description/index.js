import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import Title from '../../components/Title';

function Description() {
    return (
        <>
            <Row>
                <Col lg={3}>
                    <Row>
                        <Col lg={3}>
                            <Link to={'/'} className="mx-3 my-3">
                                <Image isLogo alt={'logo'} />
                            </Link>
                        </Col>
                        <Col lg={9} className="d-flex justify-content-center align-items-center">
                            <Link to={'/'}>
                                <h5 className="text-primary navbar-brand-name fw-bold">Quản Lý Sinh Viên</h5>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col lg={5}></Col>
                <Col lg={4}>
                    <Link as={Button} to={'/login'} className="btn btn-primary m-3">
                        Đăng nhập
                    </Link>
                </Col>
            </Row>
            <Title title={'Trang web quản lý học viên KMA'} />
            <Row>
                <Col lg={3}></Col>
                <Col lg={7}>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Quyền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>admin01@lch.com</td>
                                <td>admin01</td>
                                <td>Admin</td>
                                <td>Tất cả</td>
                            </tr>
                            <tr>
                                <td>student01@lch.com</td>
                                <td>student01</td>
                                <td>Học viên</td>
                                <td>Xem điểm, thêm thông tin của chính mình</td>
                            </tr>
                            <tr>
                                <td>teacher01@lch.com</td>
                                <td>teacher01</td>
                                <td>Giảng viên</td>
                                <td>Sửa thông tin của chính mình </td>
                            </tr>
                            <tr>
                                <td>department01@lch.com</td>
                                <td>department01</td>
                                <td>Khảo thí</td>
                                <td>Thêm tất cả điểm</td>
                            </tr>
                            <tr>
                                <td>department02@lch.com</td>
                                <td>department02</td>
                                <td>Hệ QLSV</td>
                                <td>Thêm thông tin cho sinh viên </td>
                            </tr>
                            <tr>
                                <td>department03@lch.com</td>
                                <td>department03</td>
                                <td>Đào tạo</td>
                                <td>
                                    Lập lịch học <br /> Quản lý môn học
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <p>
                        Khi tạo sinh viên hoặc giảng viên mới thì hệ thống sẽ tạo mới 1 tài khoản trong hệ thống với
                        <br />
                        <strong>Tên đăng nhập</strong> là <strong>Mã SV/GV</strong>, <strong>Mật khẩu</strong> là{' '}
                        <strong>123456789</strong>.
                    </p>
                </Col>
            </Row>
        </>
    );
}

export default Description;
