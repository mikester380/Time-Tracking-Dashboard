'use strict';

//Getting DOM Elements

const cardsContainer = document.querySelector('.time-cards');
const filtersContainer = document.querySelector('.user__card-filters');
const filters = document.querySelectorAll('.user__card-filter')
const url = '../data.json';

//Function to display cards to the screen

const displayCards = function (filter='daily') {
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    data.forEach(function(item){
      
      const timeframe = item.timeframes[filter];
      const bgType = item.title.toLowerCase() === 'self care' ? 'self-care' : item.title.toLowerCase();
      
      const prevText = filter === 'daily' ? 'Yesterday' : filter === 'weekly' ? 'Last Week' : 'Last Month';
      
      const card = `
      <div class="time-card time-card--bg-${bgType}">
        <div class="time-card__content">
          <div class="time-card__info">
            <h2 class="time-card__heading">
              ${item.title}
            </h2>
            <img src="images/icon-ellipsis.svg" alt="">
          </div>
          <div class="time-card__more-info">
            <p class="time-card__current">
              <span class="time-card__current-value">${timeframe.current}</span>hrs
            </p>
            <p class="time-card__previous">
              <span class="time-card__filter-type">
                ${prevText}
              </span> -
              <span class="time-card__previous-value">${timeframe.previous}</span>hrs
            </p>
          </div>
        </div>
      </div>`
      cardsContainer.insertAdjacentHTML('beforeend', card);
    })
  })
}

displayCards()

//Event Listener to handle filter events

filtersContainer.addEventListener('click', function(e){
  const clicked = e.target;

  if (clicked !== e.currentTarget){
    cardsContainer.innerHTML = "";
    displayCards(clicked.dataset.filter);
    filters.forEach(filter => filter.classList.remove('user__card-filter-active'));
    clicked.classList.add('user__card-filter-active');
  } 
});