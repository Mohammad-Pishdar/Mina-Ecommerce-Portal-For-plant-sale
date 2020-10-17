import express from 'express';
import data from './data.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.get('/api/items', (req, res) => {
    res.send(data.items);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
