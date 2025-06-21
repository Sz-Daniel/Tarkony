import { Box } from '@mui/material';
import './skeleton.css'
type Props ={
    component: string
}
export function Skeleton( {component} : Props) {
    
    if (component === "CategoryChip") return (
        <Box>
        {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="chip-skeleton" />
        ))}
        </Box>
    );

    if (component === "ItemBaseList") return (
        <Box>
        {Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx}>
                <div className="accordion-skeleton" /><br />
            </div>
        ))}
        </Box>
    );

    if (component === "ItemDetail") return (
        <Box>    
            <div>
                <div className="accordion-skeleton" /><br />
            </div>
        </Box>
    );

}