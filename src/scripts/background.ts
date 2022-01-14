const deleteAllCookies = () => {
    chrome.cookies.onChanged.addListener((change) => {
        console.log(change);
    });
    chrome.windows.getCurrent(window => {
        chrome.tabs.query({active: true, windowId: window.id}, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id || 0, { event: "delete"}, (response) => {
                    console.log(response);
                });
                let url: URL;
                if (tabs[0].url) {
                    url = new URL(tabs[0].url);
                    console.log("hostname", url.hostname);
                    console.log("origin", url.origin);
                }
                chrome.cookies.getAll({}, (cookies) => {
                    cookies.forEach((cookie) => {
                        console.log("name", cookie.name)
                    })
                })
                // let url: URL;
                // if (tabs[0].url) {
                //     url = new URL(tabs[0].url);
                //     console.log(url.hostname);
                //     chrome.cookies.getAll({domain: url.hostname}, (cookies) => {
                //         console.log("Chrome cookies domain:", cookies);
                //     })
                // }
                // chrome.cookies.getAll({url: tabs[0].url}, (cookies) => {
                //     console.log("Chrome cookies url:", cookies);
                //     if (cookies.length > 0) {
                //         cookies.forEach((cookie) => {
                //         chrome.cookies.remove({url: tabs[0].url as string, name: cookie.name}, (deleted) => {console.log("Deleted ", deleted)})
                //         })
                //         chrome.tabs.reload(tabs[0].id || 0);
                //     } else {
                //     console.log("No cookies here")
                //     }
                // });
            } else {
                console.log("No tabs")
            }
        });
    })
}

export default deleteAllCookies;