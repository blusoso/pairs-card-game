const bcrypt = require('bcrypt');

const data = {
    users: [
        {
            name: 'admin',
            email: 'admin@admin.com',
            password: bcrypt.hashSync('123456', 8),
            best_score: 23,
        },
    ],
}

module.exports = data;
