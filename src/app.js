const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const staticpath = path.join(__dirname, "../public")



app.use(express.static(staticpath))


//Routes
app.get('/add/:id', function (req, res) {

    const id = req.params.id

    const data = loadJSON(`${staticpath}/data.json`);


    function loadJSON(filename = '') {
        return JSON.parse(
            fs.existsSync(filename)
                ? fs.readFileSync(filename).toString()
                : '""'
        )
    }

    if (data.includes(id)) {
        res.send('is already added! Please Wait Before You Try Adding Yourself again :).')


    } else {

        res.send('is added in the queue!')



        function saveJSON(filename = '', json = '""') {
            return fs.writeFileSync(filename,
                JSON.stringify(json))
        }


        data.push(id)
        saveJSON(`${staticpath}/data.json`, data)
    }


});
//Listening
app.listen(3000);
