require('dotenv').config();

const connect = () => {
    return require('mongoose').connect(process.env.DATABASE_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
}

module.exports = connect;