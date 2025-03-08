import React from "react";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

interface Props {
    selectedDays: number[];
    onChange: (days: number[]) => void;
}

const weekDayOptions = [
    { label: 'Sun', value: 0},
    { label: 'Mon', value: 1},
    { label: 'Tue', value: 2},
    { label: 'Wed', value: 3},
    { label: 'Thu', value: 4},
    { label: 'Fri', value: 5},
    { label: 'Sat', value: 6}
];

const WeekDayToggle: React.FC<Props> = ({ selectedDays, onChange}) => {
    const handleToggle = (day: number) => {
        if (selectedDays.includes(day)) {
            onChange(selectedDays.filter(d => d !== day));
        } else {
            onChange([...selectedDays, day]);
        }
    };
    
    return (
        <FormGroup row>
          {weekDayOptions.map(option => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={selectedDays.includes(option.value)}
                  onChange={() => handleToggle(option.value)}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
      );
};

export default WeekDayToggle;