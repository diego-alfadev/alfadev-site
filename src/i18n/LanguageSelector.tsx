import { IoLanguage } from "react-icons/io5";
import { languages, ui } from "./locales";
import { getLangFromUrl, translatePath } from "./utils";

const labels = Object.entries(languages).map(([key, value]) => ({
    key,
    value,
}));


import React from 'react';

function LanguageSelector() {

    const currentLang = getLangFromUrl(new URL(window.location.href));
    const [showMenu, setShowMenu] = React.useState(false);

    function changeLang(lang: keyof typeof ui): void {
        console.log('Changing language to', lang)
        if (lang !== currentLang) {
            const url = new URL(window.location.href);
            const translatedPath = translatePath(url.pathname, lang);
            window.location.href = new URL(translatedPath, url).href
        }

    }

    return (
        <div className="flex items-center space-x-2">
            <button onClick={() => setShowMenu((last) => !last)} className="text-white bg-secondary hover:contrast-125 focus:ring-4 focus:outline-none focus:ring-secondary/50 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button">
                <IoLanguage className="w-4 h-4 mr-2" />
                <span className="text-xs">{currentLang.toUpperCase()}</span>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            {showMenu ? <div id="dropdownDivider" className="z-10 absolute top-10 bg-background/80 divide-y divide-gray-100 rounded-lg shadow shadow-background-contrast/20 w-44 left-4">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                    {labels.map((label) => (
                        <li key={label.key} onClick={() => changeLang(label.key as keyof typeof ui)} className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white  [&:not(:last-child)]:border-b">
                            <p className="text-sm">{label.value}</p>
                        </li>
                    ))}
                </ul>
            </div> : null}
        </div>
    )
}

export default LanguageSelector
