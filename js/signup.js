/**
 * setup subscription module
 */
export function initForm() {
    const submitButton = document.querySelector('button');
    const formWrapper = document.querySelector('article div');
    submitButton.addEventListener('click', submit);

    function submit() {
        const email = document.querySelector('input').value;
        if(!testEmail(email)) {
            alert('Please provide a valid email address');
            return;
        }
        sendSubscription(email).then(displayResponse);
        formWrapper.innerHTML = `<p>Please wait...</p>`
    }

    function testEmail(email) {
        return (email.indexOf('@') > -1 && email.indexOf('.') > -1);
    }

    function sendSubscription(email) {
        const payload = { email };
        const getJson = response => response.json();

        return fetch('https://shed.instart.design', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(getJson);
    }

    function displayResponse(rsp) {
        if (rsp.status == 'ok') {
            formWrapper.innerHTML = `<p>Thank you, I'll let you know when it's done.</p>`
        }
    }
}
