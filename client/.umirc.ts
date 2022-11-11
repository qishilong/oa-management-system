import { Location } from "history";
import { resolve } from "path";
import { defineConfig } from "umi";

export default defineConfig( {
    nodeModulesTransform: {
        type: 'none',
    },
    dva: {
        immer: true
    },
    ignoreMomentLocale: true,
    dynamicImport: {
        loading: '@/components/Loading',
    },
    alias: {
        api: resolve( __dirname, './src/services/' ),
        components: resolve( __dirname, './src/components' ),
        common: resolve( __dirname, './src/common' ),
        // config: resolve(__dirname, './src/utils/config'),
        // themes: resolve(__dirname, './src/themes'),
        utils: resolve( __dirname, './src/utils' ),
    },
    // routes: [
    //   { path: '/', component: '@/pages/index' },
    // ],
    fastRefresh: {},
    proxy: {
        "/api": {
            target: "http://127.0.0.1:7001",
            changeOrigin: true,
        }
    }
} );
