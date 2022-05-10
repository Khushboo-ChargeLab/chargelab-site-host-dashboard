import React from 'react';
import Modal from 'react-modal';
import { Button, ButtonType, Label, LabelType } from '.';
import { warning, info, alert, close } from '../../lib';
import { ButtonSize } from './Button.component';

Modal.setAppElement('#root');

export enum AlertType {
  INFO = 1,
  WARNING = 3,
  ALERT = 2,
}

export class ModalForm extends React.Component {
  static Instance: any;

  static close() {
    ModalForm.Instance.setState({
      open: false,
      onSuccess: () => {},
    });
  }

  static confirm({
    title = '',
    message = 'Are you sure you want to ...?',
    onSuccess = null as any,
    alertType = AlertType.ALERT,
    confirmButton = 'Stop',
  }) {
    if (ModalForm.Instance) {
      ModalForm.Instance.setState({
        open: true,
        onSuccess,
        body: message,
        title,
        footer: true,
        small: true,
        type: 'CONFIRM',
        alertType,
        confirmButton,
      });
    } else {
      console.warn('No modal found');
    }
  }

  static show({
    title = '',
    onSuccess = null as any,
    body = {},
    footer = true,
    small = false,
  }) {
    if (ModalForm.Instance) {
      ModalForm.Instance.setState({
        open: true,
        onSuccess,
        body,
        title,
        footer,
        small,
        type: 'MODAL',
      });
    } else {
      console.warn('No modal found');
    }
  }

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    };

    ModalForm.Instance = this;
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSuccess = () => {
    if (ModalForm.Instance.state.onSuccess) {
      ModalForm.Instance.state.onSuccess();
    } else {
      this.setState({ open: false });
    }
  };

  render() {
    const { open, body, title, footer, small, type, confirmButton, alertType } =
      this.state as any;

    return (
      <div className='z-auto-full'>
        <Modal
          isOpen={open}
          // onAfterOpen={afterOpenModal}
          onRequestClose={this.handleClose}
          style={{
            content: {
              top: '50%',
              left: '50%',
              width: `${small ? '400px' : '540px'}`,
              height: `${type === 'MODAL' ? '600px' : '156px'}`,
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
            overlay: {
              backgroundColor: 'rgba(32,34,35,0.5)',
            },
          }}
        >
          {type === 'MODAL' ? (
            <>
              <div className='flex items-center justify-center'>
                <img
                  src={close}
                  alt=''
                  className='absolute left-6 cursor-pointer'
                  onClick={this.handleClose}
                />
                <Label text={title} type={LabelType.H5} />
              </div>
              <div className='block mt-4'>
                {body}
                {footer}
              </div>
            </>
          ) : (
            <>
              <div className='flex mb-1'>
                <img
                  src={
                    alertType === AlertType.ALERT
                      ? alert
                      : alertType === AlertType.WARNING
                      ? warning
                      : info
                  }
                  alt=''
                  className='inline-block cursor-pointer pr-3'
                  onClick={this.handleClose}
                />
                <Label text={title} type={LabelType.H6} />
              </div>
              <Label
                text={body}
                type={LabelType.BODY3}
                className='pl-8 text-grey6'
              />
              <div className='flex mt-5 justify-end'>
                <Button
                  className='mr-1'
                  label='Cancel'
                  type={ButtonType.Cancel}
                  size={ButtonSize.SMALL}
                  onClick={this.handleClose}
                />
                <Button
                  label={confirmButton}
                  type={ButtonType.Primary}
                  size={ButtonSize.SMALL}
                  onClick={this.handleSuccess}
                />
              </div>
            </>
          )}
        </Modal>
      </div>
    );
  }
}
