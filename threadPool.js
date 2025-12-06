const crypto = require('node:crypto');

// Synchronous version example
// console.log('Beginning log');
// const date = Date.now();
// crypto.pbkdf2Sync('password', 'helloWorld', 100000, 512, 'sha512')
// crypto.pbkdf2Sync('password', 'helloWorld', 100000, 512, 'sha512')
// crypto.pbkdf2Sync('password', 'helloWorld', 100000, 512, 'sha512')
// console.log('Execution time:', Date.now() - date);
// console.log('End log');


// Asynchronous version example
//
const MAX_CALLS = 3;
const start = Date.now();
for (let i = 0; i < MAX_CALLS; i++) {
    crypto.pbkdf2('password', 'helloWorld', 100000, 512, 'sha512', () => {
        console.log(`Execution time for call ${i + 1}:`, Date.now() - start);
    });
}
