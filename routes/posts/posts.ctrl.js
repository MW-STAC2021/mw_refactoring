const sequelize = require('sequelize');
const {
    User,
    Keep
} = require('../../models');
const models = require('../../models');
const Op = sequelize.Op;

exports.getPosts = async (req, res) => {
    try {
        let data = [];
        if (req.query.keyword) {
            data = await models.Post.findAll({
                where: {
                    title: {
                        [Op.like]: '%' + req.query.keyword + '%'
                    }
                }
            });
        } else {
            const category = req.query.category || null;
            if (category) {
                data = await models.Post.findAll({
                    where: {
                        category: category
                    }
                });
            } else {
                data = await models.Post.findAll({});
            }

        }

        return res.status(200).json({
            data
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "서버 오류",
        });
    }
}

exports.getPost = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await models.Post.findOne({
            where: {
                id: id
            }
        });

        if (!data) {
            return res.status(404).json({
                message: '글이 존재하지 않습니다.'
            });
        }

        return res.status(200).json({
            data
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "서버 오류",
        });
    }
}

exports.keep = async (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;

    try {
        const existUser = await models.User.findOne({
            where: {
                id: userId
            }
        });
        if (!existUser) {
            return res.status(404).json({
                message: "계정이 존재하지 않습니다.",
            });
        }
        const existPost = await models.Post.findOne({
            where: {
                id: postId
            }
        });
        if (!existPost) {
            return res.status(404).json({
                message: "글이 존재하지 않습니다.",
            });
        }
        const existKeep = await models.Keep.findOne({
            where: {
                user_id: userId,
                post_id: postId
            }
        });

        if (existKeep) {
            await models.Keep.destroy({
                where: {
                    user_id: userId,
                    post_id: postId
                },
                force: true
            });
            return res.status(200).json({
                message: "즐겨찾기에서 삭제했습니다.",
            });
        } else {
            await models.Keep.create({
                user_id: userId,
                post_id: postId
            });
            return res.status(200).json({
                message: "즐겨찾기에 추가했습니다.",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: '서버 오류'
        });
    }
}

exports.getkeeps = async (req, res) => {
    const userId = req.params.userId;
    console.log("userId ", userId)
    try {
        const existUser = await models.User.findOne({
            where: {
                id: userId
            }
        });
        if (!existUser) {
            return res.status(404).json({
                message: "계정이 존재하지 않습니다.",
            });
        }
        const data = await models.Keep.findAll({
            attributes: [],
            where: {
                user_id: userId,
            },
            include: [{
                model: models.Post,
                attributes: [
                    'id',
                    'category',
                    'title',
                    'thumbnail_path'
                ],
                required: true,

            }]
        });
        return res.status(200).json({
            data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: '서버 오류'
        });
    }
}