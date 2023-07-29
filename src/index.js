//import modules
import { fetchEvents } from './js/fetchEvents';
import { fetchEventById } from './js/fetchEventById';
import { searchCountryCode } from './js/country';
import { createPagination } from './js/pagination';
import 'animate.css';
//Import library to show notifications
import { Notify } from 'notiflix';

const events = document.querySelector('.events');
const eventId = document.querySelector('.backdrop');
const inputEvent = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-icon');
const modal = document.querySelector('[data-modal]');

const pagination = document.querySelector('ul');

let currentPage = 1;
let totalPage = '';
let inputValue = inputEvent.value;

const loader = document.querySelector('#loading');
 
window.addEventListener("load", displayLoading());

//display loading
function displayLoading() {
  loader.classList.add('display');
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove('display');
  }, 5000);
}

// hiding loading
function hideLoading() {
  loader.classList.remove('display');
}

//First search difficult event after loading page
const difficultEvents = async () => {
  try {
    displayLoading();    
    const events = await fetchEvents(
      '', 'US', 0
    );  

    totalPage = events.page.totalPages;
    renderEvents(events._embedded.events);
    createPagination(totalPage, currentPage);
    hideLoading();    
    
  } catch (error) {
    console.log(error.message);
    console.log('Something WRONG 0_o !?!');
  }
};

//Function to search event by input keyword and select country
const searchEvents = async () => {
  try {
    displayLoading();    
    const events = await fetchEvents(
      inputValue,
      searchCountryCode(),
      currentPage - 1
    );
    console.log(searchCountryCode());
    console.log(events);   

    totalPage = events.page.totalPages;
    if (totalPage != 0){
      if(currentPage === 1){
        Notify.success(`We found ${events.page.totalElements} events.`);
      }      
      renderEvents(events._embedded.events);
      createPagination(totalPage, currentPage);
      hideLoading();
    } else {
      hideLoading();
      Notify.failure(
        'Oooh, there are no events matching your search query. Please try again.'
      );
      createPagination(totalPage, currentPage);
    }  
    
  } catch (error) {
    console.log(error.message);
    console.log('Something WRONG 0_o !?!');
  }
};

//Function who rendering received data from backend
function renderEvents(data) {
  const markup = data
    .map(
      ({ id, name, dates, images, _embedded}) =>
        `
    <div class="events__wrapper">
      <img data-id=${id}
        class="events__image"
        src=${images
          .filter(i => i.ratio === '4_3')
          .map(i => `${i.url}`)
          .join(' ')}

        loading="lazy"
        >
        <div class="events__design"></div>
      <p class="events__name">${name} </p>
      <p class="events__date">${dates.start.localDate} </p>
      <p class="events__address"><svg class="events__svg" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 0C1.34581 0 0 1.40339 0 3.12836C0 5.29645 3.00295 9 3.00295 9C3.00295 9 6 5.18983 6 3.12836C6 1.40339 4.65424 0 3 0ZM3.90516 4.04434C3.65558 4.30455 3.32781 4.43469 3 4.43469C2.67224 4.43469 2.34437 4.30455 2.09489 4.04434C1.59577 3.52392 1.59577 2.67709 2.09489 2.15662C2.33658 1.90448 2.65807 1.76561 3 1.76561C3.34193 1.76561 3.66337 1.90453 3.90516 2.15662C4.40428 2.67709 4.40428 3.52392 3.90516 4.04434Z" fill="white"/>
</svg>
${_embedded.venues[0].name} </p>
      </div>
    `
    )
    .join('');
  events.innerHTML = markup;
}

//Function who response from clicked event, searching by id
const searchEventById = async e => {
  displayLoading()
  try {
    const eventById = await fetchEventById(selectEvents(e));
    console.log(eventById);
    renderEventsById(eventById);
    hideLoading();
  } catch (error) {
    console.log(error.message);
    console.log('Something WRONG 0_o !?!');
  }
};

