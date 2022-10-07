import launcheHeadLessChrome from './src/FADCLauncher.js';

(async function() {
    
    console.log('Starting the process...');
    await launcheHeadLessChrome()
            .then((data) => { console.log('Process ended...', data) })

})();