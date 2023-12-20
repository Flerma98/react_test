import {CircularProgress, Dialog, DialogContent, Grid, Typography} from "@mui/material";
import React from "react";
import {DialogProps} from "@mui/material/Dialog/Dialog";

// Define el tipo de las opciones
type LoadingDialogOptions = {
    title: string;
    description?: string;
};

// Props para el componente LoadingDialog
type LoadingDialogProps = {
    dialogPops: DialogProps;
    options: LoadingDialogOptions;
};

export const LoadingDialog: React.FC<LoadingDialogProps> = ({dialogPops, options}) => {
    return (
        <Dialog {...dialogPops}>
            <DialogContent>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item marginRight="50px">
                        <Typography variant="h6">
                            {options.title}
                        </Typography>
                        {options.description && (
                            <Typography variant="body2" marginTop="7px">
                                {options.description}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item>
                        <CircularProgress/>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};