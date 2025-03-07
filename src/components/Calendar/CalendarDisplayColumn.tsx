import React from "react";
import { CalendarColumn } from "../../types/CalendarTypes";
import ColumnBoxUnit from "./ColumnBoxUnit";
import { getDateString } from "../../utils/DateUtils";

interface Props {
    column: CalendarColumn
}

const DisplayColumn: React.FC<Props> = ({ column }) => {
    return (
        <div style={{ flex: 1, border: '1px sloid #ddd', padding: '4px' }}>
            <div>{getDateString(column.date)}</div>
            {column.boxes
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(box => (
                    <ColumnBoxUnit key={box.id} box={box} />
                ))}
        </div>
    );
};

export default DisplayColumn;
