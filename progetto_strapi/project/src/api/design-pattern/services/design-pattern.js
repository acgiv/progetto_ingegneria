'use strict';

/**
 * design-pattern service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::design-pattern.design-pattern');

module.exports = createCoreService('api::design-pattern.design-pattern', ({ strapi }) => ({

    async ricerca(nome, filtro){
        let rspost;
        switch(filtro){
            case "Pattern":
                    rspost = this.setPattern(await strapi.db.query('api::design-pattern.design-pattern').findOne({
                       populate: ["mvcs","stato", "articolos","iso_92_4210s","strategias", "vulnerabilitas", "principi_pbds", "categoria_owasps"], 
                       where: { 
                           titolo: {$eq: nome} 
                       }
                       }));      
                      
                break;
            case "Articolo GDPR":

            rspost = await strapi.db.query('api::articolo.articolo').findOne({
                populate: ["stato"], 
                where: { 
                  id_articolo: Number(nome)
                }
                });
            
                break;
            case "Mvc":
                rspost = this.setMvc(await strapi.db.query('api::design-pattern.design-pattern').findOne({
                    populate: ["mvcs", "stato"], 
                    where: { 
                        titolo: {$eq: nome} 
                    }
                    }));
                break;
            case "Principi":
                rspost = this.setPrincipi( await strapi.db.query('api::design-pattern.design-pattern').findOne({
                    populate: ["principi_pbds", "stato"], 
                    where: { 
                        titolo: {$eq: nome} 
                    }
                }));
                break;    
            case "Vulnerabilità":
                rspost = this.setVulnerabilita(await strapi.db.query('api::design-pattern.design-pattern').findOne({
                    populate: ["vulnerabilitas", "categoria_owasps", "stato"], 
                    where: { 
                        titolo: {$eq: nome} 
                    }
                    })); 
                break;  
            case "ISO 92-4210":
                rspost =  this.setIso( await strapi.db.query('api::design-pattern.design-pattern').findOne({
                    populate: ["iso_92_4210s", "stato"], 
                    where: { 
                        titolo: {$eq: nome} 
                    }
                    }));
                break;  
            case "Strategia":
                console.log(nome);   
                rspost =  this.setStrategia( await strapi.db.query('api::design-pattern.design-pattern').findOne({
                    populate: ["strategias", "stato"], 
                    where: { 
                        titolo: {$eq: nome} 
                    }
                    }));
                break;  
            default:
                rspost = "Non é stato trovata nessuna informazione";
                break;
    }
    if(rspost)  {
        return rspost;
    }else {
        return   "Non é stato trovata nessuna informazione";
    } 

    },

 setPattern(entries) {
        return  {
            id_pattern: entries.id_pattern,
            descrizione: entries.descrizione,
            titolo: entries.titolo,
            contesto: entries.contesto,
            esempio: entries.esempio,
            stato: [entries.stato.id_stato, entries.stato.nome],
            iso_92_4210: entries.iso_92_4210s,
            strategia: entries.strategias,
            vulerabilita:  entries.vulnerabilitas,
            principi_pbd:  entries.principi_pbds,
            mvc: entries.mvcs,
            articoli: entries.articolos,
            categoria_owasps: entries.categoria_owasps
          }
    },
    setPattern(entries) {
        return  {
            id_pattern: entries.id_pattern,
            descrizione: entries.descrizione,
            titolo: entries.titolo,
            contesto: entries.contesto,
            esempio: entries.esempio,
            stato: [entries.stato.id_stato, entries.stato.nome],
            iso_92_4210: entries.iso_92_4210s,
            strategia: entries.strategias,
            vulerabilita:  entries.vulnerabilitas,
            principi_pbd:  entries.principi_pbds,
            mvc: entries.mvcs,
            articoli: entries.articolos,
            categoria_owasps: entries.categoria_owasps
          }
    }, setMvc(entries) {
        return {
            id_pattern: entries.id_pattern,
            descrizione: entries.descrizione,
            titolo: entries.titolo,
            mvc: entries.mvcs,
        }
    },
    setIso(entries) {
        return {
            id_pattern: entries.id_pattern,
            descrizione: entries.descrizione,
            titolo: entries.titolo,
            iso_92_4210: entries.iso_92_4210s,
        }
    },
    setPrincipi(entries) {
        return {
            id_pattern: entries.id_pattern,
            descrizione: entries.descrizione,
            titolo: entries.titolo,
            principi_pbd:  entries.principi_pbds,
        }
    },
    setStrategia(entries) {
        return {
            id_pattern: entries.id_pattern,
            descrizione: entries.descrizione,
            titolo: entries.titolo,
            strategia: entries.strategias,
        }
    },
    setVulnerabilita(entries) {
        return {
            id_pattern: entries.id_pattern,
            descrizione: entries.descrizione,
            titolo: entries.titolo,
            vulerabilita:  entries.vulnerabilitas,
            categoria_owasps: entries.categoria_owasps
        }
    }
}));