import type { GlobalThemeOverrides } from 'naive-ui'
import {shallowRef} from "vue";
import {lightTheme} from "naive-ui";
const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: '#EC5E42',
        primaryColorHover: '#CF523A',
        primaryColorPressed: '#963C2A'
        // primaryColorSuppl: '#4098FC'
    }
    // Button: {
    //     textColor: '#FF0000'
    // }
}
const lightThemeOverrides:GlobalThemeOverrides = {
    Typography: {
        headerBarColor: '#eeeeee',
    }
    // ...
}
const darkThemeOverrides:GlobalThemeOverrides = {
    Typography: {
        headerBarColor: '#eeeeee',
    }
    // ...
}
const savedTheme = localStorage.getItem('theme') as string;
const theme = shallowRef(JSON.parse(savedTheme) || lightTheme)
export { themeOverrides, lightThemeOverrides, darkThemeOverrides,theme };
