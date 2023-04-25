import React from "react";
import Script from "react-load-script";


export const GoogleTrends = ({ type, comparison, keyword, geo, time, property }) => {
    const handleScriptLoad = () => {
        window.trends.embed.renderExploreWidgetTo(
            document.getElementById("widget"),
            type,
            {
                comparisonItem: comparison,
                category: 0,
                property: property
            },
            {
                exploreQuery: `q=${decodeURI(keyword)}&geo=${geo}}$date=${time}&gprop=${property}`,
                guestPath: "https://trends.google.es:443/trends/embed/"
            }
        );
    };
    return (<Script url="https://ssl.gstatic.com/trends_nrtr/3316_RC01/embed_loader.js" onLoad={handleScriptLoad} />);
}

export const GoogleTrendsActividades = ({ type, comparison, keyword, geo, time, property }) => {
    const handleScriptLoad = () => {
        window.trends.embed.renderExploreWidgetTo(
            document.getElementById("widget-actividades"),
            type,
            {
                comparisonItem: comparison,
                category: 0,
                property: property
            },
            {
                exploreQuery: `q=${decodeURI(keyword)}&geo=${geo}}$date=${time}&gprop=${property}`,
                guestPath: "https://trends.google.es:443/trends/embed/"
            }
        );
    };
    return (<Script url="https://ssl.gstatic.com/trends_nrtr/3316_RC01/embed_loader.js" onLoad={handleScriptLoad} />);
}

export const GoogleTrendsTimeSeries = ({ type, comparison, keyword, geo, time, property }) => {
    const handleScriptLoad = () => {
        window.trends.embed.renderExploreWidgetTo(
            document.getElementById("widget-time"),
            type,
            {
                comparisonItem: comparison,
                category: 0,
                property: property
            },
            {
                exploreQuery: `q=${decodeURI(keyword)}&geo=${geo}}$date=${time}&gprop=${property}`,
                guestPath: "https://trends.google.es:443/trends/embed/"
            }
        );
    };
    return (<Script url="https://ssl.gstatic.com/trends_nrtr/3316_RC01/embed_loader.js" onLoad={handleScriptLoad} />);
}