$(document).ready(function(){
  $.ajax({
    headers: { 'X-Auth-Token': '24a095f69ea74c9883c95d17c173198c' },
    url: 'http://api.football-data.org/v1/competitions',
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    //Llenando el listado de ligas
    var listaLiga = document.getElementById('listaLiga');
    for (var i = 0; i < response.length; i++) {
      listaLiga.innerHTML += "<option value='"+response[i].id+"'>"+response[i].caption+"</option>";
    }
    var liga = document.getElementById('listaLiga').value;
    cargarEquipos(liga);
    console.log(response);
  });
});

$('#listaLiga').change(function () {
  var liga = document.getElementById('listaLiga').value;
  cargarEquipos(liga);
});

function cargarEquipos(ligaChouse) {
  $.ajax({
    headers: { 'X-Auth-Token': '24a095f69ea74c9883c95d17c173198c' },
    url: 'http://api.football-data.org/v1/competitions/'+ligaChouse+'/teams',
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    //Llenando el listado de ligas
    var listaEquipo = document.getElementById('listaEquipo');
    listaEquipo.innerHTML="";
    for (var i = 0; i < response.teams.length; i++) {
      listaEquipo.innerHTML += "<option value='"+response.teams[i]._links.players.href+"'>"+response.teams[i].name+"</option>";
    }

    var equipo = document.getElementById('listaEquipo').value;
    cargarJugadores(equipo);
  });
}


$('#listaEquipo').change(function () {
  var equipo = document.getElementById('listaEquipo').value;
  cargarJugadores(equipo);
});

function cargarJugadores(equipoChouse) {
  $.ajax({
    headers: { 'X-Auth-Token': '24a095f69ea74c9883c95d17c173198c' },
    url: equipoChouse,
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    //Llenando el listado de jugadores
    var divJugadores = document.getElementById('divJugadores');
    divJugadores.innerHTML="";
    if (response.players.length == 0) {
      divJugadores.innerHTML += '<div class="col-sm-4"><img src="img/player.png" class="img-small" alt="Cinque Terre" style="width:50%"><br><h2>No Players</h2></div>';
    }else {
      for (var i = 0; i < response.players.length; i++) {
        divJugadores.innerHTML += '<div class="col-sm-4"><img src="img/player.png" class="img-small" alt="Cinque Terre" style="width:50%"><br><h3>'+response.players[i].name+'</h3><label>Position: </label><label>'+response.players[i].position+'</label><br><label>T-Shirt Number: </label><label>'+response.players[i].jerseyNumber+'</label><br><label>Birth: </label><label>'+response.players[i].dateOfBirth+'</label><br><label>Nationality: </label><label>'+response.players[i].nationality+'</label><br><label>Contract Until: </label><label>'+response.players[i].contractUntil+'</label><br></div>';
      }
    }
    console.log(response);
  });
}
