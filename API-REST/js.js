var idNum;
class cos {
    constructor(name, lname, email, phone) {
        this.firstName = name;
        this.lastName = lname;
        this.email = email;
        this.phone = phone;
    }
};

function setjson(value) {
    json = value;
}

function aggiungimain(cos, elem) {
    var html = '<td><input class="form-check-input" type="checkbox" name="checkbox" style="margin-left: 1%" id="' + elem + '"></td><td id="' + elem + '" name="name"><p>' + cos.firstName + '</p></td><td id="' + elem + '" name="lname"><p>' + cos.lastName + '</p></td><td id="' + elem + '" name="email"><p>' + cos.email + '</p></td><td id="' + elem + '" name="phone"><p>' + cos.phone + '</p></td>';
    html = html + '<td style="width: 1%"><img onClick="aggiungi(this.id)" src="immagini/modifica.png" style="width: 30px; height: 30px;" id="' + elem + '"></td>';
    html = html + '<td><img onClick="elimina(this.id)" src="immagini/rimuovi.png" style="width: 30px; height: 30px;" id="' + elem + '"></td>';
    const row = document.createElement('tr');
    row.id = (elem);
    row.innerHTML = html;
    document.getElementById('container').appendChild(row);
    elem++;
}

function richiesta() {
    var ric = new XMLHttpRequest();
    ric.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            risposta(this.responseText);
        }
    };
    ric.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true);
    ric.setRequestHeader("Accept", "*/*");
    ric.send();
}

function aggiungispedizione(cos, id) {
    var dati = {
        "employeeId": id,
        "firstName": cos.name,
        "lastName": cos.lname,
        "email": cos.address,
        "phone": cos.phone
    };
    $.ajax({
        url: 'http://localhost:8080/api/tutorial/1.0/employees/' + id,
        type: 'put',
        data: JSON.stringify(dati),
        contentType: 'application/json',
        success: function(data, textstatus, jQxhr) {
            location.reload();
        }
    });
}

function rimuovispedizione(id) {
    $.ajax({
        url: "http://localhost:8080/api/tutorial/1.0/employees/" + id,
        type: 'delete',
        contentType: 'String',
        success: function(data, textstatus, jQxhr) {

        }
    });
}



function risposta(json) {
    var cos = JSON.parse(json);
    for (var i = 0; i < cos.length; i = i + 1) {
        idNum = cos[i].employeeId;
        aggiungimain(cos[i], cos[i].employeeId);
    }
}

function carica() {
    document.getElementById("form2").style.display = "none";
    document.getElementById("form1").style.display = "block";
    richiesta();
}

function add() {
    idNum++;
    var dati = {
        "employeeId": idNum,
        "firstName": document.getElementById("name").value,
        "lastName": document.getElementById("lastname").value,
        "email": document.getElementById("indirizzo").value,
        "phone": document.getElementById("telefono").value
    };
    $.ajax({
        url: 'http://localhost:8080/api/tutorial/1.0/employees/',
        type: 'post',
        data: JSON.stringify(dati),
        contentType: 'application/json',
        success: function(data, textstatus, jQxhr) {
            location.reload();
        }
    });
}

function aggiungi(element) {
    try {
        if (element == undefined) {
            document.getElementById("form1").style.display = "none";
            document.getElementById("form2").style.display = "block";
        } else {
            alert(element);
            var cos = new cos;
            cos.name = prompt("Name: ");
            cos.lname = prompt("Last name: ");
            cos.address = prompt("Email: ");
            cos.phone = prompt("Phone: ");
            aggiungispedizione(cos, element);
        }
    } catch (Exception) {}
}

function box(checkbox) {
    var checkboxes = document.getElementsByName('checkbox');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = checkbox.checked;
    }
}

function elimina(element) {
    try {
        if (element == undefined) {
            var checkboxes = document.getElementsByName('checkbox');
            for (var i = 0, n = checkboxes.length; i < n; i++)
                if (checkboxes[i].checked == true)
                    rimuovispedizione(checkboxes[i].id);
            location.reload();
        } else {
            if (confirm("cancellare?")) {
                rimuovispedizione(element);
                location.reload();document.getElementById('container').removeChild(document.getElementById(element));
            }
        }
    } catch (Exception) {}
}

