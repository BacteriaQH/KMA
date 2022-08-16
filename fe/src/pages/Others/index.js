import { Col, Row } from 'react-bootstrap';
import Button from '../../components/Button';
import Title from '../../components/Title';

function Others() {
    return (
        <>
            <Title title={'Khác'} />
            <Row>
                <Col>
                    <Button to={'/others/authorization'} primary>
                        Phân quyền hệ thống
                    </Button>
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

export default Others;
