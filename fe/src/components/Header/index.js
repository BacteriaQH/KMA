import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Role from '../Role';
import Image from '../Image';

function Header() {
    const user = useSelector((state) => state.auth.login.currentUser);
    let role_name;
    switch (Number.parseInt(user.role_symbol)) {
        case 1:
            role_name = 'Admin';
            break;

        case 2:
            role_name = 'Học viên';
            break;

        case 3:
            role_name = 'Giảng viên';
            break;

        case 4:
            role_name = 'Khảo thí';
            break;

        case 5:
            role_name = 'Hệ QLSV';
            break;

        case 6:
            role_name = 'Đào tạo';
            break;
        default:
            break;
    }
    return (
        <>
            <Row>
                <Col lg={3}>
                    <Row>
                        <Col lg={3}>
                            <Link to={'/home'} className="m-3">
                                <Image isLogo alt={'logo'} />
                            </Link>
                        </Col>
                        <Col lg={9} className="d-flex justify-content-center align-items-center">
                            <Link to={'/home'} as={Button}>
                                <h6 className="text-primary navbar-brand-name fw-bold">Quản Lý Sinh Viên</h6>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col lg={5}></Col>
                <Col lg={4}>
                    <Row>
                        {' '}
                        <Role showDropdown={true} name={user?.name} role={role_name} />
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Header;
