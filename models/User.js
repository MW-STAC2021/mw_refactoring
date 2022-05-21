module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            allowNull: false,
            comment: '회원 고유 ID',
        },
        name: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '회원 이름',
        },
        email: {
            type: DataTypes.STRING(30),
            validate: {
                isEmail: true,
            },
            unique: true,
            allowNull: false,
            comment: '회원 이메일',
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
            comment: '회원 비밀번호',
        }
    }, {
        charset: 'utf8',
        collate: "utf8_general_ci",
        tableName: 'User'
    });

    User.getUser = userId => User.findOne({
        attributes: [
            'id',
            'name',
            'email',
        ],
        where: {
            id: userId,
        },
        raw: true
    });

    return User;
}