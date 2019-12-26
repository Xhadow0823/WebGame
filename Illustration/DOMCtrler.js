// using jquery
function renewCell(name, ext='png'){
    if($('#'+name).length !== 0){
        return $('#'+name);
    }else{
        let ht = `
        <div class="cell" id="${name}">
            <img src="${name}.${ext}" alt="${name}Image">
            <span class="cell-name">${name}</span>
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
})