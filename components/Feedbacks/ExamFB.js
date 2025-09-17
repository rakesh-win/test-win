import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function ExamFB() {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { rating, comments });
    // Send API request here
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Exam Feedback
        </Typography>

        <Box display="flex" justifyContent="center" mb={2}>
          {[1, 2, 3, 4, 5].map((num) => (
            <IconButton
              key={num}
              onClick={() => setRating(num)}
              size="large"
              color="error"
            >
              {rating >= num ? (
                <StarIcon sx={{ fontSize: 32 }} />
              ) : (
                <StarBorderIcon sx={{ fontSize: 32 }} />
              )}
            </IconButton>
          ))}
        </Box>

        <TextField
          label="Your Comments"
          placeholder="Share your feedback here..."
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          sx={{ mb: 3 }}
        />

        <button
         className='default-btn'
         style={{textAlign:'center'}} 
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
      </Paper>
    </Box>
  );
}

export default ExamFB;
