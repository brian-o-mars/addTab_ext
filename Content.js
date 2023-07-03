const button = document.querySelector('a');
  
button.addEventListener(
    'click', async () => {
        await chrome.tabs.create({index: 0, active: false, url: 'http://www.netflix.com'})

        var gId;
        var tId;
        const currentTab = chrome.tabs.query({currentWindow: true, active : true})
        currentTab.then((resp)=>{
            const groupId = resp[0].groupId;
            gId = groupId
            console.log(groupId);
            return groupId;
            
          })
        
        const newTab =  chrome.tabs.query({index: 0,})
        newTab.then((resp2)=>{
            const tabId = resp2[0].id;
            tId = tabId
            console.log(tabId);
            return tabId;
            
          })
        
        setTimeout(() => chrome.tabs.group({tabIds: tId, groupId: gId}), 1000)

     }
    
)   