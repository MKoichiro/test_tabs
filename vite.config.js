import { defineConfig } from 'vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import react from '@vitejs/plugin-react-swc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [
        // tsconfig.jsonのpathsで設定したpath aliasを読み込む
        tsconfigPaths(),
        // reactとしてbuildする(jsx, tsxを認識させる)
        react(),
    ],
    // moduleの相互参照に関連する設定: import文での相対パス指定を省略できるようにする、など。
    // webpackではここに拡張子も指定したが、viteではpluginでreact()を使うことで省略できる。
    resolve: {
        // alias: {
        //     '@': path.resolve(__dirname, 'src'),
        // },
    },
    // root: path.resolve(__dirname, './'),
    base: '/test_tabs/dist/', // dist/index.html内で、src属性のパスの起点として使われる。
    // ここでの指定は、本番ビルド時の設定になる、開発時はviteによって最適化されているので特に指定しなくても問題ない。
    build: {
        // bundle.jsとindex.htmlの出力先に関する設定
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        // outDir: 'dist',
        rollupOptions: {
            input: path.resolve(__dirname, './index.html'), // 公式に明示されていないが、index.tsxを指定してしまうと、distにindex.htmlが出力されない。
            output: {
                entryFileNames: 'js/bundle.js',
            },
        },
        // bundle.jsコードを最適化する(空行削除、変数名短縮、コメント削除など)ための設定
        minify: 'terser',
        terserOptions: {
            compress: {
                // 本番ビルド時にconsole.*を残さない。
                drop_console: true,
            },
        },
    },
    // 開発用サーバーの設定
    server: {
        // 0はワイルドカード。他のデバイスからアクセス可能にする
        host: '0.0.0.0',
        // ブラウザを自動で開く
        open: true,
    },
});
