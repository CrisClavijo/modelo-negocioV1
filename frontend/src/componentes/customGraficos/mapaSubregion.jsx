import React, { useEffect } from 'react';

export const GoogleTrends = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://ssl.gstatic.com/trends_nrtr/3316_RC01/embed_loader.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.trends.embed.renderExploreWidget('GEO_MAP', {
                'comparisonItem': [{ 'keyword': 'aifa', 'geo': 'MX', 'time': 'now 1-d' }],
                'category': 0,
                'property': ''
            }, {
                'exploreQuery': 'q=aifa&date=now%201-d&geo=MX&hl=es',
                'guestPath': 'https://trends.google.es:443/trends/embed/'
            });
        };
    }, []);

    return (
        <div id="trends-widget"></div>
    );
};

