const express = require('express');
const zsign = require('./build/Release/zsign');

const app = express();

app.get('/sign', (req, res) => {
    const result = zsign.signIPA();
    res.send(result);
});

app.post('/sign', (req, res) => {
    const { ipaPath, cert, mobileProvision } = req.body;

    signIPA(ipaPath, cert, mobileProvision, (output) => {
        res.send(output);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
