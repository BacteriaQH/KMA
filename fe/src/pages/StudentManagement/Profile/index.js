import Title from '~/components/Title';
import Button from '~/components/Button';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function StudentProfile() {
    const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <>
            <Title title={'Hồ sơ'} />
            <>
                {user.role_symbol === '2' ? (
                    <>
                        <Button to={`/students/profile/edit/${user.id}`} primary>
                            Chỉnh sửa thông tin
                        </Button>
                    </>
                ) : (
                    <Row>
                        <Col>
                            <Button to={'/students/profile/add'} primary>
                                Thêm Học Viên
                            </Button>
                        </Col>
                        <Col>
                            <Button to={'/students/profile/list'} primary>
                                Danh sách học viên
                            </Button>
                        </Col>
                    </Row>
                )}
            </>
        </>
    );
}

export default StudentProfile;
