const searcher: HTMLElement | null = document.getElementById("searcher");
const btn: HTMLElement | null = document.getElementById("searchInChatButton");
const searchButton: HTMLElement | null = document.getElementById("SearchButton");
const span = document.getElementsByClassName("close")[0];
const searchField: HTMLInputElement | null = document.getElementById("searchField") as HTMLInputElement;
const countIndicator: HTMLSpanElement = document.getElementById("resultSet") as HTMLSpanElement;
const previousElement: HTMLElement | null = document.getElementById('previous');
const nextElement: HTMLElement | null = document.getElementById('next');
const close: HTMLElement | null = document.getElementById('close');

if (!!btn && !!span && !!searchField && !!searcher && !!searchButton && !!previousElement && !!nextElement && !!close) {
    btn.addEventListener('click', () => searcher.style.display = "block");
    span.addEventListener('click', () => searcher.style.display = "none");
    searchButton.addEventListener('click', () => searchInChat());
    previousElement.addEventListener('click', () => previous());
    nextElement.addEventListener('click', () => next());
    close.addEventListener('click', () => hideAllHighlights())
}

let currentChatLines: HTMLElement[] = [];
let currentChatCounter: number = 0;
const hideAllHighlights = () => {
    currentChatLines.forEach((el: HTMLElement) => el.style.backgroundColor = 'transparent')
}
const previous = (): void => {
    if (currentChatCounter < 1) return;
    countIndicator.innerText = currentChatLines.length > 0 ? `${currentChatCounter}/${currentChatLines.length.toString()}` : '0/0';
    countIndicator.style.display = 'inline';
    currentChatLines[currentChatCounter].style.backgroundColor = 'transparent';

    currentChatLines[currentChatCounter - 1].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    currentChatLines[currentChatCounter - 1].style.backgroundColor = '#7d0202';
    currentChatCounter--
};

const next = (): void => {
    if (currentChatCounter + 1 >= currentChatLines.length) return;
    countIndicator.innerText = currentChatLines.length > 0 ? `${currentChatCounter + 2}/${currentChatLines.length.toString()}` : '0/0';
    countIndicator.style.display = 'inline';
    currentChatLines[currentChatCounter].style.backgroundColor = 'transparent';

    currentChatLines[currentChatCounter + 1].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    currentChatLines[currentChatCounter + 1].style.backgroundColor = '#7d0202';
    currentChatCounter++;
};

const searchInChat = (): void => {
    const value = searchField?.value;
    if (!!value) {
        countIndicator.innerText = '';
        countIndicator.style.display = 'none';
        currentChatLines = [];
    }

    const allChatLines: HTMLElement[] = Array.from(document.getElementsByClassName("message-text") as HTMLCollectionOf<HTMLElement>);
    currentChatLines = allChatLines.filter((chatElement: HTMLElement) => chatElement.innerText.toLowerCase().includes(value.toLowerCase()) && chatElement.style.display !== 'none');

    countIndicator.innerText = currentChatLines.length > 0 ? `1/${currentChatLines.length.toString()}` : '0/0';
    countIndicator.style.display = 'inline';
    if (currentChatLines.length > 0) {
        currentChatLines[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
        currentChatLines[0].style.backgroundColor = '#7d0202';
        currentChatCounter = 0;
    }
};

export {}

