import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { parsePhoneNumber } from 'libphonenumber-js';
import { login, resendCode, setBearerToken, setupCognito, setUserInfo, verifyCode } from '../../services/authenticate/authenticate.service';
import { Dropdown, Label, LabelType, Snackbar } from '../_ui';
import { getCurrentTheme } from '../../stores/selectors/theme.selector';
import { AlertPosition, AlertType } from '../_ui/snack-bar/Snack-Bar.component';

export const Login = () => {
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [email, setEmail] = useState<string>('');
  const [phoneNumberCountryCode, setPhoneNumberCountryCode] = useState<string>('+1');
  const [otp, setOtp] = useState<string>('');
  const [otpTimer, setOtpTimer] = useState<string>('');
  const [resendOtpClicked, setResendOtpClicked] = useState<boolean>(false);
  const theme = useSelector(getCurrentTheme);
  // checks for 2 or more consecutive numeric characters
  const isPhoneNumber = () => {
    return /^\d{2,}$/.test(email);
  };
  // Copied the original Button.component.tsx and overridden the height from h-10(40px) to h-12(48px) based on figma
  const buttonDisabled = 'flex bg-grey-light1 rounded justify-center h-12 items-center';
  const buttonPrimary = 'flex bg-blue-light rounded justify-center h-12 items-center hover:bg-blue-dark';

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
  };

  const otpChanged = async (evt: any) => {
    setOtp(evt);
  };

  const formatPhoneNumberInternational = () => {
    try {
      return parsePhoneNumber(`${phoneNumberCountryCode}${email}`).formatInternational();
    } catch (e) {
      return `${phoneNumberCountryCode}${email}`;
    }
  };

  const resendsCode = async () => {
    setLoading(true);
    setResendOtpClicked(true);
    const session = await resendCode(currentUser);
    setLoading(false);
    if (!session) {
      Snackbar.show({
        message:
          "The code is no longer valid. Please click the 'Send new code' and try again.",
        position: AlertPosition.BOTTOM,
      });
    } else {
      setCurrentUser(session);
    }
  };

  const goNext = async () => {
    setLoading(true);
    if (step === 0) {
      if (!email) {
        Snackbar.show({
          message: 'Please enter your email or phone number.',
          position: AlertPosition.BOTTOM,
          alertType: AlertType.ERROR,
        });
        return;
      }
      const user = await login(!isPhoneNumber() ? email : `${phoneNumberCountryCode}${email}`);
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
      setStep(1);
    } else {
      await codeVerification(otp);
    }
  };
  const timer = (remaining: number) => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;

    const minuteString: string = m < 10 ? `${m}` : `${m}`;
    const secondsString: string = s < 10 ? `0${s}` : `${s}`;
    setOtpTimer(`${minuteString}:${secondsString}`);
    remaining -= 1;

    if (remaining >= 0) {
      setTimeout(() => {
        timer(remaining);
      }, 1000);
    }
  };
  useEffect(() => {
    (async () => {
      await setupCognito();
    })();
  }, []);
  // this is used to monitor if the resend OTP link was clicked
  useEffect(() => {
    (async () => {
      if (resendOtpClicked) {
        // 60 seconds to reset the resend OTP link
        timer(60);
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 60000));
        console.log('Resetting resend OTP link state');
        setResendOtpClicked(false);
      }
    })();
  }, [resendOtpClicked]);

  return (
    <div className='h-screen bg-[#E5E5E5]'>
      <div className='flex flex-col items-center'>
        <div className='pt-10 pb-10'>
          <img src={theme.networkLogo} alt='' />
        </div>
        <div className='w-[440px] bg-white rounded p-10 border-grey-light1'>
          {step === 0 && (
            <>
              <div className='mt-[0.5rem] pb-8'>
                <Label type={LabelType.H3} text='Log in' className='mb-1' />
                <Label type={LabelType.BODY2} text='Enter your email or phone number' />
              </div>
              <div className='pb-10 flex'>
                {isPhoneNumber()
                    && ( // TODO this needs improvement, currently only has Canada, US and Jamaica
                      <Dropdown
                        title=''
                        headerWidth={100}
                        items={[
                          { icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg', label: '+1', selected: true },
                          { icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg', label: '+1' },
                          { icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/JM.svg', label: '+1' },
                        ]}
                        onItemClick={(items: any, item: any, index: number) =>
                            setPhoneNumberCountryCode(item.label)
                        }
                        className='h-12 mr-1.5'
                      />
                    )}
                {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                <input value={email} autoFocus placeholder='Email or phone number' className='pl-3.5 pr-3.5 pt-3 pb-3 rounded text-base font-sans text-black bg-silver w-full' onChange={(e) => emailChanged(e)} />
              </div>
              <button
                className='flex bg-blue-light rounded justify-center h-12 items-center hover:bg-blue-dark w-full pt-3 pb-3 mb-[0.5rem]'
                onClick={goNext}
              >
                <Label type={LabelType.BUTTON_PRIMARY} text='Log in' className='text-base' />
              </button>
            </>
          )}
          {step === 1 && (
            <>
              <div className='mt-[0.5rem] pb-10'>
                <Label type={LabelType.H3} text='Enter your access code' />
                <div className='text-base text-grey font-normal mt-1'>
                  We sent a 5-digit code to
                  <span className='text-blue2'>
                    {!isPhoneNumber() ? ` ${email}. ` : ` ${formatPhoneNumberInternational()}. `}
                  </span>
                  Code expires in 1 minute.
                </div>
              </div>
              <div className='mb-10'>
                <OtpInput
                  value={otp}
                  onChange={otpChanged}
                  numInputs={5}
                  shouldAutoFocus
                  className='text-black'
                  inputStyle={{ width: '3.5rem', height: '3.5rem', borderRadius: 8, border: '2px solid #D1D6DB', fontSize: '1.5rem', fontWeight: 500, marginRight: '.5rem' }}
                  focusStyle={{ border: '2px solid #000000' }}
                />
              </div>
              <button disabled={otp.length < 5 || loading} className={`${otp.length < 5 || loading ? buttonDisabled : buttonPrimary} w-full pt-3 pb-3 mb-4 h-12`} onClick={goNext}>
                <Label type={otp.length < 5 || loading ? LabelType.BUTTON_DISABLE : LabelType.BUTTON_PRIMARY} text='Submit' className='text-base' />
              </button>
              <div className='text-sm text-grey font-normal flex'>
                {!resendOtpClicked ? (
                  <>
                    <div className='pr-2'>
                      Didn&apos;t receive a code?
                    </div>
                    <div>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <Link to='#' onClick={resendsCode}>
                        <span className='text-blue2 font-semibold underline'>Send new code</span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='pr-2'>
                      Send new code disabled for
                      <span>{` ${otpTimer}`}</span>
                    </div>
                    <div>
                      <span className='font-semibold underline text-[#7CB342]'>Code sent</span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
