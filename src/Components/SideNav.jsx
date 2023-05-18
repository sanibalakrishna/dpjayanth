import React, { useEffect, useState } from 'react'
import { Badge, Box, Divider, ListItem } from '@mui/material';
import { getNotesData } from '../services/Service';
import ModalForm from './ModalForm';
import './SideNav.css'

const SideNav = () => {
    const [open, setOpen] = useState(true);
    const [data, setData] = useState([]);

    const [accActive, setAccActive] = useState();
    const [loading, setLoading] = useState(true)

    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    const handleActive = (index) => {
        if (accActive === index) {
            setAccActive()
        }
        else {
            setAccActive(index)
        }
    }

    const forGetData = async () => {
        setLoading(true)
        const newData = await getNotesData()
        setData(newData.data)
        setLoading(false)
    }

    useEffect(() => {
        forGetData()
    }, [])


    return (
        <React.Fragment>

            <nav className="navbar navbar-expand-lg custom py-3 shadow-lg">
                {/* onClick={() => setOpen(!open)} className='mx-2 feather feather-x custom' */}
                <div className="container-fluid">
                    <div className='newcur'>
                        {
                            open ?
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setOpen(!open)} className="feather feather-arrow-left newtrans" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                : <svg onClick={() => setOpen(!open)} className='mx-2 feather feather-arrow-right custom' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        }
                    </div>
                    <div className="navbar-nav text-center d-flex justify-content-end px-3 ">
                        <div className='custon-form-nav'><ModalForm /></div>
                        <div className='custon-topic-nav'>TOPICS<Badge className='mb-3 ms-2' badgeContent={data.length} color="primary"></Badge></div>
                    </div>
                </div>
            </nav>

            <div className="d-flex fullnav">

                <div className={` ${open ? "width-normal py-2" : "width-min py-2"} custom position-relative anime`} >
                    <div className="d-flex align-items-center my-2">
                        <svg className='ms-2 me-2 custom-icon' fill="none" viewBox="0 0 24 24" height="2em" width="2em">
                            <path
                                fill="currentColor"
                                d="M6 6a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM6 10a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM7 13a1 1 0 100 2h10a1 1 0 100-2H7zM6 18a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z"
                            />
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M2 4a3 3 0 013-3h14a3 3 0 013 3v16a3 3 0 01-3 3H5a3 3 0 01-3-3V4zm3-1h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h1 className={`text-white h4 m-0 ${!open && "d-none"}`}>NoteBook</h1>
                    </div>
                    {
                        data.map((xd, id) => {
                            return (
                                <ul className="" key={id}>
                                    <ListItem className={`${!open && "d-none"} new-btn d-flex rounded-2 text-light align-items-center custom-padding`} onClick={() => handleTopicClick(xd.topic)}>
                                        <Box className=' px-3 py-1'>
                                            {xd.topic}
                                        </Box>
                                    </ListItem>
                                </ul>
                            )
                        })
                    }
                </div>

                {/* <Divider sx={{background:'#fffff',my: 0,color:'#fffff'}} /> */}

                <div className="container">

                    {loading ? <div className="spinner"></div> : <div>{
                        selectedTopic && (
                            <div>
                                <div>
                                    {
                                        data
                                            .find((topicData) => topicData.topic === selectedTopic)
                                            .data.map((acc, index) => {
                                                return (
                                                    <div className="accordion"
                                                        onClick={() => handleActive(index)} key={acc._id}>
                                                        <div className='accordionHeading'>
                                                            <span className="addIcon"
                                                                style={{
                                                                    transform: `${accActive === index ? 'rotate(45deg)' :
                                                                        'rotate(0deg)'}`
                                                                }}>
                                                                <svg className='feather feather-plus text-black' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                            </span>
                                                            <h3>{acc.question}</h3>
                                                        </div>
                                                        {
                                                            accActive === index ? <div className="accordionContent">
                                                                {acc.answer}
                                                            </div> : null
                                                        }
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>)
                    }</div>}

                    {/* <Outlet /> */}
                </div>

            </div>

        </React.Fragment>
    )
}

export default SideNav