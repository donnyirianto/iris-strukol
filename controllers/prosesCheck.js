import { listAcuanVritual,getAdaVirtual,updateData } from '../models/model.js';
import { logger } from '../config/logger.js';

const cekIsVirtual = async (listAcuanVritual,data) => {
  try {

      let hasil = []
      for(let i of listAcuanVritual){
          let datastring = data.isistruk.replace(/\//g, '')   // Replace all occurrences of '/'
          .replace(/,/g, '')    // Replace all occurrences of ','
          .replace(/-/g, '')    // Replace all occurrences of '-'
          .replace(/%/g, '')    // Replace all occurrences of '%'
          .replace(/\$/g, '')   // Replace all occurrences of '$'
          .replace(/\)/g, '')   // Replace all occurrences of ')'
          .replace(/\(/g, '');  // Replace all occurrences of '('

          let karakter = i.singkatan.replace(/\//g, '')   // Replace all occurrences of '/'
          .replace(/,/g, '')    // Replace all occurrences of ','
          .replace(/-/g, '')    // Replace all occurrences of '-'
          .replace(/%/g, '')    // Replace all occurrences of '%'
          .replace(/\$/g, '')   // Replace all occurrences of '$'
          .replace(/\)/g, '')   // Replace all occurrences of ')'
          .replace(/\(/g, '');  // Replace all occurrences of '('

          const regex = new RegExp(karakter, "g"); 

          const matches = datastring.match(regex);
          
          if (matches) {
              //await model.updCekIsVritual(data)
              hasil.push(`'${data.kdcab}${data.toko}${data.tanggal}'`)
              break;
          }
      } 
      
      if(hasil.length === 0 ) throw new Error("Not Found")
      console.log(hasil)
      return {
        status: "Sukses",
        data: hasil
      };
  } catch (error) {
    return { status: "Gagal" };
  }
};
export const prosesCeck = async (query) => {
  try { 
    
    const acuanVir = await listAcuanVritual(query);
    const dataAdaVirtual = await getAdaVirtual(query);

    if(dataAdaVirtual.length === 0) throw new Error("Data Not Found")
    logger.info(`Proses Check Data: ${dataAdaVirtual.length}`)
    const prepareData = dataAdaVirtual.map(r => cekIsVirtual(acuanVir,r));
    const dataCache = await Promise.allSettled(prepareData);
    let dataResult = dataCache.filter(r => r.status === 'fulfilled').map(r => r.value);
        dataResult = dataResult.filter(r => r.status === 'Sukses')
    if(dataResult.length === 0) throw new Error("Data Result Not Found")

    dataResult = dataResult.map(r => r.data).flat()
    
    await updateData(query,dataResult)
    
    logger.info(dataResult)
    logger.info("Sukses")

    return
    
  } catch (error) {
    logger.info(`No Action: ${error}`); 
  }
};