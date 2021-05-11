var n = 23, // odd number is best so the starting (middle) position is symmetrical
    boxes = [],
    yPos = 0,
    mainTL = gsap.timeline({paused:true, onUpdate:setCount});

for (var i=0; i<n; i++){  
  
  var box = document.createElement('div'),
      img = new Image(),
      tl = gsap.timeline({defaults:{duration:1}});
  
  img.src = '/assets/'+(i+10)+'/600/500/';
  gsap.set(img, { x:-100 });
  gsap.set(box, {
    attr:{id:'b'+(i+1), class:'box'},
    background:'#000',
    width:400,
    height:400,
    overflow:'hidden',
    left:'50%',
    top:'50%', 
    xPercent:-50, 
    yPercent:-50,
    zIndex:0,
    transformOrigin:'50% 0%'
  });
  
  tl.fromTo(box, {y:-450}, {y:450, ease:'slow(0.6, 0.4, false)'}, 0)
    .fromTo(img, {y:-100}, {y:0, ease:'power2.inOut'}, 0)
    .from(box,   {duration:0.3, rotationX:-35, ease:'power4'}, 0)  
    .from(img,   {duration:0.5, opacity:0.1, repeat:1, yoyo:true, ease:'power1.inOut'}, 0)
    .fromTo(box, {z:-350, zIndex:n-i}, {duration:0.4, z:0, zIndex:n-i+n, snap:{zIndex:1}, ease:'sine'}, 0)
    .to(box,     {duration:0.2, width:600, ease:'expo.inOut', yoyo:true, repeat:1}, 0.3)
    .to(img,     {duration:0.2, x:0, ease:'expo.inOut', yoyo:true, repeat:1}, 0.3)
    .to(box,     {duration:0.4, z:-300, zIndex:i, snap:{zIndex:1}, ease:'sine'}, 0.6)
    .set(box,    {transformOrigin:'50% 100%'}, 0.7)
    .to(box,     {duration:0.3, rotationX:35, ease:'power4.in'}, 0.7)  
  
  mainTL.add( tl, '-=0.75' )  
  
  boxes.push(box);
  box.appendChild(img);
  container.appendChild(box);
}


function setCount(){
  if (mainTL.progress()>0.99 || mainTL.progress()<0.01) {
    gsap.to(counter, {duration:0.1, opacity:0});  
    return;
  }  
  
  gsap.to(counter, {duration:0.1, opacity:1});
  var b = boxes[0];
  for (var i=1; i<n; i++){
    if ( gsap.getProperty(boxes[i],'z') > gsap.getProperty(b,'z') ) b = boxes[i];
  }  
  counter.innerHTML = b.id.substr(1) + '/' + n;
}


gsap.set(container, {perspective:750, position:'fixed'});
gsap.to(mainTL, {progress:0.5, duration:1.5, ease:'expo.inOut'}); // animate to the middle


// drag & wheel behavior...
window.onwheel = function(e){
  gsap.to(mainTL, { duration:1, progress:'-='+(e.deltaY * -0.0002) })
};

window.onmousedown = window.ontouchstart = function (e){ 
  if (e.touches) e.clientY = e.touches[0].clientY;
  yPos = Math.round(e.clientY);
  window.onmousemove = window.ontouchmove = drag;
};

window.onmouseup = window.ontouchend = function (e){
  window.onmousemove = window.ontouchmove = null;
};


function drag(e){
  if (e.touches) e.clientY = e.touches[0].clientY;    
  gsap.to(mainTL, { progress:'+='+( (Math.round(e.clientY)-yPos)%360 /750 ) });  
  yPos = Math.round(e.clientY);
}