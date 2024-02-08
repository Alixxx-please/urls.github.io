const input = document.getElementById('input');
const links = document.getElementById('links');

window.onload = () => {
    input.focus();
};

input.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        links.textContent = e.target.value;
    } else {
        links.textContent = 'Paste your url here:';
    };
    input.focus();
});

input.addEventListener('keydown', async(e) => {
    if (e.key.toLocaleLowerCase() === 'enter') {
        e.preventDefault();
        //const url = new URL('https://csclub.uwaterloo.ca/~phthakka/1pt-express/addURL');
        const url = input.value;
        //url.searchParams.append('long', input.value);
        //url.searchParams.append('url', input.value);

        api3(url);
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
    const link = `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`
    await fetch(link)
    .then(res => res.json())
    .then(data => {
        links.textContent = data.shorturl;
        navigator.clipboard.writeText(data.shorturl);
    })
    .catch(error => console.error('Error:', error));
};

async function api3(url) {
    const proxy = 'https://api.codetabs.com/v1/proxy?quest=';
    const link = `https://ulvis.net/api/write/post?url=${encodeURIComponent(url)}`;

    await fetch(proxy + link, {
        method: 'POST',
        mode: 'no-cors',    
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
}
