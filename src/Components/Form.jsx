
import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, createTheme, ThemeProvider } from '@mui/material';
import { getNotesData, postNotesData } from '../services/Service';

const Form = () => {

    const [data, setData] = useState({
        topic: '',
        question: '',
        answer: '',
    });

    const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#515160',
            }
        }
    });

    const [formErrors, setFormErrors] = useState({
        topic: '',
        question: '',
        answer: '',
    });

    const forChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const forBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errorMessage = '';

        const validations = {
            topic: { min: 4 },
            question: { min: 12 },
            answer: { min: 15, max: 60 },
        };

        if (value.trim() === '') {
            errorMessage = `${name} is required`;
        } else if (value.length < validations[name].min) {
            errorMessage = `Minimum ${validations[name].min} characters`;
        } else if (
            validations[name].max &&
            value.length > validations[name].max
        ) {
            errorMessage = `Maximum ${validations[name].max} characters`;
        }

        setFormErrors({ ...formErrors, [name]: errorMessage });
    };

    const forSubmit = async (e) => {
        e.preventDefault();

        Object.keys(data).forEach((name) =>
            validateField(name, data[name])
        );

        const hasErrors = Object.values(formErrors).some((error) => error !== '');

        if (!hasErrors) {
            console.log(data);

            const newData = {
                topic: data.topic,
                data: {
                    question: data.question,
                    answer: data.answer
                }
            }

            postNotesData(newData)

            // Reset the form
            setData({
                topic: '',
                question: '',
                answer: '',
            });
            getNotesData()
            window.reload()
        }
    };

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Typography variant="h5" align="center" gutterBottom>
                    ADD NOTE-BOOK
                </Typography>
                <ThemeProvider theme={theme}>
                    <form onSubmit={forSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField className='form-font'
                                    placeholder="Topic"
                                    inputProps={{
                                        style: {
                                            height: "8px",
                                        },
                                    }}
                                    name="topic"
                                    variant="outlined"
                                    fullWidth
                                    value={data.topic}
                                    onChange={forChange}
                                    onBlur={forBlur}
                                    error={!!formErrors.topic}
                                    helperText={formErrors.topic}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField inputProps={{
                                    style: {
                                        height: "8px",
                                    },
                                }}
                                    placeholder="Question"
                                    name="question"
                                    variant="outlined"
                                    fullWidth
                                    value={data.question}
                                    onChange={forChange}
                                    onBlur={forBlur}
                                    error={!!formErrors.question}
                                    helperText={formErrors.question}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField inputProps={{
                                    style: {
                                        height: "8px",
                                    },
                                }}
                                    placeholder="Answer"
                                    name="answer"
                                    variant="outlined"
                                    fullWidth
                                    value={data.answer}
                                    onChange={forChange}
                                    onBlur={forBlur}
                                    error={!!formErrors.answer}
                                    helperText={formErrors.answer}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={
                                        Object.values(formErrors).some((error) => error !== '') ||
                                        !data.topic ||
                                        !data.question ||
                                        !data.answer
                                    }
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </ThemeProvider>
            </Container>
        </React.Fragment>
    )
}
export default Form;


// const newData = {
//     topic: formData.topic,
//     data: {
//         question: formData.question,
//         answer: formData.answer
//     }
// }

// await postNotesData(newData)




