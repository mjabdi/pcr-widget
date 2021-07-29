import React, { useEffect, useState } from "react";
import BookService from "./services/BookService";
import "./WidgetChart.css";

export default function WidgetChart() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await BookService.getReportLast7();
        if (res.data.status === "OK") {
          setReport(res.data.result);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadData();
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          maxWidth: "430px",
          maxHeight: "410px",
          overflow: "hidden",
          fontFamily: "Lato,sans-serif",
        }}
      >
        {loading && <h4>...</h4>}

        {report && (
          <div>
            <p
              style={{
                margin: "0 0 10px",
                fontWeight: "600",
                fontSize: "1rem",
                wordSpacing: "5px",
                lineHeight: "1.5rem"

              }}
            >
              Last 7 Days  <span style={{color:"#009f40", textDecoration:"underline"}}>Live</span> PCR Test  <br/> Turn Around Time
            </p>
            <p
              style={{
                margin: "0 0 10px",
                fontWeight: "500",
                fontSize: "0.88rem",
                color: "#333",
              }}
            >
              Last 7 Days PCR Test Results Sent Within :
            </p>

            <div className="bar" style={{borderColor:"#009f40", color:"#009f40"}}>
              <div className="barBG" style={{width:`${report.lessThan12Percent/1.3}%`, background: "linear-gradient(274deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 5%, rgba(0,255,76,1) 100%)"}}/>  
              <div className="barText">12 Hours</div>
              <div className="barPercent">
                {roundUp(report.lessThan12Percent)}%
              </div>
            </div>

            <div className="bar" style={{color:"#00a1d9", borderColor:"#00a1d9"}}>
            <div className="barBG" style={{width:`${report.lessThan24Percent/1.3}%`, background: "linear-gradient(274deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 5%, rgba(0,189,255,1) 100%)"}}/>  

              <div className="barText">24 Hours</div>
              <div className="barPercent">
                {roundUp(report.lessThan24Percent)}%
              </div>
            </div>

            <div className="bar" style={{color:"rgba(154,0,255,1)" , borderColor: "rgba(154,0,255,1)"}}>
            <div className="barBG" style={{width:`${report.lessThan36Percent/1.3}%`, background: "linear-gradient(274deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 5%, rgba(154,0,255,1) 100%)"}}/>  
              <div className="barText">36 Hours</div>
              <div className="barPercent">
                {roundUp(report.lessThan36Percent)}%
              </div>
            </div>

            <div className="bar" style={{color:"rgba(255,0,65,1)", borderColor: "rgba(255,0,65,1)"}}>
            <div className="barBG" style={{width:`${report.lessThan48Percent/1.3}%`, background: "linear-gradient(274deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 5%, rgba(255,0,65,1) 100%)"}}/>  

              <div className="barText">48 Hours</div>
              <div className="barPercent">
                {roundUp(report.lessThan48Percent)}%
              </div>
            </div>
          </div>
        )}

        {/* <div className="Notice">
         * Update 19th July 2021, we have been advised this afternoon by our laboratory that turnaround times (TAT) are currently closer to 48 hours than 24.
        </div> */}

      </div>
    </React.Fragment>
  );
}

function roundUp(value) {
    return value
//   return Math.round(value);
}
