import database from '../../database/database.js';

function getData(sites, query){
    return new Promise(resolve=>{
        database.all(query,[],(err,rows)=>{
            if(err){
                return console.error(err.message);
            }
            rows.forEach((row)=>{
                sites.push(row);
            });
            resolve(sites);
        });
    });
}

export default getData;