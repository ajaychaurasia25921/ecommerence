// Faq.js
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
const faqData = [
  {
    question: 'What is your return policy?',
    answer: 'You can return any item within 30 days of purchase for a full refund.'
  },
  {
    question: 'How do I track my order?',
    answer: 'You can track your order status from your account dashboard or through the tracking link sent to your email.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries. Shipping costs and times will vary depending on your location.'
  },
  // Add more FAQs here
];
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  textTransform: 'uppercase',
}));
const Faq = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <StyledTypography variant="h1">Frequently Asked Questions</StyledTypography>
      {/* <Typography variant="h4" gutterBottom align="center">
        Frequently Asked Questions
      </Typography> */}
      {faqData.map((faq, index) => (
        <Accordion
          key={index}
          style={{
            marginBottom: '10px',
            borderRadius: '8px',
            boxShadow: theme.shadows[2],
            overflow: 'hidden',
          }}
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            style={{
              backgroundColor: theme.palette.grey[100],
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant={isSmallScreen ? 'subtitle1' : 'h6'}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '16px' }}>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;
