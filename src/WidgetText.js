import React, { useEffect, useState } from "react";
import BookService from "./services/BookService";

export default function WidgetText() {
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
      {loading && <h4 style={{textAlign:"center"}}>...</h4>}

      {report && (
        <div
          style={{
            fontSize: "19px",
            fontWeight: "700",
            fontFamily: "Lato,sans-serif",
            color: "#5d5d5d",
            textAlign:"center",
            lineHeight:"1.42857143"
          }}
        >
          <p style={{ margin: "0 0 10px" }}>{roundUp(report.lessThan12Percent)}% REPORTED UNDER 12 HOURS</p>
          <p style={{ margin: "0 0 10px" }}>{roundUp(report.lessThan24Percent)}% REPORTED UNDER 24 HOURS</p>
          <p style={{ margin: "0 0 10px" }}>{roundUp(report.lessThan36Percent)}% REPORTED UNDER 36 HOURS</p>
          <p style={{ margin: "0 0 10px" }}>{roundUp(report.lessThan48Percent)}% REPORTED UNDER 48 HOURS</p>
        </div>
      )}
    </React.Fragment>
  );
}

function roundUp (value) {
    return Math.round(value)
}

