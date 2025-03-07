import React, { useState } from "react";
import { CalendarCanvas } from "../../types/CalendarTypes";
import { getCurrentWeekDates } from "../../utils/DateUtils";
import DisplayColumn from "./CalendarDisplayColumn";
import AddDialog from "../Dialog/AddAffairDialog/AddDialog";

const DisplayCanvas: React.FC = () => {

    const [canvas, setCanvas] = useState<CalendarCanvas>(new CalendarCanvas(getCurrentWeekDates(new Date())));
    const [version, setVersion] = useState<number>(0);
    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);


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

    const handleAddDialogClose = () => {
        setCanvas(canvas.onUpdate(version));
        setVersion(version);
        setAddDialogOpen(false);
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

            <button onClick={() => setAddDialogOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '15px',
                    right: '15px',
                    padding: '12px 16px',
                    borderRadius: '50%',
                    backgroundColor: '#1976D2',
                    color: 'white',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer'
                }}>
                    +
            </button>

            <AddDialog open={addDialogOpen} onClose={() => handleAddDialogClose()} />
        </div>
    );
};

export default DisplayCanvas;