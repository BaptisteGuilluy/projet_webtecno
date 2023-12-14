import Tele from './models/Tele.js';
import express from 'express';

const app = express();
app.use(express.static("public"));

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));


app.use(express.static('public'));

app.get("/", async function (req, res) {
  const televisions_liste = await Tele.loadMany({pascasse:0});
  const possedé = await Tele.loadMany({pascasse : 1})
  res.render('home.ejs', { televisions_liste,possedé });
});

app.post("/add", async function (req, res) {
    const televisions = new Tele();
    televisions.marque = req.body.marque;
    televisions.prix = parseInt(req.body.prix);
    televisions.taille = parseInt(req.body.taille);
    televisions.achetée = 0;
    await televisions.save();
    res.redirect('/');
});
app.post("/buy", async function (req, res) {
  const televisions = await Tele.load({id : req.body.id_tele})
  televisions.update({pascasse : 1});
  televisions.update({casse : 0})
  await televisions.save();
  res.redirect('/');
});

app.post("/broke", async function (req, res) {
  const televisions = await Tele.load({id : req.body.id_tele})
  televisions.update({casse : 1});
  televisions.update({raisoncasse : req.body.raisoncasse})
  await televisions.save();
  res.redirect('/');
});

app.listen(3000, function(){
    console.log("Server ok");
});




