export const getAndremoveDomaincookies = (fullURL: string, tabid: number): boolean | null => {
    const urlObject = new URL(fullURL);
    const domain = urlObject.hostname;
    chrome.cookies.getAll({domain: domain}, (cookies) => {
        if (cookies.length > 0) {
            cookies.forEach((cookie) => {
                chrome.cookies.remove({name: cookie.name, url: cookie.domain}, (removed) => {
                    console.log(removed);
                })
            });
            chrome.tabs.reload(tabid || 0);
            return true;
        } else {
            return null;
        }
    })
    return false;
}