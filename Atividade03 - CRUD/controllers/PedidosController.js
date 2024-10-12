import express from "express";

const router = express.Router();

// Importando Pedido do Model
import Pedido from "../models/Pedido.js";
 
// Rota Pedidos
router.get("/pedidos", function (req, res) {
    Pedido.findAll().then(pedidos => {
  res.render("pedidos", {
    pedidos: pedidos,
  });
});
});

// Rota de Cadastro de Clientes
router.post("/pedidos/new",(req,res) => {
 
    // Recebendo os dados do formulário e gravando nas variáveis
    const numero = req.body.numero
    const nome = req.body.nome
    const valor = req.body.valor
    Pedido.create({
        numero :  numero,
        nome: nome,
        valor : valor,
    }).then(() => {
        res.redirect("/pedidos")
    })
})

// Rota de exclusão de pedidos
// Essa rota possui um parâmetro ID
router.get("/pedidos/delete/:id", (req,res) => {
 
    // Coletar o ID que veio da URL
    const id = req.params.id
 
    // Método para excluir
    Pedido.destroy({
        where: {
            id : id
        }
    }).then(() =>{
        res.redirect("/pedidos")
    }).catch(error => {
        console.log(error)
    })
})
 
// Rota de edição de pedidos
router.get("/pedidos/edit/:id", (req, res) => {
 
    const id = req.params.id;
    Pedido.findByPk(id).then((pedido) => {
      res.render("pedidoEdit", { pedido : pedido });
    }).catch((error) =>{
      console.log(error)
    })
  });
  
  // Rota de alteração de pedidos
  router.post("/pedidos/update/", (req, res) => {
   
      const id = req.body.id
      const numero = req.body.numero
      const nome = req.body.nome
      const valor = req.body.valor
      Pedido.update({
          numero : numero,
          nome: nome,
          valor : valor
      },
      {where: {id : id}}
      ).then(() => {
          res.redirect("/pedidos");
      }).catch((error) => {
          console.log(error)
      })
  })

// Todos devem ser exportados
export default router;
 

