/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useContext, useMemo } from 'react';
import { AlertModal } from './AlertModal.component';
import { InfoModal } from './InfoModal.component';

export const MODAL_TYPES = {
  ALERT_MODAL: 'ALERT_MODAL',
  INFO_MODAL: 'INFO_MODAL',
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.ALERT_MODAL]: AlertModal,
  [MODAL_TYPES.INFO_MODAL]: InfoModal,
};

type ContextType = {
  showModal: (modalType: string, modalProps?: any) => void;
  hideModal: () => void;
  store: any;
};

const initalState: ContextType = {
  showModal: () => {},
  hideModal: () => {},
  store: {},
};

const GlobalModalContext = createContext(initalState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModal: React.FC<{}> = ({ children }) => {
  const [store, setStore] = useState({ modalType: '', modalProps: {} });
  const { modalType, modalProps } = store;

  const showModal = (
    type: string = MODAL_TYPES.ALERT_MODAL,
    props: any = {},
  ) => {
    setStore({
      ...store,
      modalType: type,
      modalProps: props,
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      modalType: '',
      modalProps: {},
    });
  };

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];

    if (!modalType || !ModalComponent) {
      return null;
    }

    return <ModalComponent id='global-modal' {...modalProps} />;
  };

  const val = useMemo(
    () => ({ store, showModal, hideModal }),
    [hideModal, showModal, store],
  );
  return (
    <GlobalModalContext.Provider value={val}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
