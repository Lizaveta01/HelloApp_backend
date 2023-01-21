import express from 'express';
import mysqli from 'mysql';

const app = express();
app.listen('4000', () => {
    console.log('Server listening on port 4000');
})

