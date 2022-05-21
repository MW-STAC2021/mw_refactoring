module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '정보 고유 ID',
        },
        category: {
            type: DataTypes.STRING(6),
            allowNull: false,
            comment: '정보 분류 - 여성 정보, 생활 정보',
        },
        category_icon: {
            type: DataTypes.STRING(2),
            allowNull: false,
            comment: '정보 분류에 따른 아이콘',
        },
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
            comment: '정보 제목',
        },
        thumbnail_path: {
            type: DataTypes.STRING(9),
            allowNull: false,
            comment: '정보 대표 이미지 경로',
        },
        content_path: {
            type: DataTypes.STRING(9),
            allowNull: false,
            comment: '정보 내용 경로',
        },
        inside_img_path: {
            type: DataTypes.STRING(9),
            comment: '정보 상세 이미지 경로',
        }
    }, {
        charset: 'utf8',
        collate: "utf8_general_ci",
        tableName: 'Post'
    });
    
    return Post;
};