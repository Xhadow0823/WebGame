let url = 'http://testdm.rf.gd/rank.php';
$.ajax({
    dataType: "json",
    url: url,
    data: null,
    success: function(resp){
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
    }
});
function add(name, score){
    $('#tbbd').text("");$('#onload').hide(false);
    $.post( url,
            {name:name, score:score},
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
}