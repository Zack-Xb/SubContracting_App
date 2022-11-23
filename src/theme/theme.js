import * as React from 'react';
import { DefaultTheme } from 'react-native-paper';

export const theme={
    ...DefaultTheme,
    version: 3,
    colors:{
        primary:'#5D3FD3',
        secondary:'#03E1FF',
        tertiary:'#7DF9FF',
        background:'#222222',
        surfaceVariant:'#000',
        error:'red',
        elevation,

    },
    typescale:{
        fontFamily:{ 
            title:'Oswald',
            bodyText:'Raleway',
            smText:''  },
        letterSpacing:{},
        fontWeight:{},
        lineHeight:{},
        fontSize:{  xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.3rem',
        '2x1': '1.5rem',
        '3x1': '1.875rem',
        '4x1': '2.25ren',
        '5x1': '3rem',
        '6x1': '3.75rem',
        '7x1': '4.5rem',
        '8x1': '6rem',
        '9x1': '8rem'}
    }
}