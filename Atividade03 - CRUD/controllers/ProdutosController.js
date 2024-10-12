import express from "express";

const router = express.Router();

//Importando o Produto da pasta Model
import Produto from "../models/Produto.js";
 
// Rota Produtos
router.get("/produtos", function (req, res) {
    Produto.findAll().then(produtos => {
  res.render("produtos", {
    produtos: produtos,
  });
});
});

// Rota de cadastro de produtos
router.post("/produtos/new",(req,res) => {
 
    // Recebendo os dados e gravando nas variáveis
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

// Rota de exclusão de produtos
// Essa rota possui um parâmetro ID
router.get("/produtos/delete/:id", (req,res) => {
 
    // Coletar o ID que veio da URL
    const id = req.params.id
 
    // Método para excluir
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

// Rota de edição de produtos
router.get("/produtos/edit/:id", (req, res) => {
    const id = req.params.id;
    Produto.findByPk(id).then((produto) => {
      res.render("produtoEdit", { produto : produto });
    }).catch((error) =>{
      console.log(error)
    })
  });
  
  // Rota de alteração de produtos
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

// Todos devem ser exportados
export default router;
 

