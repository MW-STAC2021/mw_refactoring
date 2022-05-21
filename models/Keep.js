module.exports = (sequelize, DataTypes) => {
    const Keep = sequelize.define("Keep", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '즐겨찾기 고유 ID',
        },
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

        models.Keep.belongsTo(models.Post, {
            foreignKey: 'post_id',
            sourceKey: 'id'
        });
    };

    return Keep;
}