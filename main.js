const input = document.getElementById('input');
const links = document.querySelectorAll('#links');
const providers = document.querySelectorAll('.provider');
const container = document.querySelector('.container');
let index = 0;
let value = '';

window.onload = () => {
    input.focus();
    anim();
};

document.addEventListener('click', () => {
    input.focus();
})

function anim() {
    providers.forEach(provider => {
        provider.style.display = 'none';
    });
    providers[index].style.display = 'block';
};

input.addEventListener('input', (e) => {
    value = e.target.value;
    links.forEach(link => {
        link.textContent = value ? value : 'Ctrl + V or type your URL here';
    });
    input.focus();
});

input.addEventListener('keydown', (e) => {
    switch (e.key.toLocaleLowerCase()) {
        case 'enter':
            e.preventDefault();
            let urls = input.value;
            if (!urls.startsWith('https://')) {
                urls = 'https://' + urls;
            }
            providers[index].style.cursor = 'pointer';
            switch (true) {
                case providers[index].textContent.includes('1pt.co'):
                    const url1 = new URL('https://csclub.uwaterloo.ca/~phthakka/1pt-express/addURL');
                    url1.searchParams.append('long', urls);
                    api(url1).then(() => {
                        providers[index].addEventListener('click', () => {
                            navigator.clipboard.writeText('1pt.co/' + links[0].textContent);
                        });
                    });
                    break;
                case providers[index].textContent.includes('is.gd'):
                    api2(urls).then(() => {
                        providers[index].addEventListener('click', () => {
                            navigator.clipboard.writeText('is.gd/' + links[1].textContent);
                        });
                    });
                    break;
                case providers[index].textContent.includes('spoo.me'):
                    api3(urls).then(() => {
                        providers[index].addEventListener('click', () => {
                            navigator.clipboard.writeText('spoo.me/' + links[2].textContent);
                        });
                    });;
                    break;
                case providers[index].textContent.includes('ulvis.net'):
                    const url2 = new URL('https://ulvis.net/API/write/get');
                    url2.searchParams.append('url', urls);
                    api4(url2).then(() => {
                        providers[index].addEventListener('click', () => {
                            navigator.clipboard.writeText('ulvis.net/' + links[3].textContent);
                        });
                    });;
                    break;
            };
            break;
        case 'arrowup':
            e.preventDefault();
            if (index > 0) {
                index--;
            }
            providers.textContent = providers[index];
            anim();
            links.textContent = value;
            break;
        case 'arrowdown':
            e.preventDefault();
            if (index < providers.length - 1) {
                index++;
            }
            providers.textContent = providers[index];
            anim();
            links.textContent = value;
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
        links[0].textContent = data.short;
        navigator.clipboard.writeText('1pt.co/' + links[0].textContent);
    })
    .catch(error => console.error('Error:', error));
};

async function api2(url) {
    await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => {
        links[1].textContent = data.shorturl.substring(14);
        navigator.clipboard.writeText(data.shorturl);
    })
    .catch(error => console.error('Error:', error));
};

async function api3(url) {
    const link = new URL('https://spoo.me/');
    link.searchParams.append('url', url);
    await fetch(link, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => {
        links[2].textContent = data.short_url.substring(16);
        navigator.clipboard.writeText(data.short_url);
    })
    .catch(error => console.error('Error:', error));
};

async function api4(url) {
    console.log('https://crossorigin.me/' + url)
    await fetch('https://api.allorigins.win/get?url=' + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        parsedData = JSON.parse(data.contents);
        links[3].textContent = parsedData.data.url.substring(18);
        navigator.clipboard.writeText(parsedData.data.url);
    })
    .catch(error => console.error('Error:', error));
}