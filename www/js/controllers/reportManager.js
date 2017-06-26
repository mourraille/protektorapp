/**
 * Created by Josue on 14/6/2017.
 */
var reportes = [];
var reportesViejos = [];
var R = 6378.137; //Radio de la tierra en km

function VerReportes() {
    var req = $.ajax({
        url: 'http://apiprotektor2.azurewebsites.net/api/Reporte/VerReporres?callback=?',
        timeout: 10000
    });
    req.success(function (datos) {
        if(reportes.length != 0){
            reportesViejos = [];
            reportesViejos = reportes;
            guardarReportes(datos);
            guardarReportesNuevos();
        } else {
            guardarReportes(datos);
        }
    });
    req.error(function () {
        alert("Error el cargar los datos");
    });
}

function guardarReportes(datos) {
    reportes = [];
    $.each(datos, function () {
        var reporte = {Checks: this.Checks, CorreoUsuario: this.CorreoUsuario ,Descripcion: this.Descripcion, Fecha: this.Fecha,
            Id: this.Id, Latitud: this.Latitud, Longitud: this.Longitud, Raking: this.Raking,
            Tipo: this.Tipo, URLFoto: this.URLFoto};

        reportes.push(reporte);
    });
    FiltrarReportes(1,1,20);
    localStorage.setItem('Reportes', JSON.stringify(reportes));
    var r = JSON.parse(localStorage.getItem('Reportes'));
}

function guardarReportesNuevos() {
    var reportesNuevos = [];
    for (var i = 0; i < reportes.length; i++) {
        var nuevo = true;
        for(var j = 0; j < reportesViejos.length; j++){
            if(reportes[i].Id == reportesViejos[j].Id){
                nuevo = false;
            }
        }
        if(nuevo){
            reportesNuevos.push(reportes[i]);
        }
    }
    if(reportesNuevos.length > 0 ){
        alert("Tiene " + reportesNuevos.length + " reportes nuevos");
    }
    localStorage.setItem('ReportesNuevos', JSON.stringify(reportesNuevos));
    var r = JSON.parse(localStorage.getItem('ReportesNuevos'));
}

function FiltrarReportes(miLatitud, miLongitud, radio) {
    var reportesFiltrados = [];
    miLatitud = localStorage.getItem('lat');
    miLongitud = localStorage.getItem('lon');
    miLatitud = parseFloat(miLatitud);
    miLongitud = parseFloat(miLongitud);

    for (var i = 0; i < reportes.length; i++) {
 
        var lat = reportes[i].Latitud.replace(',','.');
        var long = reportes[i].Longitud.replace(',','.');
        var rLat = parseFloat(lat);
        var rLon = parseFloat(long);

        var distancia = ObtenerDistancia(miLatitud, miLongitud, rLat, rLon);
        if (distancia <= radio) {
            reportesFiltrados.push(reportes[i]);
        }
    }
    reportes = reportesFiltrados;
}

//***Métodos para calcular la distancia entre dos puntos***//
function rad(x)
{
    return x * Math.PI / 180;
}
function ObtenerDistancia(miLat, miLon, rLat, rLon)
{
    var dLat = rad(rLat - miLat);
    var dLong = rad(rLon - miLon);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(miLat)) * Math.cos(rad(rLat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}
//************************************************************//

setInterval("VerReportes()",30000);