// importing axioss
import axios from 'axios';

const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //

  // Creating the parent element and adding its needed class
  const topicsDiv = document.createElement('div');
  topicsDiv.classList.add('topics');

  // Looping over the given array
  topics.forEach(topic => {
    // creating a new tab for each item in the array and giving it the needed class and setting its text content
    const tab = document.createElement('div');
    tab.classList.add('tab');
    tab.textContent = topic;
    // appending each new tab to the parent div
    topicsDiv.appendChild(tab);
  });

  // returning the new Tab component
  return topicsDiv;
}

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //

  // Making a GET request to `https://lambda-times-api.herokuapp.com/topics`
  axios.get('https://lambda-times-api.herokuapp.com/topics')
    .then(res => {
      // Selecting the parent element and appending a new Tab component to it, passing in the data from the GET request
      document.querySelector(`${selector}`).appendChild(Tabs(res.data.topics))
    })
    .catch(err => console.log(err)); // error handling

}

export { Tabs, tabsAppender }
