$('#rfidUpload').click(function(event){
    event.preventDefault();

    var form = document.getElementById('entry_form');
    var nameInput = document.getElementById('name');
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');
    var purposeOfVisitInput = document.getElementById('purposeOfVisit');
    var vehicleNumberInput = document.getElementById('vehicleNumber');
    var vehicleNumberImageInput = document.getElementById('vehicleNumberImage');
    var faceImageInput = document.getElementById('faceImage');
    var isNittInput = document.getElementById('isNitt');
    var rfidInput = document.getElementById('rfid');

    var video = document.getElementById('video1');
    video.pause();

    if(rfidInput.value == 1){
    nameInput.value = "Naven";
    nameInput.readOnly = true;
    fromInput.value = "Trichy";
    fromInput.readOnly = true;
    toInput.value = "College";
    toInput.readOnly = true;
    purposeOfVisitInput.value = "Student";
    purposeOfVisitInput.readOnly = true;
    isNittInput.value = 1;
    rfidInput.value = 1;
    } else {
    nameInput.value = "Vibashan";
    nameInput.readOnly = true;
    fromInput.value = "Neyveli";
    fromInput.readOnly = true;
    toInput.value = "College";
    toInput.readOnly = true;
    purposeOfVisitInput.value = "Student";
    purposeOfVisitInput.readOnly = true;
    isNittInput.value = 1;
    rfidInput.value = 2;
    }
    setTimeout(function(){ 
        
        vehicleNumberInput.value = "TN-81-Z-6336"
        vehicleNumberImageInput.value = "uploads/TN-81-Z-6336.png"

        var formData = new FormData(form);
        var canvas = document.getElementById('videoframe');     
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  
        canvas.toBlob(function(blob) {
            console.log('Inside');
            console.log(blob);
            formData.append('vehicleImage', blob, '1.jpg');
            var image = document.getElementById('live_feed');
            var imageCanvas = document.getElementById('imageframe');     
            imageCanvas.width = image.width;
            imageCanvas.height = image.height;
            imageCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
            imageCanvas.toBlob(function(imageBlob) {
                console.log(formData.get('name'));
                formData.append('faceImage', imageBlob, '1.jpg');
                console.log(formData.get('faceImage'))
                
                $.ajax({
    
                  'url' : 'vehicleEntry',
                 'type' : 'POST',
                    'processData': false,
                    'contentType': false,
                    'data' : formData,
                    'success': function(a) {
                        form.reset();
                        location.reload();
                    }
                });
            });     
        });
    }, 3000);
});

function autoFill() {
    event.preventDefault();

    var vehicleNumberInput = document.getElementById('vehicleNumber');
    var vehicleNumberImageInput = document.getElementById('vehicleNumberImage');
    var vehicleImageInput = document.getElementById('vehicleImage');
    var faceImageInput = document.getElementById('faceImage');
    var isNittInput = document.getElementById('isNitt');
    var rfidInput = document.getElementById('rfid');
    var form = document.getElementById('entry_form');

    var video = document.getElementById('video1');
    video.pause();

    isNittInput.value = 0;
    rfidInput.value = '';
    setTimeout(function(){ 
        vehicleNumberInput.value = "TN-B1-Y-3668"
        vehicleNumberImageInput.value = "uploads/TN-B1-Y-3668.png"
    
        var formData = new FormData(form);
        var canvas = document.getElementById('videoframe');     
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  
        canvas.toBlob(function(blob) {
            console.log('Inside');
            console.log(blob);
            formData.append('vehicleImage', blob, '1.jpg');
            var image = document.getElementById('live_feed');
            var imageCanvas = document.getElementById('imageframe');     
            imageCanvas.width = image.width;
            imageCanvas.height = image.height;
            imageCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
            imageCanvas.toBlob(function(imageBlob) {
                console.log(formData.get('name'));
                formData.append('faceImage', imageBlob, '1.jpg');
                console.log(formData.get('faceImage'))
                
                $.ajax({
    
                  'url' : 'vehicleEntry',
                 'type' : 'POST',
                    'processData': false,
                    'contentType': false,
                    'data' : formData,
                    'success': function(a) {
                        form.reset();
                        location.reload();
                    }
                });
            });     
        });
    }, 3000);
}

