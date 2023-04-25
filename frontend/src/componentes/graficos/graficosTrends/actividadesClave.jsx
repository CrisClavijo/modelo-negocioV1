import { GoogleTrendsActividades } from "./defaultTrends";
import '../../../App.css';

const ActividadesClaveGoogleTrends = () => {
    const keywords = ["/g/11jcmyp2nh"];
    const geo = "MX";
    const time = "today 12-m";
    const property = "";
    const comparison = keywords.map((q) => ({ keyword: q, geo: geo, time: time }));
    const keyword = keywords.join();
    /*console.log(comparison);
    console.log(keyword);*/
    return (
        <div id="widget-actividades">
            
            {keywords.map((q, index) => {
                return <GoogleTrendsActividades
                    type={keywords.length > 1 ? `RELATED_QUERIES_${index}` : `RELATED_QUERIES`}
                    comparison={comparison}
                    keyword={q}
                    geo={geo}
                    time={time}
                    property={property}
                />;
            })}

            {keywords.length === 1 ? keywords.map((q, index) => {
                return <GoogleTrendsActividades
                    type={`RELATED_TOPICS`}
                    comparison={comparison}
                    keyword={q}
                    geo={geo}
                    time={time}
                    property={property}
                />;
            }) : ""}
        </div>
    );
}

export default ActividadesClaveGoogleTrends;


