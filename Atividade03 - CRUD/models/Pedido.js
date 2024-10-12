// ORM - Sequelize - Importando o Sequelize
import { Sequelize } from "sequelize";

// Configuração do Sequelize
import connection from "../config/sequelize-config.js";
 
// .define cria a tabela no banco
const Pedido = connection.define("pedidos", {
  numero: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  nome:{
    type: Sequelize.STRING,
    allowNull: false
  },

  valor: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Não forçar a criação da tabela caso ela já exista
Pedido.sync({ force: false });
export default Pedido;
 
