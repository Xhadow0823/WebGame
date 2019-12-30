
let rankUrl = 'https://test123testt.herokuapp.com/rank.php';
$(()=>{
    $.post( rankUrl,
            null,
            (resp)=>{
                console.log(resp);
                $('#onload').hide();
                resp.sort(function (a, b){
                    return b[1]-a[1];
                });
                let fi = "id='n1'";  //with crown
                resp.forEach((item,idx)=>{
                    $('#tbbd').append(`
                    <tr class="rank-r">
                    <td>${idx+1}.</td><td ${fi}>${item[0]}</td><td>${item[1]}</td>
                    </tr>`);
                    fi = "";
                });
            },
            "json");
});
function updateScore(n, s){
    $('#tbbd').text("");$('#onload').hide(false);
    $.post( rankUrl,
            {name:n, score:s},
            (resp)=>{
                console.log(resp);
                $('#onload').hide();
                resp.sort(function (a, b){
                    return b[1]-a[1];
                });
                let fi = "id='n1'";  //with crown
                resp.forEach((item,idx)=>{
                    if(idx>=20){  return;}
                    $('#tbbd').append(`
                    <tr class="rank-r">
                    <td>${idx+1}.</td><td ${fi}>${item[0]}</td><td>${item[1]}</td>
                    </tr>`);
                    fi = "";
                });
            },
            "json");
}