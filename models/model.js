import { logger } from '../config/logger.js';
import dayjs from 'dayjs';
 
export const listAcuanVritual = async (query) => {
    try{

        let sql = `select REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(singkatan, '$', ''), ')', ''), '%', ''), ',', ''), '-', ''), '/', ''),'(','') as singkatan from m_acuan_strukol;`
        let result = await query(sql)
        console.log(sql)
        return result
    } catch (error) {
        logger.error(`Error Get Data Acuan: ${error}`)
        throw error
    }
}
export const getAdaVirtual = async (query) => {
    try{

        let table = `summary_varian_${dayjs().subtract(1,"days").format("YYYY")}`

        let sql = `select 
        cast(tanggal as char) as tanggal,kdcab,toko,jmlstruk,isistruk,isvirtual
        from ${table} 
        where 
        LEFT(tanggal,7) = '${dayjs().subtract(14,"days").format("YYYY-MM")}'
        and ifnull(jmlStruk,0) > 0
        AND ifnull(nilaiStruk,0) > 0 
        and (isvirtual is null OR isvirtual ='');
        `

        let result = await query(sql)
        console.log(sql)
        return result
    } catch (error) {
        console.log(error)
        logger.error(`Error Get Data Acuan: ${error}`)
        throw error
    }
}


export const updateData = async (query,data) => {
    try{

        let table = `summary_varian_${dayjs().subtract(1,"days").format("YYYY")}`

        let sql =`UPDATE ${table} set isvirtual = 1 where concat(kdcab,toko,tanggal)
            in(${data.join(",")}); 
        `
        let result = await query(sql)

        return result
    } catch (error) {
        logger.error(`Error Get Data Acuan: ${error}`)
        throw error
    }
}
export const updateDataGagal = async (query,data) => {
    try{

        let table = `summary_varian_${dayjs().subtract(1,"days").format("YYYY")}`

        let sql =`UPDATE ${table} set isvirtual = 0 where concat(kdcab,toko,tanggal)
            in(${data.join(",")}); 
        `
        let result = await query(sql)

        return result
    } catch (error) {
        logger.error(`Error Get Data Acuan: ${error}`)
        throw error
    }
}

