const models = require('../../models');
const bcrypt = require('bcrypt');

exports.join = async (req, res) => {
    const body = req.body;

    try {
        const checkId = await models.User.findOne({
            where: {
                id: body.id,
            },
        });

        const checkEmail = await models.User.findOne({
            where: {
                email: body.email,
            },
        });

        if (checkId) {
            return res.status(401).json({
                message: '이미 사용중인 ID입니다.',
            });
        }

        if (checkEmail) {
            return res.status(401).json({
                message: '이미 사용중인 Email입니다.',
            });
        }

        const salt = 10;
        const hashPassword = bcrypt.hashSync(body.password, salt);

        await models.User.create({
            id: body.id,
            name: body.name,
            email: body.email,
            password: hashPassword,
        });

        return res.status(200).json({
            message: '회원가입 되었습니다.',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: '서버 오류'
        });
    }
};

exports.login = async (req, res) => {
    const body = req.body;
    try {
        const user = await models.User.findOne({
            where: {
                id: body.id
            }
        });
        if (user) {
            const passwordValid = bcrypt.compareSync(body.password, user.password);
            if (passwordValid) {
                return res.status(200).json({
                    message: '로그인 되었습니다.'
                });
            } else {
                return res.status(400).json({
                    message: '비밀번호가 일치하지 않습니다.'
                });
            }
        } else {
            return res.status(404).json({
                message: '계정이 존재하지 않습니다.'
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: '서버 오류'
        });
    }
};