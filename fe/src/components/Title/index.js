import { Row } from 'react-bootstrap';

function Title({ title }) {
    return (
        <Row color={'black'} className={'bg-light ms-3 mt-3 mb-3 text-center'}>
            <h4>{title}</h4>
        </Row>
    );
}

export default Title;
