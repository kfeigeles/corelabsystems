console.log('Hello, Sheet!');


// update on dom load
window.onload = requestJSON;

// update every 10 seconds
setInterval(requestJSON, 10000);

// request data from google sheets
function requestJSON() {
  fetch('https://spreadsheets.google.com/feeds/list/1dTOuO9euAqWvuBXB22o-JRPgOKidCGsblcVfAkiP5L4/default/public/values?alt=json')
    .then(response => response.json())
    .then(gotJSON);
}

// recieve response from google sheets
function gotJSON(json) {
  console.log('Update Data');
  const entries = json.feed.entry;

  const answersList = document.getElementById('answers');

  // clear existing items
  answersList.innerHTML = '';

  // add new items from JSON
  // eslint-disable-next-line
  for (const entry of entries) {
    // alias data
    const thoughts = entry.gsx$thoughtsonavocados.$t;
    const guac = entry.gsx$whataboutguac.$t;
    const green = entry.gsx$green.$t;

    // build li w/ template
    const newLi = document.createElement('li');
    newLi.innerHTML = `<a>${thoughts}<br>${guac}<br>${green}<br></a>`;
    answersList.appendChild(newLi);
  }

}
