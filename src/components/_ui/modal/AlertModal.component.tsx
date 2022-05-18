import React from 'react';
import Modal from 'react-modal';
import { useGlobalModalContext } from './GlobalModal.component';
import { Button, ButtonType, Label, LabelType } from '..';
import { warning, info, alert, close } from '../../../lib';
import { ButtonSize } from '../Button.component';

Modal.setAppElement('#root');

export const AlertModal = () => {
  const { hideModal, store } = useGlobalModalContext();
  const { modalProps } = store;
  const {
    title = '',
    message = 'Are you sure you want to ...?',
    icon = info,
    onRenderBody,
    width = '400px',
    height = '156px',
    buttons = [
      {
        label: 'OK',
        onclick: null,
        type: ButtonType.Primary,
        size: ButtonSize.SMALL,
      },
    ],
  } = modalProps || {};

  const handleClose = () => {
    hideModal();
  };

  const renderHeader = () => {
    return (
      <div className='flex mt-[1.375rem]'>
        <img
          src={icon}
          alt=''
          className='cursor-pointer w-5 h-5  ml-[1.375rem] mr-3.5'
          onClick={handleClose}
        />
        <Label text={title} type={LabelType.H6} className='mr-10' />
      </div>
    );
  };

  const renderBody = () => {
    return (
      <Label
        text={message}
        type={LabelType.BODY3}
        className='ml-14 mt-2 mr-14 text-grey6'
      />
    );
  };

  const renderFooter = () => {
    return (
      <div className='flex mt-6 pr-5 justify-end gap-2'>
        {buttons.map((button: any) => {
          return (
            <Button
              label={button.label || ''}
              type={button.type || ButtonType.Primary}
              size={button.size || ButtonSize.ALERT}
              onClick={() => {
                handleClose();
                button.onClick && button.onClick();
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Modal
      isOpen
      onRequestClose={handleClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          width,
          height,
          transform: 'translate(-50%, -50%)',
          padding: 0,
          borderRadius: 10,
          overflow: 'hidden',
        },
        overlay: {
          zIndex: 60,
          backgroundColor: 'rgba(32,34,35,0.5)',
        },
      }}
    >
      <div className='flex flex-col'>
        {renderHeader()}
        {onRenderBody ? onRenderBody() : renderBody()}
        {renderFooter()}
      </div>
    </Modal>
  );
};
