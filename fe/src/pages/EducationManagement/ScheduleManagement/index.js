import { Col, Row } from 'react-bootstrap';
import Button from '../../../components/Button';
import Title from '../../../components/Title';

function ScheduleManagement() {
    return (
        <>
            <>
                <Title title={'Quản lý thời khoá biểu'} />
                <Row>
                    <Col>
                        <Button to={'/schedule/add'} primary>
                            Thêm thời khoá biểu
                        </Button>
                    </Col>
                    <Col>
                        <Button to={'/schedule/add-classroom'} primary>
                            Thêm lớp tín chỉ từng môn
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button to={'/schedule/add-teachers-to-schedule'} primary>
                            Thêm giảng viên vào thời khoá biểu
                        </Button>
                    </Col>
                </Row>
            </>
        </>
    );
}

export default ScheduleManagement;
