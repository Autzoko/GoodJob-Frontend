import React, { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-clock/dist/Clock.css";
import { Plan } from "../../../types/AffairTypes";
import { AffairBox } from "../../../types/AffairBox";
import { v4 as uuidv4 } from "uuid";



interface Props {
    onSave: (plan: Plan) => void;
    onSaveAffairBox: (box: AffairBox) => void;
}

const AddPlanForm: React.FC<Props> = ({ onSave, onSaveAffairBox }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState<Date | null>(new Date());
    const [startTime, setStartTime] = useState<string>('08:00');
    const [endTime, setEndTime] = useState<string>('09:00');

    const [color, setColor] = useState('#FFDDC1');

    const colorOptions = [
        '#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', 
        '#85E3FF', '#B9FBC0', '#FF9CEE', '#AFCBFF'
    ];

    useEffect(() => {
        const id = `cld-plan-${uuidv4()}`;
        const newPlan = new Plan(
            id,
            title,
            content,
            date ? date : new Date(),
            startTime,
            endTime
        );
        const newAffairBox = new AffairBox(
            id,
            color
        );
        onSave(newPlan);
        onSaveAffairBox(newAffairBox);
    }, [title, content, date, startTime, endTime, color, onSave, onSaveAffairBox]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <TextField label='Title' value={title} onChange={e => setTitle(e.target.value)} />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '4px', fontWeight: 'bold' }}>Select Date</label>
                <DatePicker selected={date} onChange={e => setDate(e)} required dateFormat='Pp' />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontWeight: 'bold' }}>Start Time</label>
                    <TimePicker value={startTime} onChange={e => setStartTime(e ? e : '08:00')} required />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontWeight: 'bold'}} />
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

export default AddPlanForm;