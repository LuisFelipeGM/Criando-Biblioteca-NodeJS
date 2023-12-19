import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : "não há links no arquivo!";
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, "não há arquivo no diretório"));
}

// Promises com then()
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro); // Como o catch já retorna um callback (chamada de outra função) 
//         // podemos passar direto o nosso tratamento de erro que ele passa o parametros por de baixo dos panos
//         //.catch((erro) => trataErro(erro)); // Pode se utilizar dessa forma passando uma arrow function com um call back
// }

// async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    }
}

export default pegaArquivo;