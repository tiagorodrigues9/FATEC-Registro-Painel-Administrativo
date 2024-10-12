import express from "express";
const router = express.Router();
//IMPORTANDO O MODEL DO PEDIDO
import Pedido from "../models/Pedido.js";
 
// ROTA PEDIDOS
router.get("/pedidos", function (req, res) {
    Pedido.findAll().then(pedidos => {
  res.render("pedidos", {
    pedidos: pedidos,
  });
});
});
// ROTA DE CADASTRO DE PEDIDOS
router.post("/pedidos/new",(req,res) => {
    // RECEBENDO OS DADOS DO FORMULARIO E GRAVANDO NAS VARIÁVEIS
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
// ROTA DE EXCLUSAO DE PEDIDO
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/pedidos/delete/:id", (req,res) => {
    // COLETAR O ID QUE VEIO DA URL
    const id = req.params.id
    // METODO PARA EXCLUIR
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
 
// rota de edicao de PEDIDO
router.get("/pedidos/edit/:id", (req, res) => {
    const id = req.params.id;
    Pedido.findByPk(id).then((pedido) => {
      res.render("pedidoEdit", { pedido : pedido });
    }).catch((error) =>{
      console.log(error)
    })
  });
  
  // ROTA DE ALTERAÇÃO DE PEDIDO
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
export default router;
 

