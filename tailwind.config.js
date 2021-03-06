module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter'],
      serif: ['Inter'],
    },
    colors: {
      dashboard: '#F5F6FA',
      white: '#ffffff',
      black: '#202223',
      silver: '#F2F4F6',
      red: '#E11900',
      grey2: '#E5E8EB',
      grey5: '#6B7684',
      grey6: '#4E5968',
      blue2: '#18A0D7',
      grey4: '#B0B8C1',
      darkGrey: '#6D7175',
      green: {
        light4: '#4BD865',
        DEFAULT: '#05944F',
        light: '#8BC34A',
      },
      alert_positive: '#7CB342',
      grey: {
        light1: '#F9FAFB',
        light2: '#D1D6DB',
        DEFAULT: '#4E5968',
        light: '#DFE1E6',
        dark: '#AFAFAF',
      },
      yellow: '#FFC043',
      purple: '#7356BF',
      primaryblue1: '#3DBAE3',
      alerts_accent: '#039BE5',
      alerts_warning: '#FFB300',
      alerts_negative_1: '#E53935',
      alerts_negative_0: '#FDEDED',
      blue: {
        light: '#18A0D7',
        DEFAULT: '#276EF1',
        dark: '#117DB8',
      },
      silver5: '#D1D6DB',
      mainColor: '#18A0D7',
      secondaryColor: '#E8F7FC',
    },
    extend: {
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/forms')],
};
