
import { async } from "regenerator-runtime"
import {  TIMEOUT_SEC } from "../confige";


const timeout = function (s) {
        return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
        });
    };

export const getJeson= async function(url){
    try{
        const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC * 1000)]) ;
        const data = await res.json();
        if (!data) throw new Error(`${data.data.message} data not found'`);
        return data;
        
    }catch(err){
        throw err
    }
}
export const setJeson= async function(url,newRecipe){
    try{
        const res = await Promise.race([fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
        }),timeout(TIMEOUT_SEC * 1000)]) ;
        const data = await res.json();
        if (!data) throw new Error(`${data.data.message} data not found'`);
        return data;
    }catch(err){
        throw err
    }
}

