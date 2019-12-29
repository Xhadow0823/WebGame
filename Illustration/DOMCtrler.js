// using jquery
function renewCell(name, ext='png'){
    if($('#'+name).length !== 0){
        return $('#'+name);
    }else{
        let ht = `
        <div class="cell" id="${name}">
            <img src="QM.png" alt="${name}.${ext}Image" class="popup">
            <span class="cell-name" alt="${name}">???</span>
        </div>`;
        $('#illu').append(ht);
    }
    return $('#'+name);
}

function addP(){
    let name = ($('#nInput').val()==''?'QM':$('#nInput').val());
    renewCell(name);
}

$(document).ready(()=>{
    renewCell('hodara', 'jpg');
    renewCell('how_dare_you', 'gif');
    renewCell('KF', 'jpg');
    renewCell('korea_fish', 'jpg');
    renewCell('ode', 'jpg');
});

function reveal(name){
    if(!$('#'+name).length){  //not found
        console.log("name error");
    }else{
        $(`#${name} img`).attr('src',
        $(`#${name} img`).attr('alt').slice(0, -5));
        $(`#${name} span`).text(
        $(`#${name} span`).attr('alt'));
    }
}

// POPUP////////////
$(function () {
    "use strict";
    
    $(".popup").click(function () {
        var $src = $(this).attr("src");
        $(".show").fadeIn();
        $(".img-show img").attr("src", $src);
    });
    
    $("span, .overlay").click(function () {
        $(".show").fadeOut();
    });
    
});