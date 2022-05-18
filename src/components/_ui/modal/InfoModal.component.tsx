import React from 'react';
import Modal from 'react-modal';
import { useGlobalModalContext } from './GlobalModal.component';
import { warning, info, alert, close } from '../../../lib';
import { Button, ButtonType, Label, LabelType } from '..';

Modal.setAppElement('#root');

export const InfoModal = () => {
  const { hideModal, store } = useGlobalModalContext();
  const { modalProps } = store;
  const {
    title,
    width = '540px',
    height = '700px',
    onRenderBody,
    onRenderFooter,
  } = modalProps;

  const handleClose = () => {
    hideModal();
  };

  const renderHeader = () => {
    return (
      <div className='flex items-center justify-center sticky top-0 h-16'>
        <img
          src={close}
          alt=''
          className='absolute left-2 cursor-pointer'
          onClick={handleClose}
        />
        <Label text={title} type={LabelType.H5} />
      </div>
    );
  };

  const renderBody = () => {
    return <div className='block mt-4'>{onRenderBody && onRenderBody()}</div>;
  };

  const renderFooter = () => {
    return <div>{onRenderFooter && onRenderFooter()}</div>;
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
      <div className='flex flex-col px-4'>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </div>
    </Modal>
  );
};
