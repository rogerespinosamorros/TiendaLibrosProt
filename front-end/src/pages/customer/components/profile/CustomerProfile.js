import { useEffect, useState } from "react";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getCustomerProfile, updateCustomerProfile, deleteCustomerAccount } from "../../service/customer";
import { removeToken } from "../../../../utils/common";

export default function CustomerProfile() {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await getCustomerProfile();
            if (response.status === 200) {
                setProfile(response.data);
            }
        } catch (error) {
            enqueueSnackbar("Error fetching profile data", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await updateCustomerProfile(profile);
            if (response.status === 200) {
                enqueueSnackbar("Profile updated successfully", { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar("Failed to update profile", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const response = await deleteCustomerAccount();
            if (response.status === 200) {
                enqueueSnackbar("Account deleted successfully", { variant: "success" });
                removeToken();
                navigate("/");
            }
        } catch (error) {
            enqueueSnackbar("Failed to delete account", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    if (!profile) return null;

    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100vw",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 0,
                    background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                }}
            >

                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            My Profile
                        </Typography>
                        <Box component="form" onSubmit={handleUpdateProfile} noValidate sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                value={profile.email}
                                disabled
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!profile.firstName || !profile.lastName}
                            >
                                Update Profile
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </Button>
                        </Box>
                    </Box>
                </Container>

                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </>
    );
}
