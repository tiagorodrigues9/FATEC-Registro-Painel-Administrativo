import express from "express";
const router = express.Router();
//IMPORTANDO O MODEL DO PRODUTO
import Produto from "../models/Produto.js";
 
// ROTA PRODUTOS
router.get("/produtos", function (req, res) {
    Produto.findAll().then(produtos => {
  res.render("produtos", {
    produtos: produtos,
  });
});
});
// ROTA DE CADASTRO DE PRODUTOS
router.post("/produtos/new",(req,res) => {
    // RECEBENDO OS DADOS DO FORMULARIO E GRAVANDO NAS VARIÁVEIS
    const nome = req.body.nome
    const preco = req.body.preco
    const categoria = req.body.categoria
    Produto.create({
        nome :  nome,
        preco : preco,
        categoria : categoria,
    }).then(() => {
        res.redirect("/produtos")
    })
})
// ROTA DE EXCLUSAO DE PRODUTO
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/produtos/delete/:id", (req,res) => {
    // COLETAR O ID QUE VEIO DA URL
    const id = req.params.id
    // METODO PARA EXCLUIR
    Produto.destroy({
        where: {
            id : id
        }
    }).then(() =>{
        res.redirect("/produtos")
    }).catch(error => {
        console.log(error)
    })
})

// rota de edicao de produto
router.get("/produtos/edit/:id", (req, res) => {
    const id = req.params.id;
    Produto.findByPk(id).then((produto) => {
      res.render("produtoEdit", { produto : produto });
    }).catch((error) =>{
      console.log(error)
    })
  });
  
  // ROTA DE ALTERAÇÃO DE PRODUTO
  router.post("/produtos/update/", (req, res) => {
      const id = req.body.id
      const nome = req.body.nome
      const preco = req.body.preco
      const categoria = req.body.categoria
      Produto.update({
          nome : nome,
          preco : preco,
          categoria : categoria
      },
      {where: {id : id}}
      ).then(() => {
          res.redirect("/produtos");
      }).catch((error) => {
          console.log(error)
      })
  })
 
export default router;
 

