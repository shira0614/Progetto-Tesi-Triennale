import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AnalysisCard(props) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant='h5' gutterBottom>
                        {props.replica.replicaUniqueId}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.shipper.username}
                    </Typography>
                    <Typography variant="body2">
                        Status: {props.status}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Modifica</Button>
                </CardActions>
            </Card>
        </Box>
    );
}