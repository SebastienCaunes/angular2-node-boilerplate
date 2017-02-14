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
        defaultFromAddress: 'Default sender<email@domain.com>'
    },
    contactEmail: 'email@domain.com'
};