//rendering clicked event on modal window
function renderEventsById(dataId) {
  const { info, name, dates, images, _embedded, priceRanges, url } = dataId;

  const markupId = `
    <div class="modal">
   <button class="close-btn" data-modal-close>
   <p class="modal__text"><svg class="m" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill="#4c00fe" style="fill: var(--color1, #4c00fe)" d="M1.646 32c-0.422 0-0.843-0.16-1.163-0.483-0.643-0.643-0.643-1.685 0-2.328l28.707-28.707c0.643-0.643 1.685-0.643 2.328 0s0.643 1.685 0 2.329l-28.707 28.706c-0.323 0.321-0.744 0.483-1.165 0.483z"></path>
<path fill="#4c00fe" style="fill: var(--color1, #4c00fe)" d="M30.355 32c-0.422 0-0.843-0.16-1.163-0.483l-28.709-28.706c-0.643-0.643-0.643-1.686 0-2.329s1.685-0.643 2.329 0l28.707 28.707c0.643 0.643 0.643 1.685 0 2.328-0.323 0.321-0.744 0.483-1.163 0.483z"></path>
   </button>

        <img
          class="photo__radius"
            src=${images.filter(i => i.ratio === '4_3').map(i => `${i.url}`)}


            loading="lazy"
        >

      <div class="modal__photo">
        <img
          class="photo"
            src=${images
              .filter(i => i.ratio === '3_2' && i.width === 1024)
              .map(i => `${i.url}`)}


            loading="lazy"
        >
      </div>

      <div class="modal__inf">
        <ul class="modal__list">
          <li class="modal__item">
            <h6 class="modal__h6">info</h6>
            <p class="modal__text info"> ${info ? info : name} </p>
          </li>

      <li class="modal__item">
              <h6 class="modal__h6">when</h6>
              <p class="modal__text">${dates.start.localDate} </p>
              <p class="modal__text-second"> ${dates.start.localTime}
                                  ${dates.timezone ? `(${dates.timezone})` : ''}
              </p>
            </li>

      <li class="modal__item">
              <h6 class="modal__h6">where</h6>
              <p class="modal__text">${_embedded.venues[0].city.name} , ${
    _embedded.venues[0].country.name
  }</p>
          <p class="modal__text-second"> ${_embedded.venues[0].name}</p>
            </li>




      <li class="modal__item">
              <h6 class="modal__h6">who</h6>
              <p class="modal__text">${
                _embedded.attractions ? _embedded.attractions[0].name : name
              }</p>
            </li>



    <li class="modal__item">

              <h6 class="modal__h6">prices</h6>
             <p class="modal__text"><svg class="modal__svg" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.91 1.27h-4.91v29.46h4.91v-29.46z"></path>
<path d="M17.26 1.27h-4.91v29.46h4.91v-29.46z"></path>
<path d="M24.699 1.27h-4.91v29.46h4.91v-29.46z"></path>
<path d="M44.19 1.27h-7.291v29.46h7.291v-29.46z"></path>
<path d="M9.82 1.27h-2.381v29.46h2.381v-29.46z"></path>
<path d="M29.46 1.27h-2.381v29.46h2.381v-29.46z"></path>
<path d="M34.37 1.27h-2.381v29.46h2.381v-29.46z"></path></svg>
Standard
              ${
                priceRanges
                  ? priceRanges.map(p => `  ${p.min}-${p.max}  ${p.currency}`)
                  : '-----'
              } </p>
              <button class="modal__btn" type="button">
              <a class="btn__text" href="${url}" target="_blank">BUY TICKETS</a></button>

              <p class="modal__text"><svg class="modal__svg" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.91 1.27h-4.91v29.46h4.91v-29.46z"></path>
<path d="M17.26 1.27h-4.91v29.46h4.91v-29.46z"></path>
<path d="M24.699 1.27h-4.91v29.46h4.91v-29.46z"></path>
<path d="M44.19 1.27h-7.291v29.46h7.291v-29.46z"></path>
<path d="M9.82 1.27h-2.381v29.46h2.381v-29.46z"></path>
<path d="M29.46 1.27h-2.381v29.46h2.381v-29.46z"></path>
<path d="M34.37 1.27h-2.381v29.46h2.381v-29.46z"></path></svg>
VIP
              ${
                priceRanges
                  ? priceRanges.map(p => `  ${p.min}-${p.max}  ${p.currency}`)
                  : '-----'
              } </p>
              <button class="modal__btn" type="button">
              <a class="btn__text" href="${url}" target="_blank">BUY TICKETS</a></button>
            </li>
          </ul>

</div>

<button class="modal__btn-author" type="button">MORE FROM THIS AUTHOR</button>


    `;
  eventId.innerHTML = markupId;
  
  const closeModalBtn = document.querySelector('[data-modal-close]');
  const moreAuthor = document.querySelector('.modal__btn-author');
 
  closeModalBtn.addEventListener('click', toggleModal); //event to close modal with event data by id

  //Function to load data after click "More from this author"
  moreAuthor.addEventListener('click', () => {
    inputValue = name;
    toggleModal();
    console.log(inputValue);
    currentPage = 1;
    searchEvents();
  })
}

//Function who read event id. Required to searchEventById function
function selectEvents(e) {
  const selectedEventsId = e.target.dataset.id;
  console.log(selectedEventsId);
  return selectedEventsId;
}

//Function to pagination. Change currentPage and fetch data with actual page
function setCurrentPage(e) {
  currentPage = Number(e.target.innerHTML);
  console.log(currentPage);
  const pageId = e.target.dataset.id;
  console.log(`pageId: ${pageId}`);

  searchEvents();

  createPagination(totalPage, currentPage);
}

//Function to hide and show modal
function toggleModal() {
  modal.classList.toggle('is-hidden');
}

pagination.addEventListener('click', setCurrentPage); //event to pagination

events.addEventListener('click', searchEventById); //event to search event by id
events.addEventListener('click', toggleModal); // event to hide and show modal

//event to search event by keyword and selected country
searchBtn.addEventListener('click', () => {
  events.innerHTML = '';
  inputValue = inputEvent.value;
  currentPage = 1;
  searchEvents();
});

difficultEvents(); //Function call to difficult event on first load page
