'use strict';

module.exports = {
    db: 'mongodb://localhost/db-clean',
    app: {
        name: 'app-dev'
    },
    mailer: {
        service: 'Gmail',
        auth: {
            user: 'john',
            pass: 'foo'
        },
        defaultFromAddress: 'La MAM\'Oz<laadmin31@gmail.com>'
    },
    contactEmail: 'lightplay8@gmail.com'
};
