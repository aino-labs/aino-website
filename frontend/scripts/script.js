"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);
    const formResult = document.querySelector('.b2b__form--result');
    async function formSend(e) {
        e.preventDefault();

        const formData = new FormData(form);
            form.classList.add('_loading');

            let response = await fetch('./scripts/sendmail.php', {
                method: 'POST',
                body: formData
            });

            let result = await response.text();

            if (result.trim() === 'OK') {
                form.classList.remove('_loading');
                formResult.classList.add('_success');
                formResult.textContent = "Форма успешно отправлена."
                setTimeout(() => {
                    formResult.classList.remove('_success');
                    formResult.textContent = '';
                }, 3000);
                form.reset();
            } else {
                form.classList.remove('_loading');
                formResult.classList.add('_fail'); 
                formResult.textContent = "Форма не отправилась. Попробуйте позже."
                setTimeout(() => {
                    formResult.classList.remove('_fail');
                    formResult.textContent = '';
                }, 3000);
            }
    }

    let details = document.querySelectorAll("details");
    for (let i=0; i < details.length; i++) {
        details[i].addEventListener("toggle", accordion);
    }
    function accordion(event) {
        if (!event.target.open) return;
        let details = event.target.parentNode.children;
        for(let i=0; i < details.length; i++) {
            if (details[i].tagName != "DETAILS" || 
                !details[i].hasAttribute('open') || 
                event.target == details[i]) {
                    continue;
                }
            details[i].removeAttribute("open");
        }
    }
});

