const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());
const PORT = 3000;

app.get('/validar',

    // 📅 Validador de data (body)
    body('data')
        .isISO8601().withMessage('Data inválida (use YYYY-MM-DD)')
        .custom((value) => {
            const hoje = new Date();
            const data = new Date(value);

            hoje.setHours(0, 0, 0, 0);
            data.setHours(0, 0, 0, 0);

            const limite = new Date();
            limite.setDate(hoje.getDate() + 30);

            if (data <= hoje) {
                throw new Error('A data deve ser maior que hoje');
            }

            if (data > limite) {
                throw new Error('A data deve ser menor que 30 dias à frente');
            }

            return true;
        }),

    // 🧾 Validador de CPF (body)
    body('cpf')
        .custom((cpf) => {
            cpf = cpf.replace(/[^\d]+/g, '');

            if (cpf.length !== 11) {
                throw new Error('CPF inválido');
            }

            if (/^(\d)\1+$/.test(cpf)) {
                throw new Error('CPF inválido');
            }

            let soma = 0;
            let resto;

            for (let i = 1; i <= 9; i++) {
                soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }

            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) resto = 0;

            if (resto !== parseInt(cpf.substring(9, 10))) {
                throw new Error('CPF inválido');
            }

            soma = 0;

            for (let i = 1; i <= 10; i++) {
                soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }

            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) resto = 0;

            if (resto !== parseInt(cpf.substring(10, 11))) {
                throw new Error('CPF inválido');
            }

            return true;
        }),

    (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        return res.send('ok');
    }
);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/validar`);
});