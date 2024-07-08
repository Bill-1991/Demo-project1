import database from '../../database/database.js';

function getIds(ids, query) {
    return new Promise(resolve=>{
        database.all(query,[],(err,rows)=>{
            if(err){
                return console.error(err.message);
            }
            rows.forEach((row)=>{
                ids.push(row);
            });
            resolve(ids);
        });
    });
}



export default getIds;