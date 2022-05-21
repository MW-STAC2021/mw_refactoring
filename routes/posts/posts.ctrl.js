const sequelize = require('sequelize');
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