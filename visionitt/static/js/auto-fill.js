function rfidAutoFill() {
    var nameInput = document.getElementById('name');
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');
    var purposeOfVisitInput = document.getElementById('purposeOfVisit');
    var vehicleNumberInput = document.getElementById('vehicleNumber');
    var vehicleNumberImageInput = document.getElementById('vehicleNumberImage');
    var vehicleImageInput = document.getElementById('vehicleImage');
    var faceImageInput = document.getElementById('faceImage');
    var isNittInput = document.getElementById('isNitt');
    var rfidInput = document.getElementById('rfid');


    nameInput.value = "Naven";
    nameInput.readOnly = true;
    fromInput.value = "Trichy";
    fromInput.readOnly = true;
    toInput.value = "College";
    toInput.readOnly = true;
    purposeOfVisitInput.value = "Student";
    purposeOfVisitInput.readOnly = true;
    isNittInput.value = 1;
    vehicleNumberInput.value = "TN10 BD6489"
    vehicleImageInput.value = "uploads/captain_marvel.jpg";
    vehicleNumberImageInput.value = "uploads/captain_marvel.jpg";
    faceImageInput.value = "uploads/captain_marvel.jpg"
}

function autoFill() {
    var vehicleNumberInput = document.getElementById('vehicleNumber');
    var vehicleNumberImageInput = document.getElementById('vehicleNumberImage');
    var vehicleImageInput = document.getElementById('vehicleImage');
    var faceImageInput = document.getElementById('faceImage');
    var isNittInput = document.getElementById('isNitt');
    var rfidInput = document.getElementById('rfid');

    isNittInput.value = 0;
    rfidInput.value = '';
    vehicleNumberInput.value = "TN10 BD6489"
    vehicleImageInput.value = "uploads/captain_marvel.jpg";
    vehicleNumberImageInput.value = "uploads/captain_marvel.jpg";
    faceImageInput.value = "uploads/captain_marvel.jpg"
}

