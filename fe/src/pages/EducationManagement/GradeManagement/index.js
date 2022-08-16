import { Col, Row } from 'react-bootstrap';

import Button from '~/components/Button';
import Title from '~/components/Title';
import { useSelector } from 'react-redux';

function GradeManagement() {
    const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <>
            <Title title={'Quản lý điểm'} />
            {user.role_symbol === '2' ? (
                <Button to={`/grades/find/${user.id}`} primary>
                    {' '}
                    Xem điểm
                </Button>
            ) : user.role_symbol === '3' ? (
                <Button to="/grades/add" primary>
                    {' '}
                    Thêm điểm
                </Button>
            ) : (
                <Row>
                    <Col>
                        <Button to="/grades/add" primary>
                            {' '}
                            Thêm điểm
                        </Button>
                    </Col>
                    <Col>
                        <Button to="/grades/find" primary>
                            {' '}
                            Tra cứu điểm
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default GradeManagement;
