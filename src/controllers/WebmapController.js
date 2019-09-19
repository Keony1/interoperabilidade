const axios = require('axios');
const parser = require('xml2js').parseString;

module.exports = {
    async find(req, res) {
        const { url } = req.body;
        
        let xmlToJson = {};
        await axios.get(`${url}/service=wms?request=getCapabilities`)
            .then(response => {

                parser(response.data, function(err, result) {
                    xmlToJson = result;
                })
            })
            .catch(err => console.log(err));
            
        res.json(xmlToJson);
    },
}