    // using jquery
    function renewCell(name, ext='png'){
        if($('#'+name).length !== 0){
            return $('#'+name);
        }else{
            let ht = `
            <div class="cell" id="${name}">
                <img src="Illustration/QM.png" alt="${name}.${ext}Image" class="popup">
                <span class="cell-name" alt="${name}">???</span>
            </div>`;
            $('#illu').append(ht);
        }
        
        return $('#'+name);
    }
    
    $(()=>{
        renewCell('hodara', 'jpg');
        renewCell('how_dare_you', 'gif');
        renewCell('KF', 'jpg');
        renewCell('korea_fish', 'jpg');
        renewCell('ode', 'jpg');
        renewCell('muscular_dolphin', 'jpg');
        //POPUP/////
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        $(".popup").click(function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt.slice(0, -9);
        });
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
    });
    
    function reveal(name){
        if(!$('#'+name).length){  //not found
            console.log("name error");
        }else{
            $(`#${name} img`).attr('src',
            "Illustration/"+
            $(`#${name} img`).attr('alt').slice(0, -5));
            $(`#${name} span`).text(
            $(`#${name} span`).attr('alt'));
        }
    }