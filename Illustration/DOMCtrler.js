// using jquery
function renewCell(name, cnt=0){
    if($('#'+name).length !== 0){
        let oldV = Number($('#'+name).children('span.cell-cnt').text());
        $('#'+name).children('span.cell-cnt').text(oldV+cnt);
    }else{
        let ht = `
        <div class="cell" id="${name}">
            <img src="${name}.png" alt="${name}Image">
            <span class="cell-name">${name}</span> : <span class="cell-cnt">${cnt}</span>
        </div>`;
        $('#illu').append(ht);
    }
    return $('#'+name);
}

function addP(){
    let name = 'cactus';
    let cnt = ($('#cntInput').val()===undefined?0:Number($('#cntInput').val()));
    renewCell(name,cnt);
}

/*
        <!--this is a template of 'cell'-->
        <div class="cell">
            <img src="cactus.png" alt="gameObj">
            <span>name</span>
        </div>
*/