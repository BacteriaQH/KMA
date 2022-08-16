import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import { Col, Row } from 'react-bootstrap';

function DefaultLayout({ children }) {
    return (
        <>
            <Row className="bg-light me-0">
                <Header />
            </Row>
            <Row className="me-0">
                <Col lg={3} className="bg-light ms-3 me-4">
                    <Sidebar />
                </Col>
                <Col lg={8}>
                    <div style={{ minHeight: '440px' }}> {children}</div>
                    <Footer />
                </Col>
            </Row>
        </>
    );
}

export default DefaultLayout;
