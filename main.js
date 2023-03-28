const track = document.getElementById("image-track");

window.onmousedown = event => {
    track.dataset.mouseDownAt = event.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";

    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = event => {

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