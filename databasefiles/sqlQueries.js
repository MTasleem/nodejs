sqlQueries = {
    Get_All_Data: 'select * from userDetail;',
    insert_data: 'INSERT INTO loginCredential set ?',
    insert_user_data: 'INSERT INTO userDetail set ?',
    showTable:'select * from userDetail',
    server: {
        port: '8080'
    },

    error: {
        generic: {
            error: 'Ocorreu um erro durante o processamento'
        }
    }

}

module.exports = sqlQueries;