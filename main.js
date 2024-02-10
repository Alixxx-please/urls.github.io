const input = document.getElementById('input');
const links = document.getElementById('links');
const providers = document.querySelectorAll('.provider');
let index = 0;

window.onload = () => {
    input.focus();
};

function text(index, direction) {
    providers.forEach((provider, i) => {
        provider.style.opacity = 0;
        provider.classList.remove('up', 'down');
    });

    providers[index].style.opacity = 1;

    if (direction === 'up' && index > 0) {
        providers[index - 1].classList.add('up');
    } else if (direction === 'down' && index < providers.length - 1) {
        providers[index + 1].classList.add('down');
    }
};

input.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        links.textContent = e.target.value;
    } else {
        links.textContent = 'Ctrl + V or type your URL here:';
    };
    input.focus();
});

input.addEventListener('keydown', (e) => {
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
    switch (e.key.toLocaleLowerCase()) {
        case 'enter':
            //soon
            break;
        case 'arrowup':
            if (index > 0) {
                index--;
            }
            providers.textContent = providers[index];
            text(index, 'up');
            break;
        case 'arrowdown':
            if (index < providers.length - 1) {
                index++;
            }
            providers.textContent = providers[index];
            text(index, 'down');
            break;
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