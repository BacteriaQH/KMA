import { Col, Row } from 'react-bootstrap';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import { useSelector } from 'react-redux';
function TeacherProfile() {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <>
            <Title title={'Quản lý giảng viên'} />
            {user.role_symbol === '3' ? (
                <>
                    {' '}
                    <Button to={`/teachers/profile/edit/${user.id}`} primary>
                        Chỉnh sửa giảng viên
                    </Button>
                </>
            ) : (
                <Row>
                    <Col>
                        <Button to={'/teachers/profile/add'} primary>
                            Thêm giảng viên
                        </Button>
                    </Col>
                    <Col>
                        <Button to={'/teachers/profile/list'} primary>
                            Danh sách giảng viên
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default TeacherProfile;
