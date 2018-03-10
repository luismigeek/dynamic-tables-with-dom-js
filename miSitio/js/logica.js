var misDatos = {};

function validateForm(){

	var state = true;

	var numObj = document.getElementById("num");
	var dateObj = document.getElementById("date");
	var horaObj = document.getElementById("hora");
	var placaObj = document.getElementById("placa");
	var checObj = document.getElementById("chec");

	if (!numObj.checkValidity()) {
   		alert("ERROR - NUMERO DE HORAS: "+numObj.validationMessage);
   		state = false;
	}
			
	if (!dateObj.checkValidity()) {
   		alert("ERROR EN CAMPO FECHA: "+dateObj.validationMessage);
   		state = false;
	}

	if (!horaObj.checkValidity()) {
   		alert("ERROR EN CAMPO HORA: "+horaObj.validationMessage);
   		state = false;
	}

	if (!IsAlphaNum(placaObj)) {
   		alert("LA PLACA DEL VEHICULO ES INCORRECTA");
   		state = false;
	}

	if (!checObj.checked) {
		state = false;
	}

	if (state == true) {
		guardarEnArray();
		document.getElementById("formulario").reset();
	}
}

function IsAlphaNum(obj) {

	str = obj.value;

	if (str+"" == "undefined" || str+"" == "null" || str+"" == ""){
		return false;
	}

	var isValid = true;
	
   	str += "";	

   	for (i = 0; i < str.length; i++){
      	if (!(((str.charAt(i) >= "0") && (str.charAt(i) <= "9")) || ((str.charAt(i) >= "a") && (str.charAt(i) <= "z")) || ((str.charAt(i) >= "A") && (str.charAt(i) <= "Z")))) {
			isValid = false;
			break;
		}
	}

   	return isValid;
}

function limpiar(){

}

function guardarEnArray() {

	var row = new Array();
	var elem = document.getElementsByClassName("campos");

	for (var i = 0; i < elem.length; i++) {
		if (elem[i].type == "radio") {
			if (elem[i].checked) {
				row.push(elem[i].value.toLowerCase());
			}
		}else {
			if (elem[i].type == "email" || elem[i].type == "file") {
				if (elem[i].value == "") {
					row.push("NO REGISTRA");
				}else {
					row.push(elem[i].value.toLowerCase()); 
				}
			}else {
				row.push(elem[i].value.toLowerCase());
			}
		}
	}
	agregarFila(row);
}

function agregarFila(row){

	misDatos = document.getElementById('tabla');

	var newRow = misDatos.insertRow(misDatos.rows.length);

	for (var i = 0; i < row.length; i++) {
		var cell = newRow.insertCell(i);
		cell.innerHTML = row[i];
	}
}


function buscar (){

	var parametro = document.getElementById('campoBuscar').value.toLowerCase();		
	
	var cells="";
	var encontrado=false;
	var aux="";

	for (var i = 1; i < misDatos.rows.length; i++) {
		
		cells = misDatos.rows[i].getElementsByTagName('td');
		encontrado = false;

		for (var j = 0; j < cells.length && !encontrado; j++){
			aux = cells[j].innerHTML.toLowerCase();

			if (parametro.length == 0 || (aux == parametro))
				encontrado = true;
		}

		if(!encontrado) misDatos.rows[i].style.display = 'none';
		else misDatos.rows[i].style.display = ''; 
	}
}
