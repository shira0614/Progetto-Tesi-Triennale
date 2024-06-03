import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Laboratorio 1',
  'Laboratorio 2',
  'Laboratorio 3',
  'Laboratorio 4',
  'Laboratorio 5'
];

function getStyles(name, lab, theme) {
  return {
    fontWeight:
      lab.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function LabSelect({onChangeLabs}) {
  const theme = useTheme();
  const [lab, setLab] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLab(
      typeof value === 'string' ? value.split(',') : value,
    );
    onChangeLabs(value)
  };

  return (
    <div>
      <FormControl sx={{ mt: 3, width: 300 }}>
        <InputLabel id="lab-select-input-label">Laboratori destinatari</InputLabel>
        <Select
          labelId="lab-select-label"
          id="lab-select"
          multiple
          value={lab}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-lab" label="Laboratori destinatari" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, lab, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>È possibile selezionare uno o più laboratori</FormHelperText>
      </FormControl>
    </div>
  );
}