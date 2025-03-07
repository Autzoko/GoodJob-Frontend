import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tabs, Tab } from "@mui/material";
import { saveAffairs } from "../../../storage/AffairStorage";
import { AffairInterface, Plan } from "../../../types/AffairTypes";
import AddPlanForm from "./AddPlanDialog";
import { AffairBox } from "../../../types/AffairBox";
import { saveAffairBox } from "../../../storage/AffairBoxStorage";

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddDialog: React.FC<Props> = ({ open, onClose})=> {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [affairBox, setAffairBox] = useState<AffairBox | null>(null);

    const [newPlan, setNewPlan] = useState<Plan | null>(null);

    const handleSave = () => {
        if (activeTab === 0) {
            if (!newPlan) {
                alert("Plan cannot be empty");
                return;
            }
            saveAffairs(newPlan);

            if (!affairBox) {
                alert("Color cannot be empty");
                return;
            }
            saveAffairBox(affairBox);
        } else if (activeTab === 1) {
            console.log("Tab for new routine");
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle>New Affair</DialogTitle>

            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                <Tab label="Plan" />
                <Tab label="Routine" />
            </Tabs>

            <DialogContent>
                {activeTab === 0 && <AddPlanForm onSave={setNewPlan} onSaveAffairBox={setAffairBox} />}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialog;