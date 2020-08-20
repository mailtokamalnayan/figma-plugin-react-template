import * as React from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

async function getApiResponse(message) {
    console.log('API Response for:', message);
    try {
        let response = await fetch(`https://reqres.in/api/users/2`);
        console.log('API Data:', response);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

const App = ({}) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);

    // const countRef = React.useCallback((element: HTMLInputElement) => {
    //     if (element) element.value = '5';
    //     textbox.current = element;
    // }, []);

    const onCreate = React.useCallback(() => {
        // console.log('Hello world from App.tsx');
        // const count = parseInt(textbox.current.value, 10);
        parent.postMessage({pluginMessage: {type: 'spellcheck'}}, '*');
    }, []);

    const onCancel = React.useCallback(() => {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    }, []);
    // const getApiResponse = React.useCallback(async message => {
    //     console.log('Get API Response called');
    //     let response = await fetch(`http://localhost:3000/?phrase=${message}`);
    //     let data = await response.json();
    //     console.log('API Data');

    //     // parent.postMessage({pluginMessage: {type: 'checked', data}}, '*');
    // }, []);

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = event => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'spellcheck') {
                // var request = new XMLHttpRequest();
                // request.open('GET', `http://localhost:3000/?phrase=${message}`);
                // request.onload = () => {
                //     console.log('From the response:', request.response);
                //     // parent.postMessage({pluginMessage: request.response}, '*');
                // };
                // request.send();
                getApiResponse(message[0]);
            }
        };
    }, []);

    return (
        <div>
            <button id="create" onClick={onCreate}>
                Spellcheck
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default App;
