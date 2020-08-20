figma.showUI(__html__);

async function getPhrase() {
    const wordNodes = figma.currentPage.findAll(node => node.type === 'TEXT');
    const phrase = [];
    for (let word of wordNodes) {
        await figma.loadFontAsync(word.fontName);
        // console.log(word.characters);
        phrase.push(word.characters);
    }
    return phrase;
}

figma.ui.onmessage = async msg => {
    const phrase = await getPhrase();
    if (msg.type === 'spellcheck') {
        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: 'spellcheck',
            message: phrase,
        });
    }

    if (msg.type === 'checked') {
        console.log('Spell checked!');
    }

    figma.closePlugin();
};
