import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SettingContext } from '../providers/SettingProvider';
import type { SettingProviderType } from '../@types/CustomTypes';

interface Props {
    open: boolean
    onClose: () => void
}

const SettingDialog = ({open, onClose}: Props) => {
    const { state, dispatch }: SettingProviderType = useContext(SettingContext);

    const handleSubmit = () => {
        dispatch({
            type: 'SETTING',
            payload: {
                pomodoro: pomodoro,
                shortBreak: shortBreak,
                autoStart: autoStart,
                notification: notification,
                // sound: sound,
            }
        })
        onClose();
    }

    const [pomodoro, setPomodoro] = useState<number>(state.pomodoro);
    const [shortBreak, setShortBreak] = useState<number>(state.shortBreak);
    const [autoStart, setAutoStart] = useState<boolean>(state.autoStart);
    const [notification, setNotification] = useState<boolean>(state.notification);
    // const [sound, setSound] = useState<boolean>(state.sound);

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Setting</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} mt={1}>
                        <Grid item xs={6}>
                            <TextField
                                id="pomodoro"
                                label="Pomodoro"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: "0",
                                    style: {
                                        width: 100,
                                        height: 40,
                                        padding: '0 10px',
                                    }
                                }}
                                value={pomodoro}
                                onChange={e => setPomodoro(Number(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="shortBreak"
                                label="Short Break"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: "0",
                                    style: {
                                        width: 100,
                                        height: 40,
                                        padding: '0 10px',
                                    }
                                }}
                                value={shortBreak}
                                onChange={e => setShortBreak(Number(e.target.value))}
                            />
                        </Grid>
                    </Grid>
                    <Grid container mt={3}>
                        <Grid container item spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={6}>
                                <Typography>Auto Start</Typography>
                            </Grid>
                            <Grid item xs={6} display="flex" alignItems="flex-end" justifyContent="flex-end">
                                <Switch
                                    id="autoStart"
                                    checked={autoStart}
                                    onChange={e => setAutoStart(prev => !prev)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid container item spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={6}>
                                <Typography>Notification</Typography>
                            </Grid>
                            <Grid item xs={6} display="flex" alignItems="flex-end" justifyContent="flex-end">
                                <Switch
                                    id="notification"
                                    checked={notification}
                                    onChange={e => setNotification(prev => !prev)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid container>
                        <Grid container item spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={6}>
                                <Typography>Sound</Typography>
                            </Grid>
                            <Grid item xs={6} display="flex" alignItems="flex-end" justifyContent="flex-end">
                                <Switch
                                    id="sound"
                                    checked={sound}
                                    onChange={e => setSound(prev => !prev)}
                                />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="outlined" onClick={handleSubmit}>Ok</Button>
                </DialogActions>
            </Dialog>            
        </div>
    );
};

export default SettingDialog;