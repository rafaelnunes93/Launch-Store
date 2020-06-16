const Base = require('./Base');
const { hash } = require('bcryptjs')
const db = require('../../config/db')

Base.init({table: 'categories'})

module.exports = {
   ...Base,

}