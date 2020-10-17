import express from 'express';
import data from './data.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.get('/api/items', (req, res) => {
    res.send(data.items);
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
