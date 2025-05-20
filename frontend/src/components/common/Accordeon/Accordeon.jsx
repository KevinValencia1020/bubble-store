import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

// Impotacion de los data del accordion
import accordionData from "@/constants/accordionData";

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

      {accordionData.map((section, index) => (

        <Accordion key={index} expanded={expanded === section.id} onChange={handleChange(section.id)}>

          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">

            <Typography component="span">{section.title}</Typography>

          </AccordionSummary>

          <AccordionDetails>

            {section.details.map((detail, index) => (

              <div key={index} className="mb-1 leading-normal">

                <Typography variant="subtitle1">
                  {detail.subtitle}
                </Typography>

                <Typography variant="body2" color="#9ca3af" >
                  {detail.content}
                </Typography>

              </div>
            ))}

          </AccordionDetails>

        </Accordion>
      ))}
    </>
  );
}
