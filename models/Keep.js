module.exports = (sequelize, DataTypes) => {
    const Keep = sequelize.define("Keep", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '즐겨찾기 고유 ID',
        },
        create_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now,
            comment: '즐겨찾기 추가 시간'
        }
    }, {
        charset: 'utf8',
        collate: "utf8_general_ci",
        tableName: 'Keep'
    });

    Keep.associate = models => {
        models.Keep.belongsTo(models.User, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });

        models.Keep.belongsTo(models.Information, {
            foreignKey: 'info_id',
            sourceKey: 'id'
        });
    };

    return Keep;
}