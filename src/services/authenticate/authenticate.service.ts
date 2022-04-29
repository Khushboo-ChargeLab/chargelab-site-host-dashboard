import { Auth, Amplify } from 'aws-amplify';
import { httpRawGet } from '../http/http.service';

export const setupCognito = async () => {
    const dep = await httpRawGet('/deployment/cognito').catch((e) => e);
    console.log('dep', dep);
    Amplify.configure({
        Auth: {
            region: dep.region,
            userPoolId: dep.userPoolId,
            userPoolWebClientId: dep.clientId,
            mandatorySignIn: false,
            authenticationFlowType: 'CUSTOM_AUTH',
        },
    });
};

export const setUserInfo = (user: any) => {
    localStorage.setItem('DASHBOARD-USER-INFO', JSON.stringify(user));
};

export const getUserInfo = () => {
    const user = localStorage.getItem('DASHBOARD-USER-INFO');

    if (user) {
        return JSON.parse(user);
    }

    return {
        attributes: {
            sub: '',
            email_verified: true,
            phone_number_verified: true,
            email: '',
            family_name: '',
            given_name: '',
            phone_number: '',
        },
        username: '',
    };
};

export const setBearerToken = (token: string) => {
    localStorage.setItem('DASHBOARD-TOKEN', token);
};

const getIsEmail = (phoneNumberOrEmailLogin: string) => phoneNumberOrEmailLogin.indexOf('@') > -1;

const defaultToPlusOneCountryCode = (phoneNumber: string) => {
    if (phoneNumber && phoneNumber.indexOf('+') > -1) {
        return phoneNumber;
    }
    return `+1${phoneNumber}`;
};

const getLoginString = (phoneNumberOrEmailLogin: string) => {
    const isEmail = getIsEmail(phoneNumberOrEmailLogin);
    return (!isEmail ? defaultToPlusOneCountryCode(phoneNumberOrEmailLogin) : phoneNumberOrEmailLogin).trim();
};

export const verifyCode = async (user: any, code: string) => Auth.sendCustomChallengeAnswer(
    user,
    code,
).catch(() => null);

export const resendCode = async (user: any) => {
    const session = await Auth.signIn(user.username)
        .catch((e: any) => e);

    if (session.message) {
        return null;
    }

    await Auth.sendCustomChallengeAnswer(session, user.username, {
        isEmail: `${getIsEmail(user.username)}`,
    });

    return session;
};

export const login = async (email: string) => {
    const user = await Auth.signIn(getLoginString(email))
        .catch((e: any) => e);

    if (user.message) {
        return null;
    }

    await Auth.sendCustomChallengeAnswer(user, getLoginString(email), {
        isEmail: `${getIsEmail(email)}`,
    });

    return user;
};
