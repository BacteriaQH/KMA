const { findGradeByClass, findGradeBySubject } = require('../services/CRUD');
const { hashPassword } = require('../services/hash');
// findGradeBySubject('c749279ba179103b6822').then((res) => console.log(res));
// findGradeByClass('AT16E').then((res) => console.log(res));


hashPassword('student01').then((res) => console.log(res));