//  Recebe o caminho para ad funções que serão utilizadas
const codigoValidacao = require('./Validacao');
const codBarra = require('./CodigoBarra');

//  Função principal
exports.codigoInputConvenio = (codigo) => {

    //  Variavel que ira receber as informações
    var info = [];
    
    //  Verifica se a linha digitada é valido
    if (codigoValidacao.codigoValidacao(codigo)) {

        //  Caso a linha seja valida obtem o codigo de barra e o retorna
        info = codBarra.codBarra(codigo);
        return info;

    } else {
        
        //  Caso a linha não seja valida retorna essa informação
        info.push({ "Linha digitada": "Invalida" });
        return info;
    };
};