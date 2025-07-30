/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Grid, Box } from '@mui/material';
import { HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import CustomStepper from '../CustomStepper';

export default function PontoUm() {
  const handleClick = (message) => {
    alert(`Você clicou em: ${message}`);
  };

  const cards = [
    {
      icon: <HomeIcon className="h-32 w-32 text-blue-500" />,
      label: 'Comprar imóvel.',
    },
    {
      icon: <CurrencyDollarIcon className="h-32 w-32 text-blue-500" />,
      label: 'Empréstimo com garantia de imóvel.',
    },
  ];

  return (
    // <Grid container spacing={6} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
    //   {cards.map((card) => (
    //     <Grid item xs={2} sm={2} md={2} key={card.label} sx={{ display: 'flex' }}>
    //       <Card
    //         elevation={4}
    //         sx={{
    //           display: 'flex',
    //           flexDirection: 'column',
    //           height: 250,
    //           width: '100%',
    //           ':hover': {
    //             boxShadow: 6,
    //             backgroundColor: 'white',
    //           },
    //         }}
    //       >
    //         <CardActionArea
    //           onClick={() => handleClick(card.label)}
    //           sx={{ padding: 2, flexGrow: 1 }}
    //         >
    //           <Box
    //             display="flex"
    //             flexDirection="column"
    //             alignItems="center"
    //             height="100%"
    //             justifyContent="center"
    //           >
    //             {card.icon}
    //             <CardContent>
    //               <Typography variant="h6" align="center">
    //                 {card.label}
    //               </Typography>
    //             </CardContent>
    //           </Box>
    //         </CardActionArea>
    //       </Card>
    //     </Grid>
    //   ))}
    // </Grid>
    <div className="flex w-full justify-center mt-10">
      <CustomStepper />
    </div>
  );
}
