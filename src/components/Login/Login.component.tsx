import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  login,
  resendCode,
  setBearerToken,
  setupCognito,
  setUserInfo,
  verifyCode,
} from '../../services/authenticate/authenticate.service';
import { Button, ButtonType, FormInput, Label, Snackbar } from '../_ui';
import { ButtonSize } from '../_ui/Button.component';
import { getCurrentTheme } from '../../stores/selectors/theme.selector';
import { AlertPosition, AlertType } from '../_ui/snack-bar/Snack-Bar.component';

export const Login = () => {
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [email, setEmail] = useState<string>('');
  const theme = useSelector(getCurrentTheme);

  const codeVerification = async (loginString: string) => {
    const session = await verifyCode(currentUser, loginString);
    setLoading(false);
    if (!session) {
      Snackbar.show({
        message:
          "The one time code is no longer valid. Please click the 'RESEND CODE' and try again.",
        position: AlertPosition.BOTTOM,
        alertType: AlertType.ERROR,
      });
      return;
    }
    setBearerToken(session.signInUserSession?.accessToken?.jwtToken);
    const userInfo = await Auth.currentUserInfo();
    setUserInfo(userInfo);
    document.location.href = '/';
  };

  const emailChanged = async (evt: any) => {
    setEmail(evt?.target?.value);
    if (step === 1 && evt?.target?.value.length >= 5) {
      setLoading(true);
      await codeVerification(evt?.target?.value);
    }
  };

  const resendsCode = async () => {
    setLoading(true);
    const session = await resendCode(currentUser);
    setLoading(false);
    if (!session) {
      Snackbar.show({
        message:
          "The one time code is no longer valid. Please click the 'RESEND CODE' and try again.",
        position: AlertPosition.BOTTOM,
      });
    } else {
      setCurrentUser(session);
      Snackbar.show({
        message: 'The code has been sent.',
        position: AlertPosition.BOTTOM,
        alertType: AlertType.SUCCESS,
      });
    }
  };

  const goNext = async () => {
    if (!email) {
      Snackbar.show({
        message: 'User does not exist.',
        position: AlertPosition.BOTTOM,
        alertType: AlertType.ERROR,
      });
      return;
    }
    setLoading(true);
    if (step === 0) {
      const user = await login(email);
      setLoading(false);
      if (!user) {
        Snackbar.show({
          message: 'User does not exist.',
          position: AlertPosition.BOTTOM,
          alertType: AlertType.ERROR,
        });
        return;
      }
      setCurrentUser(user);
      setLoading(false);
      setEmail('');
      setStep(1);
    } else {
      await codeVerification(email);
    }
  };

  useEffect(() => {
    (async () => {
      await setupCognito();
    })();
  }, []);

  return (
    <div className='flex h-screen bg-[#f5f6fa]'>
      <div className='m-auto bg-white rounded p-5'>
        <div className='flex justify-center pt-4 pb-6'>
          <img src={theme.networkLogo} alt='' />
        </div>
        {step === 0 && (
          <>
            <div className='mb-8'>
              <FormInput placeholder='Email or phone' onChange={emailChanged} />
            </div>
            <div className='mb-4'>
              <Button
                size={ButtonSize.FULL}
                label='Next'
                type={
                  !email || loading ? ButtonType.Disabled : ButtonType.Primary
                }
                onClick={goNext}
              />
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className='mb-8'>
              <FormInput
                placeholder='Enter the code you received'
                onChange={emailChanged}
              />
            </div>
            <div className='mb-4'>
              <Button
                size={ButtonSize.FULL}
                label='Login'
                type={
                  !email || loading ? ButtonType.Disabled : ButtonType.Primary
                }
                onClick={goNext}
              />
            </div>
            <div className='flex justify-center py-4'>
              <div>
                <Link to='#f' onClick={resendsCode}>
                  <Label text='Resend code' />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
