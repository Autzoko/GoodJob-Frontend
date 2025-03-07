import React, { useState, useEffect } from "react";
import { CalendarCanvas, CalendarColumn } from "../../types/CalendarTypes";
import { loadAffairs, saveAffairs } from "../../storage/AffairStorage";
import { loadAffairBoxes, saveAffairBoxes } from "../../storage/AffairBoxStorage";
import { getCurrentWeekDates } from "../../utils/DateUtils";
import DisplayColumn from "./CalendarDisplayColumn";

const DisplayCanvas: React.FC = () => {

    const [canvas, setCanvas] = useState<CalendarCanvas>(new CalendarCanvas(getCurrentWeekDates(new Date())));
    const [version, setVersion] = useState<number>(0);

    const handleNextWeek = () => {
        if (canvas.getNextWeek()) {
            setVersion(version + 1)
            setCanvas(canvas.onUpdate(version + 1));

        } else {
            console.log("malfunction: getNextWeek");
        }
    }
    const handlePrevWeek = () => {
        if (canvas.getPrevWeek()) {
            setVersion(version - 1);
            setCanvas(canvas.onUpdate(version - 1));
        } else {
            console.log("malfunction: getPrevWeek");
        }
    }

    return (
        <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <button onClick={handlePrevWeek}>Previous</button>

                <h2>
                    Weekly Calendar
                </h2>

                <button onClick={handleNextWeek}>Next</button>
            </div>

            <div key={version} style={{ display: 'flex', border: '1px solid #ddd' }}>
                {canvas.columns.map(col => {
                    return (
                        <DisplayColumn column={col} />
                    );
                })}
            </div>
        </div>
    );
};

export default DisplayCanvas;