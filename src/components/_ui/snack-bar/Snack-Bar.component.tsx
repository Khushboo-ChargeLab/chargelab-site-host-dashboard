import React from "react";
import "./Snack-Bar.component.scss";

export enum AlertPosition {
    TOP = 'top',
    BOTTOM = 'bottom',
}

export enum AlertType {
    SUCCESS = 'bg-green',
    INFO = 'bg-blue2',
    ERROR = 'bg-red',
    WARNING = 'bg-yellow',
}

export class Snackbar extends React.Component {
    static Instance: any;

    static close() {
        Snackbar.Instance.setState({
            open: false,
        });
    }

    static show({ 
            message = 'Are you sure you want to ...?', 
            duration = 0,
            position = AlertPosition.BOTTOM,
            alertType = AlertType.SUCCESS,
        }) {

        if (Snackbar.Instance) {
            Snackbar.Instance.setState({
                open: true,
                message,
                duration,
                position,
                alertType,
                always : duration === 0 ? 'always':'',
            },()=>{

                if(duration!==0){
                    setTimeout(() => {
                        Snackbar.Instance.setState({ open: false });
                      }, duration); 
                }
               
            });
        } else {
            console.warn('No Snackbar found');
        }
    }

    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
        };

        Snackbar.Instance = this;
    }

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        const { open, message, position, alertType, always} = this.state as any;

        return (
            <div className = {'text-left pr-8 pt-8 rounded ' +(open ? ['snackbar', 'show', position , alertType, always].join(" ") : 'snackbar')}>
                <div className="absolute right-0 pr-3 top-1 text-sm cursor-pointer  underline" onClick={this.handleClose}>Close</div>
                {message}
            </div>
        );
    }

}