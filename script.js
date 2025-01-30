let shelvesItem = document.querySelectorAll('.shelvesItem');
let shelvesItemDiv = document.querySelectorAll('.shelvesItemDiv');
for (let i = 0; i < shelvesItem.length; i++) {
    let shelvesItemDiv = shelvesItem[i].getElementsByTagName('div');
    for (let j = 0; j < shelvesItemDiv.length; j++) {
      shelvesItemDiv.length == 4 ? shelvesItemDiv[j].style = `left: ${j * 25}%` :  shelvesItemDiv[j].style = `left: ${j * 33}%`;
    }
}

let currentDroppable = null;
let basketProduct = document.querySelectorAll('.basketProduct');
let payShoppingCart = document.querySelector('.payShoppingCart');
let count = 0;
let shelvesItemImg = document.querySelectorAll('.shelvesItemImg');
for(let i = 0; i < shelvesItemImg.length; i++) {
  let heightElem = shelvesItemImg[i].offsetHeight;
  shelvesItemImg[i].style = `height: ${window.innerHeight / 1000 * heightElem}px`
  window.addEventListener('resize', () => {
    shelvesItemImg[i].style = `height: ${window.innerHeight / 1000 * heightElem}px`
  });
  function dropBasket(elemBelow, oldParams) {
    let random = Math.round(Math.random() * 3)
    let droppableBelow = elemBelow.closest('.basket');
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      if(random == 0) {
        basketProduct[0].append(shelvesItemImg[i])
      } else if (random == 1) {
        basketProduct[1].append(shelvesItemImg[i])
      } else {
        basketProduct[2].append(shelvesItemImg[i])
      }
      count++;
    } else {
      oldParams.append(shelvesItemImg[i]);
    }
    shelvesItemImg[i].style.position = 'static';
    count > 2 ? payShoppingCart.classList.remove('hidden') : '';
    shelvesItemImg[i].onmouseup = null;
    document.removeEventListener('mousemove', onMouseMove);
  }
  shelvesItemImg[i].onmousedown = function(event) {
    let oldParams = event.target.offsetParent;
    let shiftX = event.clientX - shelvesItemImg[i].getBoundingClientRect().left;
    let shiftY = event.clientY - shelvesItemImg[i].getBoundingClientRect().top;
  
    shelvesItemImg[i].style.position = 'absolute';
    shelvesItemImg[i].style.zIndex = 1000;
    document.body.append(shelvesItemImg[i]);
    moveAt(event.pageX, event.pageY);
    function moveAt(pageX, pageY) {
      shelvesItemImg[i].style.left = pageX - shiftX + 'px';
      shelvesItemImg[i].style.top = pageY - shiftY + 'px';
    }
    let elemBelow;
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
      shelvesItemImg[i].hidden = true;
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      shelvesItemImg[i].hidden = false;
    }
    
    document.addEventListener('mousemove', onMouseMove);
    shelvesItemImg[i].onmouseup = function() {
      dropBasket(elemBelow, oldParams)
    };
  
  };
  shelvesItemImg[i].ondragstart = function() {
    return false;
  };
  shelvesItemImg[i].addEventListener('touchstart', event => {
    let oldParams = event.target.offsetParent;
  
    shelvesItemImg[i].style.position = 'absolute';
    shelvesItemImg[i].style.zIndex = 1000;
    document.body.append(shelvesItemImg[i]);
    touchpadMoveAt(event.pageX, event.pageY);
    function touchpadMoveAt(pageX, pageY) {
      shelvesItemImg[i].style.left = `${pageX}px`;
      shelvesItemImg[i].style.top = `${pageY}px`;
    }
    let elemBelow;
    function onMouseMove(event) {
      let touch = event.targetTouches[0];
      touchpadMoveAt(touch.pageX, touch.pageY);
      shelvesItemImg[i].hidden = true;
      elemBelow = document.elementFromPoint(touch.pageX, touch.pageY);
      shelvesItemImg[i].hidden = false;
    }
    document.addEventListener('touchmove', onMouseMove);
    shelvesItemImg[i].addEventListener('touchend', (event) => {
      dropBasket(elemBelow, oldParams);
    })
    event.preventDefault();
  }, false);
}
