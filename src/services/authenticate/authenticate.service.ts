import { Auth } from 'aws-amplify';

export enum USER_ROLE {
    SUPPORT,
    NORMAL,
}

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

export const getUserRole = () => {
    const user = getUserInfo();
    if (user.attributes['custom:legacy_support_da'] === 'ALLOW') {
        return USER_ROLE.SUPPORT;
    }
    return USER_ROLE.NORMAL;
};

export const getUserScope = () => {
    // FIXME: Should get this from BE or something else.
    return 'company';
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
