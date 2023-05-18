import React from 'react'
import { useState } from "react";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import { Box, Button, Grid } from "@mui/material";
import Form from "./Form";



const ModalForm = () => {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);


    return (
        <React.Fragment>
            <Box component="section">
                <Grid container spacing={2}>
                    <Box variant="gradient" color="#F0F0F0" onClick={toggleModal}>
                        <svg className='feather feather-plus text-light' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>TOPIC
                    </Box>
                    <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
                        <Slide direction="down" in={show} timeout={500}>

                            <Box position="relative" width="500px" display="flex" flexDirection="column" borderRadius="1em" bgcolor={'#F0F0F0'} shadow="xl" padding={'1.6em'} >
                                <Form />
                                <Box display="flex" justifyContent="space-between" p={1.5}>
                                    <Button variant="gradient" color="dark" onClick={toggleModal}>
                                        close form
                                    </Button>
                                </Box>
                            </Box>
                        </Slide>
                    </Modal>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default ModalForm