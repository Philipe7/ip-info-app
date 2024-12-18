import express from 'express'; 
import fetch from 'node-fetch'; 
import cors from 'cors'; 

const app = express();
const PORT = 3000;
const TOKEN = '52a28f54b6145a';

app.use(cors());

app.get('/ipinfo/:ip', async (req, res) => {
    const ip = req.params.ip;
    const url = `https://ipinfo.io/${ip}/json?token=${TOKEN}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar informações do IP' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
