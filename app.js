//Usuarios por defecto al iniciar la pagina.
var defaultUsers = {};
defaultUsers["userName"] = 'DefaultUserName1';
defaultUsers["userCode"] = 'DefaultUserCode1';
insertNewUser(defaultUsers);
defaultUsers["userName"] = 'DefaultUserName2';
defaultUsers["userCode"] = 'DefaultUserCode2';
insertNewUser(defaultUsers);

var selectedRow = null;

function onFormSubmit() {
	if(validate()){
		var formData = readFormData();
		if(selectedRow == null){
			insertNewUser(formData);
		} else {
			update(formData);
		}
		resetForm();
	}
}

//Lee el texto de los input
function readFormData() {
	var formData = {};
	formData["userName"] = document.getElementById("userName").value;
	formData["userCode"] = document.getElementById("userCode").value;
	return formData;
}

//Crea nuevos usuarios a la tabla
function insertNewUser(data){
	var table = document.getElementById("listOfUsers").getElementsByTagName('tbody')[0]; //Captura el tbody que esta debajo de thread
	var newRow = table.insertRow(table.lenght); //Inserta una nueva fila
	cell1 = newRow.insertCell(0);
	cell1.innerHTML = data.userName;
	cell2 = newRow.insertCell(1);
	cell2.innerHTML = data.userCode;
	cell3 = newRow.insertCell(2);
	cell3.innerHTML = `<a onClick="onEdit(this)">Actualizar</a>
						<a onClick="onDelete(this)">Eliminar</a>`; //Añade enlaces para actualizar y eliminar(no sé nota en el navegador)
}

//Borra el contenido de los input
function resetForm(){
	document.getElementById("userName").value = "";
	document.getElementById("userCode").value = "";
	selectedRow = null;
}

//Captura la posicion del usuario que se desea editar y su respectiva informacion
function onEdit(td){
	selectedRow = td.parentElement.parentElement;
	document.getElementById("userName").value = selectedRow.cells[0].innerHTML;
	document.getElementById("userCode").value = selectedRow.cells[1].innerHTML;
}

//Cambia los datos del usuario seleccionado en el onEdit
function update(formData){
	selectedRow.cells[0].innerHTML = formData.userName;
	selectedRow.cells[1].innerHTML = formData.userCode;
}

//Captura la posicion del usuario y lo elimina del tbody
function onDelete(td){
	if(confirm('¿Realmente deseas eliminar a ' + td.parentElement.parentElement.cells[0].innerHTML + ' de la lista de usuarios?')){
		row = td.parentElement.parentElement;
	document.getElementById("listOfUsers").deleteRow(row.rowIndex);
	resetForm();
	}
}

//Validacion de datos (\s: Espacio en blanco)
function validate(){
	isValid = true;
	var str = document.getElementById("userName").value;

	str = str.trim();//Quita los \s del inicio y del final si es que hubieran
	var patt = new RegExp(/^[A-Za-z0-9\s\u00F1\u00D1]+$/g);//Impide que el userName tenga caracteres especiales
	var res = patt.test(str);//Bota verdadero o falso dependiendo si la cadena cumple con la condición del RegExp

	if(isAnEmptyString(str)){
		alert("El nombre de usuario no puede estar en blanco");
		isValid = false;
	}else if(!res){
		alert("El nombre de usuario no puede tener caracteres especiales");
		isValid = false;
	}else{
		isValid = true;
	}

	//Si el nuevo usuario no ingresa un código, se le asigna uno aleatoriamente:
	var code = document.getElementById("userCode").value;
	if(isAnEmptyString(code)){
		code = Math.floor(Math.random()*(100000-1)) + 1;
		document.getElementById("userCode").value = code;
	}

	return isValid;
}

//Comprueba si la cadena solo contiene \s
function isAnEmptyString(str){
	isEmpty = true;
	if(str.length != 0){
		for(var i = 0; i < str.length; i++){
			if(str[i] == " "){
				isEmpty = true;
			}else{
				isEmpty = false;
				break;
			}
		}
	}
	return isEmpty;
}