import { DataTypes } from 'sequelize'
import db from '../db/config.js'
//import { data } from 'autoprefixer'

const Users = db.define('tbb_users',{
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
})

export default Users;