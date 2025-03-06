import React from "react";
import { CalendarBox } from "../../types/CalendarBox";
import { getBoxColor } from "../../utils/BoxUtils";

interface Props {
    box: CalendarBox;
}

const ColumnBoxUnit: React.FC<Props> = ({ box }) => {
    const color = getBoxColor(box);
    return (
        <div
            style={{
                backgroundColor: color,
                margin: '4px 0',
                padding: '4px',
                borderRadius: '4px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}
            title={`${box.title} (${box.startTime} - ${box.endTime})`}
        >
            {box.title} ({box.startTime} - {box.endTime})
        </div>
    );
};

export default ColumnBoxUnit;