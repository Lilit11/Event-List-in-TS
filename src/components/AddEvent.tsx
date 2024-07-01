import { Box, Button, Modal, TextField, Select, MenuItem } from "@mui/material"
import { useContext, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { EventContext } from "../lib/Context"
import { ActionTypes, IEvent } from "../lib/types"
import { addEvent } from "../lib/api"

interface Inputs {
    title: string
    date: string
    time: string
    cover: string
    composer: string
    type: Event
}


export const AddEvent = () => {
    const context = useContext(EventContext)
    if (!context) {
        throw new Error("")
    }
    const { dispatch } = context
    const [open, setOpen] = useState<boolean>(false)
    const { register, handleSubmit, reset } = useForm<Inputs>()
    const [error, setError] = useState<string>("")
    const handleAdd: SubmitHandler<Inputs> = data => {
        if (data.title.trim() == "") {
            setError("please provide title")
        } else if (data.date.trim() == "") {
            setError("please provide date")
        } else if (data.time.trim() == "") {
            setError("please provide time")
        } else if (data.composer.trim() == "") {
            setError("please provide composer name")
        } else if (data.cover.trim() == "") {
            setError("please provide cover photo")
        } else if (data.type.trim() == "") {
            setError("please provide type")
        } else {
            setError("")
            type newEvent = Omit<IEvent, "id">
            const { title, date, time, composer, cover, type } = data
            const newEv: newEvent = { title, date, time, composer, cover, type }
            addEvent(newEv)
                .then(res => {
                    dispatch({ type: ActionTypes.addEvent, payload: res })
                })

            reset()
            setOpen(false)
        }

    }
    return <>
        <Box my={2} >
            <Button onClick={() => setOpen(true)} variant="contained">add</Button>
            <Modal open={open} onClose={() => setOpen(false)}>

                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <form onSubmit={handleSubmit(handleAdd)}>
                        <Box my={2}>
                            <TextField
                                label="title"
                                variant="outlined"
                                {...register('title')}
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                label="date"
                                variant="outlined"
                                {...register('date')}
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                label="time"
                                variant="outlined"
                                {...register('time')}
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                label="composer"
                                variant="outlined"
                                {...register('composer')}
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                label="cover"
                                variant="outlined"
                                {...register('cover')}
                            />
                        </Box>
                        <Box my={2}>
                            <Select sx={{ width: 200 }}  {...register('type')} >
                                <MenuItem value="opera">opera</MenuItem>
                                <MenuItem value="ballet">ballet</MenuItem>
                            </Select>
                        </Box>
                        {error && <p className="err" style={{ color: "red" }}>{error}</p>}
                        <Button variant="contained" type="submit"> submit</Button>
                    </form>
                </Box>
            </Modal>
        </Box >

    </>
}