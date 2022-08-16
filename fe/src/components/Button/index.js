import { Button as ButtonBootstrap } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Button({ to, sm, primary, danger, children }) {
    return (
        <Link
            as={ButtonBootstrap}
            to={to}
            className={`btn m-2 ${primary ? 'btn-primary' : ''} ${danger ? 'btn-danger' : ''} ${sm ? 'btn-sm' : ''}`}
        >
            {children}
        </Link>
    );
}

export default Button;
