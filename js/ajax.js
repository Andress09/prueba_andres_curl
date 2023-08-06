$(document).ready(function() {


    function init() {
        $("#loading").hide();
        $.ajax({
            url:'server/redditData.php',
            type:"GET",
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            beforeSend: function() {
                const alert = crearAlert('info', 'Cargando datos de Reddit...');
                $('#alert-content').html(alert);
            },        
            success: function(data){
                let content = '';
                data.data.children.forEach((elemento, index) => {
                    content += crearContenido(elemento, index);
                });
                $("#cards-content").html(content);

            },
            error: function(xhr) { // if error occured
                const alert = crearAlert('danger', 'Error al cargar la data');
                $('#alert-content').html(alert);
            },            
            complete: function() {
                $('#alert-content').html('');
            },        
        })
    }

    function crearAlert(type, msg) {
        return `<div class="alert alert-${type}" role="alert">
                    ${msg}
                </div>`
    }

    function crearContenido(elemento, index){
        const img = elemento.data.header_img ? `<img src="${elemento.data.header_img}" class="small-image">` : '';
        return `<div class="col-sm-12 mt-2">
                    <div class="card border-primary">
                        <div class="card-header">
                            <div class="fw-bold fs-6"> ${elemento.data.display_name}</div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${elemento.data.public_description} ${img}</p>
                            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${index}" aria-expanded="false" aria-controls="collapseExample">
                                Ver descripci&oacute;n
                            </button>
                        </div>
                        <div class="collapse" id="collapseExample${index}">
                            <div class="card card-body">
                                ${elemento.data.description}
                            </div>
                            </div>
                        </div>
                </div>`;
    }


    init();
});