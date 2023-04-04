///TODO CHANGE DB NAME !!!!

const config = {
    production: {
        PORT: 1245,
    },
    development: {
        PORT: 3030,
    }
}

module.exports = config[process.env.node_ev || 'development']