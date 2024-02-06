const input = document.getElementById('input');
const link = document.getElementById('link');

window.onload = () => {
    input.focus();
};

input.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        link.textContent = e.target.value;
    } else {
        link.textContent = 'Paste your url here:';
    };
    input.focus();
});

input.addEventListener('keydown', (e) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
        e.preventDefault();
        const url = new URL('https://csclub.uwaterloo.ca/~phthakka/1pt-express/addURL');
        url.searchParams.append('long', input.value);
        console.log(url);
        api(url);
    };
});

async function api(url) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        link.textContent = '1pt.co/' + data.short;
        navigator.clipboard.writeText(link.textContent);
    })
    .catch(error => console.error('Error:', error));
};