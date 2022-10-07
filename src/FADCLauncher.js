import chromeLauncher from 'chrome-launcher';
import CDP from 'chrome-remote-interface';

export default async function launcheHeadLessChrome() {

    async function launcheChrome() {
        return await chromeLauncher.launch({
            chromeFlags: [
                //'--headless',
                '--disable-gpu',
                '--blink-settings=imagesEnabled=false'
            ]
        });
    }

    const chrome = await launcheChrome();
    const protocol = await CDP({ port: chrome.port});

    const {
            DOM,
            Page,
            Emulation,
            Runtime
    } = protocol;
    await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

    Page.navigate({
        url: 'https://www.fragrantica.com/perfume/Tom-Ford/Tobacco-Vanille-1825.html'
    });
    
    Page.loadEventFired(async() => {
        
        console.log("Loading chrome...");
        
        const script1 = "document.querySelector('title').textContent"
        const result = await Runtime.evaluate({
            expression: script1
        });
        
        console.log("Printing on console:: ", result.result.value);

        setTimeout(() => {
            protocol.close();
            chrome.kill(); 
        }, 5000);

        return Promise.resolve("success");

    });

}