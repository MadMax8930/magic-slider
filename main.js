// 1. Determine the starting point everytime the mouse is pressed down
// 2. Determine how far the mouse has traveled relative to the starting point
// 3. Determine the max distance and the percentage
// 4. Keeping track how far we have dragged the slider
// 5. Updating constantly the percentage of the sider
// 6. Storing the percentage on mouse release
// 7. Add viewport limitations for the next percentage value (max/min)
// 8. Looping over images and implement a Parallax effect

const track = document.getElementById("image-track");

const handleOnDown = event => {
    track.dataset.mouseDownAt = event.clientX;
}

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";

    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = event => {

    if(track.dataset.mouseDownAt === "0") return;

    const mouseDistance = parseFloat(track.dataset.mouseDownAt) - event.clientX;
    const maxDistance = window.innerWidth / 2;
    const percentage = (mouseDistance / maxDistance) * -100;

    const nextPercentageUncontrolled = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUncontrolled, 0), -100);

    track.dataset.percentage = nextPercentage;

    // track.style.transform = `translate(${nextPercentage}%, -50%)`;
    
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("image")){
        image.animate({
            objectPosition: `${nextPercentage + 100}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

// Touch events

window.onmousedown = event => handleOnDown(event);

window.ontouchstart = event => handleOnDown(event.touches[0]);

window.onmouseup = event => handleOnUp(event);

window.ontouchend = event => handleOnUp(event.touches[0]);

window.onmousemove = event => handleOnMove(event);

window.ontouchmove = event => handleOnMove(event.touches[0]);

// Title effect

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ-';

document.querySelector("h1").onmouseover = event => {
   let iterations = 0

   const interval = setInterval(() => {
    event.target.innerText = event.target.innerText.split("")
    .map((letter, index) => {
        if (index < iterations) {
            return event.target.dataset.value[index]
        }
        return letters[Math.floor(Math.random() * 26)]    
    })
    .join("");

    if(iterations >= event.target.dataset.value.length) {
        clearInterval(interval)
    };

    iterations += 1 / 4
    
}, 30)

}
