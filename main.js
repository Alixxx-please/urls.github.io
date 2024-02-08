const input = document.getElementById('input');
const links = document.getElementById('links');

window.onload = () => {
    input.focus();
};

input.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        links.textContent = e.target.value;
    } else {
        links.textContent = 'Ctrl + V or type your URL here:';
    };
    input.focus();
});

input.addEventListener('keydown', async(e) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
        e.preventDefault();
        //const url = new URL('https://csclub.uwaterloo.ca/~phthakka/1pt-express/addURL');
        let url = input.value;
        if (!url.startsWith('https://')) {
            url = 'https://' + url;
        }
        //url.searchParams.append('long', input.value);
        //url.searchParams.append('url', input.value);
        api4(url);
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
        links.textContent = '1pt.co/' + data.short;
        navigator.clipboard.writeText(links.textContent);
    })
    .catch(error => console.error('Error:', error));
};

async function api2(url) {
    await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => {
        links.textContent = data.shorturl;
        navigator.clipboard.writeText(data.shorturl);
    })
    .catch(error => console.error('Error:', error));
};

async function api3(url) {
    await fetch('https://api.allorigins.win/raw?url=' + 'https://ulvis.net/API/write/get?url=' + encodeURIComponent(`${url}`), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        links.textContent = data.data.url;
        navigator.clipboard.writeText(data.data.url);
    })
    .catch(error => console.error('Error:', error));
}

async function api4(url) {
    const link = new URL('https://spoo.me/');
    link.searchParams.append('url', url);
    console.log(link);
    await fetch(link, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        links.textContent = data.short_url;
        navigator.clipboard.writeText(links.textContent);
    })
    .catch(error => console.error('Error:', error));
};