import { DataTypes } from 'sequelize'

const Posts = (sequelize) => {
    const Schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
    }

    return sequelize.define('posts', Schema)
}

export default Posts