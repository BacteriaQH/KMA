import { useRef, useState, Fragment, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '~/components/Loading';
import {
    Form,
    Tab,
    Tabs,
    Row,
    Col,
    Button,
    FormGroup,
    FormLabel,
    FormControl,
    Image,
    FormSelect,
} from 'react-bootstrap';

import CustomAxios from '~/config/RequestConfig';
import Title from '~/components/Title';
import url from '~/config/ServerConfig';
const EditStudent = () => {
    const fileRef = useRef();
    const navigate = useNavigate();
    const match = useParams();
    const [image, setImage] = useState();
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        code: ' ',
        firstname: '    ',
        lastname: '   ',
        gender: '1',
        image: '    ',
        bank_number: '     ',
        bank: '      ',
        school_year_id: '        ',
        dob: '        ',
        address: '         ',
        identify_number: '          ',
        identify_date: '           ',
        identify_address: '            ',
        province: '              ',
        district: '             ',
        ward: '                ',
        nationality: '                ',
        ethnic: '                  ',
        religion: '                   ',
        wish: '                   ',
        graduation_year: '                    ',
        family: '                     ',
        training_object: '                      ',
        affiliates: '                             ',
        family_phone: '                               ',
        office_phone: '                            ',
        email: '                             ',
        news_to_person: '                              ',
        news_to_address: '                               ',
        date_join_army: '                                ',
        level: '                                 ',
        cultural_level: '                                  ',
        unit: '                                   ',
        salary_type: '                                    ',
        salary_group: '                                     ',
        salary_level: '                                      ',
        salary_factor: '                                       ',
        salary_date: '                                        ',
        service: '                                        ',
        health: '                                          ',
        date_join_union: '                                           ',
        date_join_party: '                                            ',
        entry_date: '                                             ',
        graduation_date: '                                              ',
        job: '                                               ',
        laudatory: '                                                ',
        discipline: '                                                 ',
    });
    useEffect(() => {
        setIsLoading(true);
        CustomAxios.get(`/api/students/${match.id}`, {
            params: { id: match.id },
        }).then((res) => {
            if (res.data.code === 403) {
                alert('Bạn không có quyền truy cập');
                navigate('/home');
            } else if (res.status === 200) {
                console.log(res.data);
                setImage(res.data.image);
                console.log(res.data);
                const nameF = res.data.name.split(' ');
                const last = nameF.pop();
                let str = '';
                nameF.map((val) => {
                    str = str + ' ' + val;
                    return str;
                });
                const first = str.trim();
                res.data.gender.toString() === 'true' ? (res.data.gender = '1') : (res.data.gender = '0');
                const { name, createdAt, updatedAt, ...other } = res.data;
                setFormData({
                    ...other,
                    firstname: first,
                    lastname: last,
                });
            }
            setIsLoading(false);
        });
    }, [match.id, navigate]);
    const handleChangeFile = async (e) => {
        e.preventDefault();
        const upload = new FormData();
        upload.append('file', e.target.files[0]);
        CustomAxios.post(`/api/upload`, upload).then((res) => {
            setImage(res.data.filename);
            setFormData({
                ...formData,
                [e.target.name]: `${res.data.filename}`,
            });
        });
    };
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };
    const handleClick = (e) => {
        e.preventDefault();
        CustomAxios.post(`/api/students/update/${match.id}`, formData).then((res) => {
            res.data.code === 200 ? navigate('/students/profile') : setMessage(res.data.message);
        });
    };
    return (
        <>
            <Title title={'Chỉnh Sửa Học Viên'} />
            <Tabs defaultActiveKey="student" transition={true} className="mb-3">
                {message ? <div className="text-danger">{message}</div> : <></>}
                <Tab eventKey="student" title="Học Viên">
                    {isLoading && (
                        <Row>
                            <Col></Col>
                            <Col>
                                <Loading />
                            </Col>{' '}
                            <Col></Col>
                        </Row>
                    )}
                    <Title title={'Học Viên'} />
                    <Row className="mb-3">
                        <Col>
                            <FormGroup as={Row} controlId="formFirstName">
                                <FormLabel>Họ đệm</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Nhập họ đệm"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup as={Row} controlId="formLastName">
                                <FormLabel>Tên</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Nhập tên"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            {image ? (
                                <Image
                                    src={`${url.SERVER_URL}/${image}`}
                                    alt={image}
                                    width={'150px'}
                                    height={'200px'}
                                />
                            ) : (
                                <FormGroup className="d-flex justify-content-center">
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        onClick={() => fileRef.current.click()}
                                        className="fa-5x border border-primary p-4"
                                        color="#009cff "
                                    />
                                    <FormControl
                                        type="file"
                                        ref={fileRef}
                                        accept="image/*"
                                        className="d-none"
                                        onChange={handleChangeFile}
                                        name="image"
                                    />
                                </FormGroup>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="formStudentId">
                            <FormLabel>Mã Học Viên</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập mã học viên"
                                name="code"
                                onChange={handleChange}
                                value={formData.code}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="formGender">
                            <FormLabel>Giới tính</FormLabel>{' '}
                            <Form.Check
                                name="gender"
                                type={'radio'}
                                id={'male'}
                                label={'Nam'}
                                value={1}
                                checked={formData.gender === '1'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                name="gender"
                                type={'radio'}
                                id={'female'}
                                label={'Nữ'}
                                value={0}
                                checked={formData.gender === '0'}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="formBankId">
                            <FormLabel>Số Tài Khoản</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập số tài khoản"
                                name="bank_number"
                                onChange={handleChange}
                                value={formData.bank_number}
                            />
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Ngân Hàng</FormLabel>
                            <FormSelect name="bank" onChange={handleChange} value={formData.bank}>
                                <option>Chọn ngân hàng</option>
                                <option value="NH1">Ngân hàng 1</option>
                                <option value="NH2">Ngân hàng 2</option>
                                <option value="NH3">Ngân hàng 3</option>
                            </FormSelect>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col}>
                            <FormLabel>Học kỳ nhập học</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập học kỳ nhập học"
                                name="school_year_id"
                                onChange={handleChange}
                                value={formData.school_year_id}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="formIdentifyId">
                            <FormLabel>CCCD/CMND</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập CCCD/CMND"
                                name="identify_number"
                                onChange={handleChange}
                                value={formData.identify_number}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="formIdentifyDate">
                            <FormLabel>Ngày cấp</FormLabel>
                            <FormControl
                                type="date"
                                placeholder="Nhập ngày cấp"
                                name="identify_date"
                                onChange={handleChange}
                                value={formData.identify_date}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="formIdentifyAddress">
                            <FormLabel>Nơi cấp</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập nơi cấp"
                                name="identify_address"
                                onChange={handleChange}
                                value={formData.identify_address}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} lg={6} controlId="formBirthday">
                            <FormLabel>Ngày sinh</FormLabel>
                            <FormControl
                                type="date"
                                placeholder="Nhập ngày sinh"
                                name="dob"
                                onChange={handleChange}
                                value={formData.dob}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="formAddress">
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập địa chỉ"
                                name="address"
                                onChange={handleChange}
                                value={formData.address}
                            />
                        </FormGroup>
                    </Row>
                </Tab>
                <Tab eventKey="household" title="Hộ Khẩu">
                    <Title title="Hộ Khẩu" />
                    <FormGroup as={Col} controlId="formAddressProvince">
                        <FormLabel>Tỉnh/ Thành Phố</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Nhập tỉnh/ thành phố"
                            name="province"
                            onChange={handleChange}
                            value={formData.province}
                        />
                    </FormGroup>
                    <FormGroup as={Col} controlId="formAddressDistrict">
                        <FormLabel>Huyện/ Quận</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Nhập huyện/ quận"
                            name="district"
                            onChange={handleChange}
                            value={formData.district}
                        />
                    </FormGroup>
                    <FormGroup as={Col} controlId="formAddressWard">
                        <FormLabel>Xã/ Phường</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Nhập xã/ phường"
                            name="ward"
                            onChange={handleChange}
                            value={formData.ward}
                        />
                    </FormGroup>
                </Tab>
                <Tab eventKey="object" title="Đối tượng">
                    <Title title="Đối tượng" />
                    <Row>
                        <FormGroup as={Col}>
                            <FormLabel>Quốc tịch</FormLabel>
                            <Form.Select name="nationality" onChange={handleChange} value={formData.nationality}>
                                <option>Chọn quốc tịch</option>
                                <option>Việt Nam</option>
                                <option>Lào</option>
                                <option>Trung Quốc</option>
                            </Form.Select>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Dân tộc</FormLabel>
                            <Form.Select name="ethnic" onChange={handleChange} value={formData.ethnic}>
                                <option>Chọn dân tộc</option>
                                <option>Kinh</option>
                                <option>Dân tộc 2</option>
                                <option>Dân tộc 3</option>
                            </Form.Select>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Tôn giáo</FormLabel>
                            <Form.Select name="religion" onChange={handleChange} value={formData.religion}>
                                <option>Chọn tôn giáo</option>
                                <option value="1">Tôn giáo 1</option>
                                <option value="2">Tôn giáo 2</option>
                                <option value="3">Tôn giáo 3</option>
                            </Form.Select>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Row} controlId="formWish">
                            <FormLabel>Trúng tuyển theo nguyện vọng</FormLabel>
                            <FormControl type="text" name="wish" onChange={handleChange} value={formData.wish} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Row} controlId="formGraduationYear">
                            <FormLabel>Năm tốt nghiệp</FormLabel>
                            <FormControl
                                type="text"
                                name="graduation_year"
                                onChange={handleChange}
                                value={formData.graduation_year}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col}>
                            <FormLabel>Thành phần gia đình</FormLabel>
                            <Form.Select name="family" onChange={handleChange} value={formData.family}>
                                <option value="1">Thành phần 1</option>
                                <option value="2">Thành phần 2</option>
                                <option value="3">Thành phần 3</option>
                            </Form.Select>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col}>
                            <FormLabel>Đối tượng đào tạo</FormLabel>
                            <Form.Select
                                name="training_object"
                                onChange={handleChange}
                                value={formData.training_object}
                            >
                                <option value="1">Đối tượng 1</option>
                                <option value="2">Đối tượng 2</option>
                                <option value="3">Đối tượng 3</option>
                            </Form.Select>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Đơn vị liên kết</FormLabel>
                            <Form.Select name="affiliates" onChange={handleChange} value={formData.affiliates}>
                                <option value="1">Đơn vị liên kết 1</option>
                                <option value="2">Đơn vị liên kết 2</option>
                                <option value="3">Đơn vị liên kết 3</option>
                            </Form.Select>
                        </FormGroup>
                    </Row>
                </Tab>
                <Tab eventKey="contact" title="Liên Lạc">
                    <Title title="Liên lạc" />
                    <Row>
                        <FormGroup as={Col} controlId="formPersonPhone">
                            <FormLabel>Điện thoại cá nhân</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập Điện thoại cá nhân"
                                name="person_phone"
                                onChange={handleChange}
                                value={formData.person_phone}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="formFamilyPhone">
                            <FormLabel>Điện thoại gia đình</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập Điện thoại gia đình"
                                name="family_phone"
                                onChange={handleChange}
                                value={formData.family_phone}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="formOfficePhone">
                            <FormLabel>Điện thoại cơ quan</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nhập Điện thoại cơ quan"
                                name="office_phone"
                                onChange={handleChange}
                                value={formData.office_phone}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="formEmail">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type="email"
                                placeholder="Nhập Email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="formNewsTo">
                            <FormLabel>Báo tin cho </FormLabel>
                            <FormControl
                                type="text"
                                name="news_to_person"
                                onChange={handleChange}
                                value={formData.news_to_person}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="formNewsToAddress">
                            <FormLabel>Ở đâu</FormLabel>
                            <FormControl
                                type="text"
                                name="news_to_address"
                                onChange={handleChange}
                                value={formData.news_to_address}
                            />
                        </FormGroup>
                    </Row>
                </Tab>
                <Tab eventKey="info" title="Thông Tin Quân Nhân">
                    <Title title="Thông Tin Quân Nhân" />
                    <Row>
                        <FormGroup as={Col} controlId="DateJoinArmy">
                            <FormLabel>Tháng/ Năm nhập ngũ </FormLabel>
                            <FormControl
                                type="text"
                                name="date_join_army"
                                onChange={handleChange}
                                value={formData.date_join_army}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="Level">
                            <FormLabel>Cấp bậc</FormLabel>
                            <FormControl type="text" name="level" onChange={handleChange} value={formData.level} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="CulturalLevel">
                            <FormLabel>Trình độ văn hoá</FormLabel>
                            <FormControl
                                type="text"
                                name="cultural_level"
                                onChange={handleChange}
                                value={formData.cultural_level}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="Unit">
                            <FormLabel>Đơn vị cử đi học</FormLabel>
                            <FormControl type="text" name="unit" onChange={handleChange} value={formData.unit} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="SalaryType">
                            <FormLabel>Loại lương</FormLabel>
                            <FormControl
                                type="text"
                                name="salary_type"
                                onChange={handleChange}
                                value={formData.salary_type}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="SalaryGroup">
                            <FormLabel>Nhóm lương</FormLabel>
                            <FormControl
                                type="text"
                                name="salary_group"
                                onChange={handleChange}
                                value={formData.salary_group}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="SalaryLevel">
                            <FormLabel>Bậc lương</FormLabel>
                            <FormControl
                                type="text"
                                name="salary_level"
                                onChange={handleChange}
                                value={formData.salary_level}
                            />
                        </FormGroup>
                        <FormGroup as={Col} controlId="SalaryFactor">
                            <FormLabel>Hệ số lương</FormLabel>
                            <FormControl
                                type="text"
                                name="salary_factor"
                                onChange={handleChange}
                                value={formData.salary_factor}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="SalaryDate">
                            <FormLabel>Tháng/ Năm nhận lương</FormLabel>
                            <FormControl
                                type="text"
                                name="salary_date"
                                onChange={handleChange}
                                value={formData.salary_date}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="Service">
                            <FormLabel>Chức vụ</FormLabel>
                            <FormControl type="text" name="service" onChange={handleChange} value={formData.service} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="Health">
                            <FormLabel>Sức khoẻ</FormLabel>
                            <FormControl type="text" name="health" onChange={handleChange} value={formData.health} />
                        </FormGroup>
                    </Row>
                </Tab>
                <Tab eventKey="other" title="Khác">
                    <Title title="Khác" />
                    <Row>
                        <FormGroup as={Col} controlId="JoinDateUnion">
                            <FormLabel>Ngày vào Đoàn</FormLabel>
                            <FormControl
                                type="text"
                                name="date_join_union"
                                onChange={handleChange}
                                value={formData.date_join_union}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="JoinDateParty">
                            <FormLabel>Ngày vào Đảng</FormLabel>
                            <FormControl
                                type="text"
                                name="date_join_party"
                                onChange={handleChange}
                                value={formData.date_join_party}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="EntryDate">
                            <FormLabel>Ngày vào trường</FormLabel>
                            <FormControl
                                type="text"
                                name="entry_date"
                                onChange={handleChange}
                                value={formData.entry_date}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="GraduationDate">
                            <FormLabel>Ngày ra trường</FormLabel>
                            <FormControl
                                type="text"
                                name="graduation_date"
                                onChange={handleChange}
                                value={formData.graduation_date}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="Job">
                            <FormLabel>Nghề nghiệp/ Chức vụ</FormLabel>
                            <FormControl type="text" name="job" onChange={handleChange} value={formData.job} />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="Laudatory">
                            <FormLabel>Khen thưởng</FormLabel>
                            <FormControl
                                type="text"
                                name="laudatory"
                                onChange={handleChange}
                                value={formData.laudatory}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="Discipline">
                            <FormLabel>Kỷ luật</FormLabel>
                            <FormControl
                                type="text"
                                name="discipline"
                                onChange={handleChange}
                                value={formData.discipline}
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup as={Col} controlId="Note">
                            <FormLabel>Ghi chú</FormLabel>
                            <FormControl type="text" name="note" onChange={handleChange} />
                        </FormGroup>
                    </Row>
                </Tab>
            </Tabs>
            <Button variant="primary" className="mt-3" onClick={handleClick}>
                Chỉnh sửa học viên
            </Button>
        </>
    );
};
export default EditStudent;
