import { Col, Row } from 'react-bootstrap';

import Image from '../Image';

import images from '~/assets/image';
function Footer() {
    return (
        <Row className="bg-light mt-3 sticky-bottom">
            <Col lg={4} className="text-center">
                &copy;<a href="https://actvn.netlify.app/">actvn</a>, All Right Reserved.
            </Col>
            <Col lg={3} className="text-center">
                Designed By BacteriaQH
            </Col>
            <Col lg={4} className="text-center">
                Powered By{' '}
                <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">
                    Netlify{' '}
                </a>{' '}
                &{' '}
                <a href="https://www.heroku.com/" target="_blank" rel="noreferrer">
                    Heroku
                </a>
            </Col>
            <Col lg={1} className="text-center">
                {/* <Image src={images.facebookIcon} alt="facebook" isIcon />{' '} */}
                <a href="https://github.com/BacteriaQH" target="_blank" rel="noreferrer">
                    <Image src={images.githubIcon} alt="github" isIcon />
                </a>
            </Col>
        </Row>
    );
}

export default Footer;
