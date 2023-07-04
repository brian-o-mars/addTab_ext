//Selects the buttom tag from the extension popup and saves it to 'button'
const button = document.querySelector("a");

button.addEventListener("click", async () => {
  //Creates a new tab and makes it the first tab on your screen.
  await chrome.tabs.create({ index: 0, active: false });

  //Initializing variables
  var gId;
  var tId;
  var tIndex;

  //Using 'query' api to select the tab the user is currently on. This would most likely be the tab they are creating the new tab from.
  const currentTab = chrome.tabs.query({ currentWindow: true, active: true });

  //Handling the promise response. Here the Id of the group the current tab is in is saved to the initialized gId variable.
  //The index of the current tab is also saved to the tIndex variable.
  currentTab.then((resp) => {
    const groupId = resp[0].groupId;
    gId = groupId;
    const index = resp[0].index;
    tIndex = index;
  });

  //Using 'query' api to select the new tab created. The new tab was created an placed at index 0.
  const newTab = chrome.tabs.query({ index: 0 });

  //Handling the promise response. Here the Id of the new tab is in is saved to the initialized tId variable.
  newTab.then((resp2) => {
    const tabId = resp2[0].id;
    tId = tabId;
  });

  //Using the 'move' api to move the new tab create to the left of the current tab.
  setTimeout(() => chrome.tabs.move(tId, { index: tIndex }), 10);

  //Using the 'update' api to update the new tab created to become the active tab.
  setTimeout(() => chrome.tabs.update(tId, { active: true }), 10);

  //Using the 'group' api to move the new tab created to group of the initial current tab where the new tab was created.
  //This is done in case the initial current tab where the new tab was created was the last tab in the group.
  //Ordinarily, the new tab created would be moved to the left of the the initial current tab and in this case,
  //the new tab would be placed outside the group, so here, we add the new tab to the group.
  setTimeout(() => chrome.tabs.group({ tabIds: tId, groupId: gId }), 10);
});
