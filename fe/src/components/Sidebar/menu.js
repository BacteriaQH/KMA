import {
    faHouse,
    faUserGraduate,
    faBookOpen,
    faBook,
    faPerson,
    faChalkboardTeacher,
    faAward,
    faReceipt,
    faGraduationCap,
    faFilter,
    faAsterisk,
} from '@fortawesome/free-solid-svg-icons';

export const adminMenu = [
    {
        icon: faHouse,
        title: 'Trang Chủ',
        to: '/home',
        items: [],
    },
    {
        icon: faUserGraduate,
        title: 'Quản lý học viên',
        items: [
            {
                title: 'Hồ sơ',
                icon: faBook,
                to: '/students/profile',
            },
            {
                title: 'Báo cáo *',
                icon: faBookOpen,
                to: '/students/report',
            },
        ],
    },
    {
        icon: faPerson,
        title: 'Quản lý đào tạo',
        items: [
            {
                title: 'Quản lý giảng viên',
                icon: faChalkboardTeacher,
                to: '/teachers/profile',
            },
            {
                title: 'Quản lý lớp học',
                icon: faChalkboardTeacher,
                to: '/class',
            },
            {
                title: 'Lập lịch học',
                icon: faChalkboardTeacher,
                to: '/schedule',
            },
            {
                title: 'Quản lý điểm',
                icon: faAward,
                to: '/grades',
            },
            {
                title: 'Quản lý môn học',
                icon: faReceipt,
                to: '/subjects',
            },
            {
                title: 'Quản lý tốt nghiệp *',
                icon: faGraduationCap,
                to: '/home',
            },
            {
                title: 'Xử lý học vụ *',
                icon: faFilter,
                to: '/home',
            },
            {
                title: 'Khác ',
                icon: faAsterisk,
                to: '/others',
            },
        ],
    },
];

export const studentMenu = [
    {
        icon: faHouse,
        title: 'Trang Chủ',
        to: '/home',
        items: [],
    },
    {
        icon: faUserGraduate,
        title: 'Chỉnh sửa thông tin',
        items: [
            {
                title: 'Hồ sơ',
                icon: faBook,
                to: '/students/profile',
            },
        ],
    },
    {
        title: 'Quản lý điểm',
        icon: faAward,
        to: '/grades',
    },
];

export const teacherMenu = [
    {
        icon: faHouse,
        title: 'Trang Chủ',
        to: '/home',
        items: [],
    },
    {
        icon: faPerson,
        title: 'Quản lý đào tạo',
        items: [
            {
                title: 'Quản lý giảng viên',
                icon: faChalkboardTeacher,
                to: '/teachers/profile',
            },
            {
                title: 'Quản lý điểm',
                icon: faAward,
                to: '/grades',
            },
        ],
    },
];
//Khảo thí
export const department1Menu = [
    {
        icon: faHouse,
        title: 'Trang Chủ',
        to: '/home',
        items: [],
    },
    {
        icon: faPerson,
        title: 'Quản lý đào tạo',
        items: [
            {
                title: 'Quản lý điểm',
                icon: faAward,
                to: '/grades',
            },
        ],
    },
];
// Hệ QLSV
export const department2Menu = [
    {
        icon: faHouse,
        title: 'Trang Chủ',
        to: '/home',
        items: [],
    },
    {
        icon: faUserGraduate,
        title: 'Quản lý học viên',
        items: [
            {
                title: 'Hồ sơ',
                icon: faBook,
                to: '/students/profile',
            },
            {
                title: 'Báo cáo *',
                icon: faBookOpen,
                to: '/students/report',
            },
        ],
    },
];
//Đào tạo
export const department3Menu = [
    {
        icon: faHouse,
        title: 'Trang Chủ',
        to: '/home',
        items: [],
    },
    {
        icon: faPerson,
        title: 'Quản lý đào tạo',
        items: [
            {
                title: 'Quản lý lớp học',
                icon: faChalkboardTeacher,
                to: '/class',
            },
            {
                title: 'Lập lịch học',
                icon: faChalkboardTeacher,
                to: '/schedule',
            },
            {
                title: 'Quản lý môn học',
                icon: faReceipt,
                to: '/subjects',
            },
        ],
    },
];
