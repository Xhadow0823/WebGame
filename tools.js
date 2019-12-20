String.prototype.hashCode = function(){
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var character = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

class Timer{
    constructor(t){
        this.limit = t;
        this.tcnt = 0;
    }
    wait(){  //return bool
        if(this.tcnt >= this.limit){
            return true;
        }else{
            this.tcnt += deltaTime;
            return false;
        }
    }
}
