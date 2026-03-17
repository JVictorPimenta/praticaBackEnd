const express = require('express');
const {body, validationResult} = require('express-validator');
const app = express();

app.use(express.json());
const PORT = 3000;

app.get('/hello',
     body('email').isEmail().withMessage("E-mail inválido"), 
     body('password').isLength({min: 6, max:8}).withMessage('permitido entre 6 e 8 caracteres'),
    (req, res) => {

    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        return res.send({errors: result.array()});
    }

    // retornar erro para aplicação

    return res.send('ok');
});

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
});