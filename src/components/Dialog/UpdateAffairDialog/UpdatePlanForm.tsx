import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-clock/dist/Clock.css";
import "../../../styles/Dialog/Dialog.css"
import { Plan } from "../../../types/AffairTypes";
import { AffairBox } from "../../../types/AffairBox";
import { v4 as uuidv4 } from "uuid";


interface Props {
    plan: Plan
    affairBox: AffairBox;
    onUpdate: (updatedPlan: Plan) => void;
    onUpdateAffairBox: (updatedBox: AffairBox) => void;
}

const UpdatePlanForm: React.FC<Props> = ({ plan, affairBox, onUpdate, onUpdateAffairBox }) => {
    const [title, setTitle] = useState(plan.title);
    const [content, setContent] = useState(plan.content);
    const [date, setDate] = useState<Date | null>(plan.date);
    const [startTime, setStartTime] = useState<string>(plan.startTime);
    const [endTime, setEndTime] = useState<string>(plan.endTime);

    const [color, setColor] = useState(affairBox.color);

    const colorOptions = [
        '#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', 
        '#85E3FF', '#B9FBC0', '#FF9CEE', '#AFCBFF'
    ];

    useEffect(() => {
        setTitle(plan.title);
        setContent(plan.content);
        setDate(plan.date);
        setStartTime(plan.startTime);
        setEndTime(plan.endTime);
        setColor(affairBox.color);
    }, [plan]);

    const handleUpdate = () => {
        const updatedPlan = new Plan(
            plan.id,
            title,
            content,
            date ? date : new Date(),
            startTime,
            endTime
        );
        const updatedBox = new AffairBox(
            affairBox.id,
            color
        );
        onUpdate(updatedPlan);
        onUpdateAffairBox(updatedBox);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <TextField label='Title' value={title} onChange={e => setTitle(e.target.value)} />

            <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                <label style={{ marginBottom: '4px', fontWeight: 'bold' }}>Select Date</label>
                <DatePicker selected={date} onChange={e => setDate(e)} required dateFormat='Pp' />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontWeight: 'bold' }}>Start Time</label>
                    <TimePicker value={startTime} onChange={e => setStartTime(e ? e : '08:00')} required />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontWeight: 'bold' }} >End Time</label>
                    <TimePicker value={endTime} onChange={e => setEndTime(e ? e : '09:00')} required />
                </div>
            </div>

            <TextField label='Content' value={content} rows={3} multiline onChange={e => setContent(e.target.value)} />

            <TextField select label="Color" value={color} onChange={(e => setColor(e.target.value))}>
                {colorOptions.map((option) => (
                    <MenuItem key={option} value={option} style={{ backgroundColor: option }}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default UpdatePlanForm;