// ORM - Sequelize - Importando o Sequelize
import { Sequelize } from "sequelize";

// Configuração do Sequelize
import connection from "../config/sequelize-config.js";
 
// .define cria a tabela no banco
const Produto = connection.define("produtos", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  preco: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Não forçar a criação da tabela caso ela já exista
Produto.sync({ force: false });
export default Produto;
 
