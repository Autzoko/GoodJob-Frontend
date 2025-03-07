import React, { useState, useEffect } from "react";
import { CalendarCanvas, CalendarColumn } from "../../types/CalendarTypes";
import { loadAffairs, saveAffairs } from "../../storage/AffairStorage";
import { loadAffairBoxes, saveAffairBoxes } from "../../storage/AffairBoxStorage";
import { getCurrentWeekDates } from "../../utils/DateUtils";
import DisplayColumn from "./CalendarDisplayColumn";
import { v4 as uuidv4 } from "uuid";

const DisplayCanvas: React.FC = () => {

    const [canvas, setCanvas] = useState<CalendarCanvas>(new CalendarCanvas(getCurrentWeekDates(new Date())));
    const [version, setVersion] = useState<string>("initial-version");

    const handleNextWeek = () => {
        if (canvas.getNextWeek()) {
            const new_version = uuidv4();
            setVersion(new_version);
            setCanvas(canvas.onUpdate(new_version));

        } else {
            console.log("malfunction: getNextWeek");
        }
    }
    const handlePrevWeek = () => {
        if (canvas.getPrevWeek()) {
            const new_version = uuidv4();
            setVersion(new_version);
            setCanvas(canvas.onUpdate(new_version));
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