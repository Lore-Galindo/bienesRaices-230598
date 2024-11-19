import { DataTypes } from 'sequelize'
import db from '../db/config.js'
//import { data } from 'autoprefixer'
import bcrypt from 'bcrypt'

const User = db.define('Users',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
},{
    hooks: {
        beforeCreate: async function (user) {
            const salt = await  bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
}) 



export default User;