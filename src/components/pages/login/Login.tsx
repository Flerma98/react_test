import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import './Login.css';
import {
    Alert,
    Box,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useTranslation} from "react-i18next";
import '../../../i18n';
import {LoadingDialog} from "../../dialogs/LoadingDialog";
import logo from "../../../logo.svg";
import {DialogProps} from "@mui/material/Dialog/Dialog";
import {useNavigate} from 'react-router-dom';


function Copyright(props: any) {
    return (<Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/Flerma98">
            Flerma98
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>);
}

export const Login = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signingIn, setSigningIn] = React.useState(false);

    //FORM
    const [usernameErrors, setUsernameErrors] = useState<string | null>(null);
    const [passwordErrors, setPasswordErrors] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user_data');

        if (!userData) return;

        navigate('/');

    }, [navigate]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignInDialogClose: DialogProps["onClose"] = (event, reason) => {
        if (reason && reason === "backdropClick")
            return;
        setSigningIn(false);
    };

    const validateForm = () => {
        setUsernameErrors(null);
        setPasswordErrors(null);
        if (username.trim() === '') {
            setUsernameErrors(t('User cannot be empty'));
        }

        if (password.trim() === '') {
            setPasswordErrors(t('Password cannot be empty'));
        }

        return usernameErrors == null && passwordErrors == null;
    };
    const handleLogin = async () => {
        try {
            if (!validateForm()) return;
            setError('');
            setSigningIn(true);

            const response = await axios.get('https://holagas.app/api/v2/Auth/login', {
                auth: {
                    username: username, password: password
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: (10 * 100),
                timeoutErrorMessage: "No pudimos conectarnos con el servidor",
                validateStatus: status => status === 200
            });

            console.log('Datos obtenidos con éxito:', response.data);

            localStorage.setItem("user_data", JSON.stringify(response.data));

            navigate('/');
        } catch (error) {
            console.error('Error al obtener datos:', error);
            if (!axios.isAxiosError(error) || error.response?.data == null) {
                setError(`Error al iniciar sesión.`);
                return;
            }

            const {error: errorMessage, values: errorValues} = error.response!.data;

            if (errorMessage == null) {
                setError(`Error al iniciar sesión`);
                return;
            }

            setError(errorMessage);
        } finally {
            setSigningIn(false);
        }
    };

    const defaultTheme = createTheme();

    return (<ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
            >
                <img src={logo} className="App-logo" alt="logo"/>
                <Typography component="h1" variant="h5">
                    {t('welcome')}
                </Typography>
                <Box component="form" onSubmit={(e) => {
                    e.preventDefault();
                    return handleLogin();
                }} sx={{mt: 1}}>
                    <TextField
                        id="user"
                        required
                        fullWidth
                        autoFocus
                        margin="normal"
                        label={t('User')}
                        name="user"
                        autoComplete="email"
                        onChange={handleUsernameChange}
                        helperText={usernameErrors}
                        error={usernameErrors != null}
                    />
                    <TextField
                        id="password"
                        required
                        fullWidth
                        margin="normal"
                        name="password"
                        label={t('Password')}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                        helperText={passwordErrors}
                        error={passwordErrors != null}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <LockOpenIcon/> : <LockIcon/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        {t('Sign in')}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {t('Forgot password?')}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {t("Don't have an account? Sign Up")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
        <LoadingDialog
            dialogPops={
                {
                    open: signingIn,
                    onClose: handleSignInDialogClose,
                    'aria-labelledby': 'loading-dialog-title',
                    'aria-describedby': 'loading-dialog-description'
                }
            }
            options={{title: t('Signing In'), description: t('We are looking for your user')}}
        />
    </ThemeProvider>);
};
