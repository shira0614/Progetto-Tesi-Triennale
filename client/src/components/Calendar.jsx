import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';
import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";
import {useState} from "react";

export default function Calendar({onDateChange}) {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateChange(date);
    };

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'it'}>
            <DemoContainer components={['DatePicker']}>
                <DemoItem>
                    <DatePicker
                        label="Data di nascita"
                        value={dayjs(selectedDate)}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    )
}