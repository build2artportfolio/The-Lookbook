// Event Listeners Section
// Mouseover Event Listener
// Changes ATag color to blue when moused-over.
const aTag = document.querySelectorAll('a');

for(let i = 0; i < aTag.length; i++){
    aTag[i].addEventListener('mouseover', function(){
        aTag[i].style.color = "blue";
    });
};

//Click Event
// Prompts an alert saying Redirecting when a navigation is clicked. 
let navPro = document.querySelector('nav');

navPro.addEventListener('click', function(){
    alert("Redirecting");
});

// Click Event Listener
// Changes any Ptag section's text to bold.
const allPs = document.querySelectorAll('p');

for(let i = 0; i < allPs.length; i++){
    allPs[i].addEventListener('click', function(){
        allPs[i].style.fontWeight = "bold";
    });
}

// DblClick Event Listener
// Image Nullifier, removes images on dbl click. 
// ****Might adjust to just get rid of "posts divs".****
const postsNone = document.querySelectorAll('.posts');

for(let i = 0; i < postsNone.length; i++){
    postsNone[i].addEventListener('dblclick', function(){
        postsNone[i].style.display = "none";
    });
};

// Scroll Event Listener
// creates a div in the form of a box, containing an ^, as you scroll.
// Clicking on Div will bump you back to the top.
var x = window.matchMedia("(min-width: 501px)")

if(x.matches){
    let scrollY = 0;
    scrollY = window.scrollY;

    let div = document.createElement('div');
    document.body.append(div);
    div.id = "boxie";
    div.style.padding = "10px";
    div.style.color = "black";
    div.style.textAlign = "center";
    div.style.background = "rgb(239, 250, 253)"
    div.innerHTML = "Up";
    div.style.borderRadius = '10px';
    div.style.position = "fixed";
    div.style.right = "100px";
    div.style.bottom = " 100px";
    div.style.border = "1px solid black";
    div.style.cursor = "pointer"


    window.addEventListener('scroll', function(e){
        scrollY = window.scrollY;
        if(scrollY > 100){
            document.getElementById('boxie').style.display = "block";

        } else if (scrollY < 100) {
            document.getElementById('boxie').style.display = "none";
        }
    });

    div.addEventListener('click', function(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

}

// Other JavaScript Elements Here
