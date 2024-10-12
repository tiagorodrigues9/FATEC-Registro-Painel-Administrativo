//importando sequelize
import  Sequelize  from "sequelize";
 
//criando os dados de conexao com o bd
const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '25183030Atdf!', //alunos deixem a senha em branco
    database: 'loja',// comentem essa linha na primeira execucao da aplicacao
    timezone: '-03:00',
    logging: false
})
//todo modo precisa ser exportado, entao:
export default connection;