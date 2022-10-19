const Q_KEY = 113;
const W_KEY = 119;
const E_KEY = 101;

const Q_IMG = 'Quas_icon';
const W_IMG = 'Wex_icon';
const E_IMG = 'Exort_icon';

const R_KEY = 114;

const R_IMG = 'Invoke_icon';



function getImgPath(img){
    return 'img/'+img+'.webp';
}

function generateHTMLforImage(img){
    var container = document.createElement('div');
    container.classList.add('imgContainer');
    var imgaeHTML = document.createElement('img');
    imgaeHTML.src = getImgPath(img);
    container.appendChild(imgaeHTML);
    return container; 
}

class InvCast{
    constructor(recipe, img) { this.recipe = recipe, this.img = img}
    getRecipe(){ return this.recipe }
    generateHTML(){
        var castDiv = document.createElement('div');
        castDiv.classList.add('cast');

        var imga = generateHTMLforImage(this.img);
        castDiv.appendChild(imga);

        this.recipe.forEach(e => {
            var eImg = Q_IMG;
            if(e === 'e')
                eImg = E_IMG
            else if(e == 'w')
                eImg = W_IMG

            castDiv.appendChild(generateHTMLforImage(Img));
        });

        return castDiv
    }
}
 
const COLD_SNAP = new InvCast(['q','q','q'],'Cold_Snap_icon');
const ICE_WALL = new InvCast(['e','q','q'],'Ice_Wall_icon');
const TORNADO = new InvCast(['q','w','w'],'Tornado_icon');
const SUN_STRIKE = new InvCast(['e','e','e'],'Sun_Strike_icon');
const CHAOS_METEOR = new InvCast(['e','e','w'],'Chaos_Meteor_icon');
const GHOST_WALK = new InvCast(['q','q','w'],'Ghost_Walk_icon');
const EMP = new InvCast(['w','w','w'],'EMP_icon');
const ALACRITY = new InvCast(['e','w','w'],'Alacrity_icon');
const FORGE_SPIRIT = new InvCast(['e','e','q'],'Forge_Spirit_icon');
const BLAST = new InvCast(['e','q','w'],'Deafening_Blast_icon');

var arr = [];
 
var needCast = updateNeedCast();
 
function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}
 
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
 
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

function getListOfAllCastst(){
    return [COLD_SNAP, ICE_WALL, TORNADO, SUN_STRIKE, CHAOS_METEOR, GHOST_WALK, EMP, ALACRITY, FORGE_SPIRIT, BLAST]
}
 
function updateNeedCast(){
    var value = get_random(getListOfAllCastst()).getRecipe();
    // document.getElementById("needCast").innerHTML = value;
    return value;
}
 
function updateSphere(value, button){
    if(value != Q_KEY && value != W_KEY && value != E_KEY)
        return;
    if(arr.length == 3){
        arr.pop();
    }
    arr.unshift(button);
}
 
function cast(){
    var sortedArr = arr.sort();
    if(arraysEqual(sortedArr,needCast)){
        console.log("succses!");
        needCast = updateNeedCast();
    }else{
        console.log('try again..');
    }
}

function init(){
    var doc = document.getElementById('casts')
    getListOfAllCastst().map(e=>e.generateHTML()).forEach( el =>
        doc.appendChild(el)
    )
}

init();

document.onkeypress = function (event){
    var cc = event.charCode;
    if(cc == R_KEY){
        cast()
    }else{
        updateSphere(cc, event.key);
        document.getElementById("casted").innerHTML = arr;
    }
}