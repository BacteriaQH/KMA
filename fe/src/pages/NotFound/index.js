import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
function NotFound() {
    const user = useSelector((state) => state.auth.login.currentUser);
    let role_symbol = Number(user.role_symbol);
    return (
        <>
            <Row>
                <Col> </Col>
                <Col>
                    <h1 className="text-danger mt-5 text-center">404</h1>{' '}
                </Col>
                <Col> </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <h1 className="text-danger text-center">Not Found</h1>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col lg={10}>
                    <h3 className="mt-5">Trang bạn yêu cầu không tồn tại hoặc bạn không có quyền truy cập.</h3>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col> </Col>
                <Col className="text-center">
                    <Link to={role_symbol !== 0 ? '/home' : '/'} className="btn btn-primary">
                        Trang chủ
                    </Link>
                </Col>
                <Col> </Col>
            </Row>
        </>
    );
}

export default NotFound;
