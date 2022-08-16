import { Col, Row } from 'react-bootstrap';
import Button from '../../../components/Button';
import Title from '../../../components/Title';

function SubjectManagement() {
    return (
        <>
            <Title title={'Quản lý môn học'} />
            <Row>
                <Col>
                    <Button to={'/subjects/add'} primary>
                        Thêm môn học
                    </Button>
                </Col>
                <Col>
                    <Button to={'/subjects/list'} primary>
                        Danh sách môn học
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default SubjectManagement;
