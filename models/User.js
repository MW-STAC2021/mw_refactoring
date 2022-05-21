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
        },
        join_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now,
            comment: '회원 가입 날짜',
        }
    }, {
        charset: 'utf8',
        collate: "utf8_general_ci",
        tableName: 'User'
    });

    return User;
}