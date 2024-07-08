import database from '../../database/database.js';

function deleteRow(table, id) {
    const query = `DELETE FROM ${table} WHERE id=${id}`;
    database.all(query, err => {
        console.log(err)
    });
}


export default deleteRow;