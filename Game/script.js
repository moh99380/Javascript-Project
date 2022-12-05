document.querySelector(".control-buttons span").onclick=function()
{
    
do
{
    yourname=prompt("plz enter your name to can play" );

}while(yourname==null||yourname=="");
document.querySelector('.name span').innerHTML=yourname;
document.querySelector(".control-buttons").remove();
};
 let duration=2000;
 let blockscontainer=document.querySelector(".memory-game-blocks");
 let blocks=Array.from(blockscontainer.children);
let orderrange=Array.from(Array(blocks.length).keys());
shuffle(orderrange);
blocks.forEach((block,index)=>
{
block.style.order=orderrange[index];
block.addEventListener('click',function()
{
filaped(block);
});
});

function stopclick()
{
    blockscontainer.classList.add('no-clicking');
    setTimeout(()=>
    {
        blockscontainer.classList.remove('no-clicking');
    },duration);
}
function checkmatchblocked(firstblock,secondblock)
{
    let tries=document.querySelector('.wrong span');
    if(firstblock.dataset.photo===secondblock.dataset.photo)
    {
       firstblock.classList.remove('is-flipped');
       secondblock.classList.remove('is-flipped');
       firstblock.classList.add('is-match');
       secondblock.classList.add('is-match');
       document.getElementById("sucess").play();

    }
    else
    {
        tries.innerHTML=parseInt(tries.innerHTML)+1;
    setTimeout(()=>
    {
        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');   
    },duration);
    document.getElementById("faill").play();

    }

}
function filaped(selectelment)
{
selectelment.classList.add('is-flipped');
let allfliped=blocks.filter(fillbloc=>fillbloc.classList.contains('is-flipped'));
if(allfliped.length==2)
{
    stopclick();
    checkmatchblocked(allfliped[0],allfliped[1]);
}    

}

function shuffle(array)
{
    let current=array.length,temp,random;
    while(current>0)
    {
random=Math.floor(Math.random()*current);
current--;
temp=array[current];
array[current]=array[random];
array[random]=temp;
    }
    return array;
}

