import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasChildren } from './utils';
import { adminMenu, studentMenu, teacherMenu, department1Menu, department2Menu, department3Menu } from './menu';
import Button from '../Button';
import { useSelector } from 'react-redux';
const Sidebar = () => {
    const role = useSelector((state) => state.auth.login.currentUser?.role_symbol);
    let menu = [];
    switch (Number.parseInt(role)) {
        case 1:
            menu = adminMenu;
            break;
        case 2:
            menu = studentMenu;
            break;
        case 3:
            menu = teacherMenu;
            break;
        case 4:
            menu = department1Menu;
            break;
        case 5:
            menu = department2Menu;
            break;
        case 6:
            menu = department3Menu;
            break;

        default:
            break;
    }
    return (
        <SidebarMenu>
            <SidebarMenu.Body>
                {menu.map((subMenu, index) => (
                    <MenuItem item={subMenu} key={index} />
                ))}
            </SidebarMenu.Body>
        </SidebarMenu>
    );
};
const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component items={item} />;
};
const SingleLevel = ({ items }) => {
    return (
        <SidebarMenu.Nav.Link as={Button} to={items.to}>
            <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={items.icon} />
            </SidebarMenu.Nav.Icon>{' '}
            <SidebarMenu.Nav.Title>{items.title}</SidebarMenu.Nav.Title>
        </SidebarMenu.Nav.Link>
    );
};

const MultiLevel = ({ items }) => {
    return (
        <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle className="btn">
                <SidebarMenu.Nav.Icon>
                    <FontAwesomeIcon icon={items.icon} />
                </SidebarMenu.Nav.Icon>{' '}
                <SidebarMenu.Nav.Title>{items.title}</SidebarMenu.Nav.Title>
            </SidebarMenu.Sub.Toggle>
            <SidebarMenu.Sub.Collapse>
                {items.items.map((item, index) => (
                    <SidebarMenu.Nav key={index}>
                        <SidebarMenu.Nav.Link as={Button} to={item.to}>
                            <SidebarMenu.Nav.Icon>
                                <FontAwesomeIcon icon={item.icon} />
                            </SidebarMenu.Nav.Icon>{' '}
                            <SidebarMenu.Nav.Title>{item.title}</SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav.Link>
                    </SidebarMenu.Nav>
                ))}
            </SidebarMenu.Sub.Collapse>
        </SidebarMenu.Sub>
    );
};
export default Sidebar;
