import database from '../../database/database.js';

function insert(body, keys, table) {
    let columns = "";
    let endValues = ``;
    for (let i = 0; i < keys.length; i++) {
        body[keys[i]] = body[keys[i]].replace(/"/g, "'");
        if (i < keys.length - 1) {
            columns += keys[i] + ", ";
            endValues += `"${body[keys[i]]}",`;
        } else {
            columns += keys[i];
            endValues += `"${body[keys[i]]}"`;
        }
    }

    let query = `INSERT INTO ${table}(${columns}) VALUES(${endValues});`;
    database.all(query, err => {
        console.log(err)
    });
        
}



export default insert;