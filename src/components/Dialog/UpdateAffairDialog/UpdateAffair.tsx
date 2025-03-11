import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab } from "@mui/material";
import { deleteAffair, saveAffairs } from "../../../storage/AffairStorage";
import { AffairInterface, Plan, Routine } from "../../../types/AffairTypes";
import { AffairBox } from "../../../types/AffairBox";
import { deleteAffairBox, saveAffairBox } from "../../../storage/AffairBoxStorage";
import { getBoxInfoById } from "../../../utils/AffairUtils";
import { getAffairBoxById } from "../../../utils/BoxUtils";
import UpdatePlanForm from "./UpdatePlanForm";

interface Props {
    open: boolean;
    id: string;
    onClose: () => void;
}

const UpdateAffair: React.FC<Props> = ({ open, id, onClose }) => {
    const [updatedAffair, setUpdatedAffair] = useState<AffairInterface>(getBoxInfoById(id));
    const [updatedAffairBox, setUpdatedAffairBox] = useState<AffairBox>(getAffairBoxById(id));

    const handleUpdate = () => {
        if (!updatedAffair || !updatedAffairBox) {
            alert("No updated");
            return;
        }

        saveAffairs(updatedAffair);
        saveAffairBox(updatedAffairBox);
    }
    const handleDelete = () => {
        deleteAffair(id);
        deleteAffairBox(id);
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle>Checking Affair</DialogTitle>

            <Button onClick={handleDelete}>Delete</Button>

            <DialogContent>
                {updatedAffair.type === 'plan' 
                    && <UpdatePlanForm 
                        plan={updatedAffair as Plan}
                        affairBox={updatedAffairBox}
                        onUpdate={setUpdatedAffair}
                        onUpdateAffairBox={setUpdatedAffairBox}
                    />}
                {/* type is routine */}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>

        </Dialog>
    );
};

export default UpdateAffair;