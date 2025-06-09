import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { Logger } from "../../devtools/Logger";

/** Processing from ../devtools/Logger.tsx*/
export function LoggerComponent(){
  const [logs, setLogs] = useState(Logger.getLogs());

  useEffect(() => {
    // unsub for onLogUpdate return which is emmitter.off
    const unsub = Logger.onLogUpdate(()=>setLogs(Logger.getLogs))
    return unsub
  }, []);

  return(
    <>
      <Box sx={{
        position: 'fixed', top: 16, right: 16, zIndex: 20000,
        width: 400, height: 300, overflow: 'auto', border: '1px solid grey', p: 2
        }}>
        <Box>
          <Button onClick={()=>{ Logger.clear() }}>
            Clear
          </Button>
        </Box>
        {logs.map(({ name, log }, idx) => (
        <Accordion key={idx}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            <Typography component="span">{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify(log, null, 2)}
            </pre>
          </AccordionDetails>
        </Accordion>
        ))}
      </Box>

    </>
  )
}