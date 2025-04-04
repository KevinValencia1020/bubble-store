import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (

  <MuiAccordion disableGutters elevation={0} square {...props} />

))(({ theme }) => ({

  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },

}));

const AccordionSummary = styled((props) => (

  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />

))(({ theme }) => ({

  backgroundColor: "#1e293b",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:

    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {

    marginLeft: theme.spacing(1),
  },

  ...theme.applyStyles("dark", {
    backgroundColor: "#1e293b",
  }),

}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({

  background: "#1e293b",
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  
}));

export default function AccordionCustomized({ onExpandedChange }) {

  const [expanded, setExpanded] = React.useState(false);
  
  const handleChange = (panel) => (event, newExpanded) => {

    const isNowExpanded = newExpanded;

    setExpanded(isNowExpanded ? panel : false);

    //Notificamos al componente padre sobre el cambio
    if (onExpandedChange) {
      onExpandedChange(isNowExpanded);
    }

  };

  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">

          <Typography component="span">Nuestra Compañía</Typography>

        </AccordionSummary>

        <AccordionDetails>

          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>

        </AccordionDetails>

      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >

        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          
          <Typography component="span">Compras en línea</Typography>

        </AccordionSummary>

        <AccordionDetails>

          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>

        </AccordionDetails>

      </Accordion>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >

        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">

          <Typography component="span">Políticas</Typography>

        </AccordionSummary>

        <AccordionDetails>

          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>

        </AccordionDetails>

      </Accordion>
    </>
  );
}
