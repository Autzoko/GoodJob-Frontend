import React, { useState } from "react";
import { CalendarBox } from "../../types/CalendarBox";
import { getBoxColor } from "../../utils/BoxUtils";
import UpdateAffair from "../Dialog/UpdateAffairDialog/UpdateAffair";

interface Props {
    box: CalendarBox;
}

const ColumnBoxUnit: React.FC<Props> = ({ box }) => {
    const color = getBoxColor(box);
    const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);

    const handleClick = () => {
        setUpdateDialogOpen(true);
    };

    return (
        <>
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
                onClick={handleClick}
            >
                {box.title} ({box.startTime} - {box.endTime})
            </div>

            <UpdateAffair open={updateDialogOpen} id={box.id} onClose={() => setUpdateDialogOpen(false)} />
        </>
    );
};

export default ColumnBoxUnit;