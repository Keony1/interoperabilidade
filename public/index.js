window.onload = function () {
    const form = document.getElementById('main_form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let url = document.querySelector('#input').value;
        
        const response = await axios.post('http://localhost:3333/', {
            url: url
        });
    
        const { Layer } = response.data.WMS_Capabilities.Capability[0].Layer[0];
        
        let divLayer = document.querySelector(".div_layers");
        divLayer.innerHTML = '';

        feedLayerSelect(divLayer, Layer);
    });

    document.addEventListener('change', async (e) => {
        if(e.target && e.target.id == 'select') {
            let url = document.querySelector('#input').value;
            let select = e.target;
            let name = select.value;
            let crs = select.options[select.selectedIndex].getAttribute('data-crs');
            let minx = select.options[select.selectedIndex].getAttribute('data-minx');
            let miny = select.options[select.selectedIndex].getAttribute('data-miny');
            let maxx = select.options[select.selectedIndex].getAttribute('data-maxx');
            let maxy = select.options[select.selectedIndex].getAttribute('data-maxy');
                
            let img = document.querySelector('#img');
            img.src = `${url}/service=wms?request=getMap&WIDTH=400&HEIGHT=400&crs=${crs}&bbox=${minx},${maxx},${miny},${maxy}&format=image%2Fpng&layers=${name}`;
        }
    });

};

function feedLayerSelect(div, layer) {
    let select = document.createElement("select");
    select.setAttribute("id", "select");
    
    layer.forEach((item, index)=> {
        let {minx, miny, maxx, maxy } = item.BoundingBox[0].$;
        let crs = item.CRS[1];
        let option = document.createElement('option');

        option.text  = item.Title[0];
        option.value = item.Name[0];
        option.setAttribute("data-bbox", `dota`);
        option.setAttribute("data-crs",  `${crs}`);
        option.setAttribute("data-minx", `${minx}`);
        option.setAttribute("data-miny", `${miny}`);
        option.setAttribute("data-maxx", `${maxx}`);
        option.setAttribute("data-maxy", `${maxy}`);


        select.appendChild(option);
    });

    div.appendChild(select);
}
