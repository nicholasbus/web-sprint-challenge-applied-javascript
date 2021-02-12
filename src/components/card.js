// importing axios
import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  
  // Creating each needed element
  const card = document.createElement('div');
  const headline = document.createElement('div');
  const author = document.createElement('div');
  const imgContainer = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');

  // appending each child element to the parent card div
  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgContainer);
  author.appendChild(span);
  imgContainer.appendChild(img);

  // adding all of the text and attributes
  headline.textContent = article.headline;
  img.src = article.authorPhoto;
  span.textContent = `By ${article.authorName}`;

  // adding all of the classes
  card.classList.add('card');
  headline.classList.add('headline');
  author.classList.add('author');
  imgContainer.classList.add('img-container');

  // adding the event listener
  card.addEventListener('click', e => console.log(headline.textContent));

  // returning the new Card component
  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  // making a GET request to `https://lambda-times-api.herokuapp.com/articles`
  axios.get('https://lambda-times-api.herokuapp.com/articles')
    .then(res => {
      // looping over the returned data with a For In loop
      for(let topic in res.data.articles){
        // Nesting a For In loop in order to access each individual nested object
        for(let article in res.data.articles[topic]){
          // Selecting a parent element and appending the created Card to it
          document.querySelector(`${selector}`).appendChild(Card(res.data.articles[topic][article]));
        }
      }
    })
    .catch(err => console.log(err)); // Error handling
}

export { Card, cardAppender }
