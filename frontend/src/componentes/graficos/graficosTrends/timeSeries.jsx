import { GoogleTrendsTimeSeries } from "./defaultTrends";
import '../../../App.css';

const TimeSeriesGoogleTrends = () => {
    const keywords = ["/g/11jcmyp2nh"];
    const geo = "MX";
    const time = "today 12-m";
    const property = "";
    const comparison = keywords.map((q) => ({ keyword: q, geo: geo, time: time }));
    const keyword = keywords.join();
    /*console.log(comparison);
    console.log(keyword);*/
    return (
        <div id="widget-time">
            <div className="trends">
                <GoogleTrendsTimeSeries
                    type="TIMESERIES"
                    comparison={comparison}
                    keyword={keyword}
                    geo={geo}
                    time={time}
                    property={property}
                />
            </div>
        </div>
    );
}

export default TimeSeriesGoogleTrends;


