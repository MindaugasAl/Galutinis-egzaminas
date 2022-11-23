import { DataTypes } from 'sequelize'

const Posts = (sequelize) => {
    const Schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },

        content: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        }
    }

    return sequelize.define('posts', Schema)
}

export default Posts