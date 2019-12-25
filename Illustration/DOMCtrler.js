// using jquery
function renewCell(name, cnt=0){
    if($('#'+name).length !== 0){
        return $('#'+name);
        let oldV = Number($('#'+name).children('span.cell-cnt').text());
        $('#'+name).children('span.cell-cnt').text(oldV+cnt);
    }else{
        let ht = `
        <div class="cell" id="${name}">
            <img src="${name}.png" alt="${name}Image">
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