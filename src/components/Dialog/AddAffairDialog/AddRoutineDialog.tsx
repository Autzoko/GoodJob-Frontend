import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import WeekDayToggle from "./Toggle/WeekDayToggle";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { Routine } from "../../../types/AffairTypes";
import { AffairBox } from "../../../types/AffairBox";
import { v4 as uuidv4 } from "uuid";

import 'react-time-picker/dist/TimePicker.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-clock/dist/Clock.css";

interface Props {
    onSave: (routine: Routine) => void;
    onSaveAffairBox: (box: AffairBox) => void;
}

const AddRoutineForm: React.FC<Props> = ({ onSave, onSaveAffairBox }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const [startTime, setStartTime] = useState<string>("08:00");
    const [endTime, setEndTime] = useState<string>("09:00");

    const [color, setColor] = useState('#FFDDC1');

    const colorOptions = [
        '#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF',
        '#85E3FF', '#B9FBC0', '#FF9CEE', '#AFCBFF'
    ];

    useEffect(() => {
        const id = `cld-routine-${uuidv4()}`;
        const newRoutine = new Routine(
            id,
            title,
            content,
            startDate ? startDate : new Date(),
            endDate ? endDate : new Date(),
            weekDays,
            startTime,
            endTime,
            []
        );
        const newAffairBox = new AffairBox(
            id,
            color
        );
        onSave(newRoutine);
        onSaveAffairBox(newAffairBox);
    }, [title, content, startDate, endDate, weekDays, startTime, endTime, [], color, onSave, onSaveAffairBox]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <TextField label='Title' value={title} onChange={e => setTitle(e.target.value)} />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontWeight: 'bold' }}>Start Date</label>
                    <DatePicker selected={startDate} onChange={e => setStartDate(e)} required dateFormat="Pp" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontWeight: 'bold' }}>End Date</label>
                    <DatePicker selected={endDate} onChange={e => setEndDate(e)} required dateFormat="Pp" />
                </div>
            </div>

            <div>
                <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>
                    Select Weekdays
                </label>
                <WeekDayToggle selectedDays={weekDays} onChange={setWeekDays} />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontWeight: 'bold' }}>Start Time</label>
                    <TimePicker value={startTime} onChange={e => setStartTime(e ? e : '08:00')} required />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '4px', fontWeight: 'bold' }} />
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

export default AddRoutineForm;