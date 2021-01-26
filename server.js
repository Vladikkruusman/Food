require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const axios = require('axios');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req, res)=>{
    //SECRET=58ce3896d1ad4888abe1263ebdab7bd3
    let urlName =`https://api.spoonacular.com/recipes/random/?apikey=${process.env.SECRET}`;
            axios.get(urlName).then(function(response){
                let recipesArr;
                recipesArr = response.data.recipes[0];
                console.log(recipesArr.analyzedInstructions[0].steps[0].ingredients); 
                res.render('recipes', {rec: recipesArr});
           /* recipesArr = response.data.recipes[0].title;
            recipesJmg = response.data.recipes[0].image;
            recipesIngredients = response.data.recipes[0].analyzedInstructions[0].steps[0].ingredients;*/
        })
        .catch(function(error){
            console.log(error);
        });
           
});

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})