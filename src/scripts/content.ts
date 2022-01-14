// const deleteAllCookies = (): void => {
//     if (chrome.tabs) {
//         chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//             let url = tabs[0].url;
//             if (url) {
//                 const urlObject = new URL(url);
//                 url = urlObject.protocol + "//" + urlObject.hostname;
//             }
//             console.log("Url is: ", url);
//             chrome.cookies.getAll({url}).then((cookies: chrome.cookies.Cookie[]) => {
//                 console.log("All cookies:", cookies);
//                 if (cookies.length > 0) {
//                     cookies.forEach((cookie) => {
//                         chrome.cookies.remove({url: url as string, name: cookie.name}, (deleted) => {console.log("Deleted ", deleted)})
//                     })
//                 } else {
//                     console.log("No cookies here")
//                 }
//             });
//             chrome.cookies.getAllCookieStores().then((cookies: chrome.cookies.CookieStore[]) => {
//                 console.log("All cookieStores :", cookies);
//                 if (cookies.length > 0) {
//                     cookies.forEach((cookieStore) => {
//                         chrome.cookies.remove({url: url as string, name: cookieStore.id}, (deleted) => {console.log("Deletd store: ", deleted)});
//                     })
//                 } else {
//                     console.log("No cookieStores here")
//                 }
//             });
//         });
//     }
// }

// Function called when a new message is received
export const contentListener = (
    msg: {event: "delete"},
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: {status: string}) => void) => {

    console.log('[content.js]. Message received', msg);
    console.log("Current local storage", window.localStorage);
    console.log("Deleting cookies");
    window.localStorage.clear();
    console.log("Empty local storage", window.localStorage);
    console.log(document.cookie.split(";"));
    // for (const cookie in document.cookie.split(";")) {
        
    // }

    // Prepare the response object with information about the site
    const response: {status: string} = {
        status: "success"
    };

    sendResponse(response);
}

chrome.runtime.onMessage.addListener(contentListener);