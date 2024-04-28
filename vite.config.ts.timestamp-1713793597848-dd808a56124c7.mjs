// vite.config.ts
import { loadEnv } from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/vite@4.3.7_@types+node@20.2.1_sass@1.62.1/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.3.7_vue@3.3.2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/unplugin-auto-import@0.16.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.3.2/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/unplugin-vue-components@0.24.1_vue@3.3.2/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { viteMockServe } from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@4.3.7/node_modules/vite-plugin-mock/dist/index.js";
import DefineOptions from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/unplugin-vue-define-options@1.3.5_vue@3.3.2/node_modules/unplugin-vue-define-options/dist/vite.mjs";
import VueSetupExtend from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@4.3.7/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///F:/vue3_admin_template/project/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.3.7/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var vite_config_default = ({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  return {
    base: "./",
    plugins: [
      VueSetupExtend(),
      DefineOptions(),
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        localEnabled: command === "serve"
      })
    ],
    resolve: { alias: { "@": path.resolve("./src") } },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    // 代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx2dWUzX2FkbWluX3RlbXBsYXRlXFxcXHByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHZ1ZTNfYWRtaW5fdGVtcGxhdGVcXFxccHJvamVjdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovdnVlM19hZG1pbl90ZW1wbGF0ZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnRXhwb3J0LCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xyXG5cclxuXHJcbmltcG9ydCBEZWZpbmVPcHRpb25zIGZyb20gJ3VucGx1Z2luLXZ1ZS1kZWZpbmUtb3B0aW9ucy92aXRlJ1xyXG5pbXBvcnQgVnVlU2V0dXBFeHRlbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZCdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuLy8gXHU1RjE1XHU1MTY1c3ZnXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWdFeHBvcnQgPT4ge1xyXG4gIC8vIFx1ODNCN1x1NTNENlx1NTQwNFx1NzlDRFx1NzNBRlx1NTg4M1x1NEUwQlx1NUJGOVx1NUU5NFx1NzY4NFx1NTNEOFx1OTFDRlxyXG4gIGxldCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXHJcbiAgcmV0dXJuIHtcclxuICAgIGJhc2U6ICcuLycsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIFZ1ZVNldHVwRXh0ZW5kKCksXHJcbiAgICAgIERlZmluZU9wdGlvbnMoKSxcclxuICAgICAgdnVlKCksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICB9KSxcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxyXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gICAgICB9KSxcclxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XHJcbiAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7IGFsaWFzOiB7ICdAJzogcGF0aC5yZXNvbHZlKCcuL3NyYycpIH0gfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGUuc2Nzc1wiOycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTRFRTNcdTc0MDZcdThERThcdTU3REZcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFtlbnYuVklURV9BUFBfQkFTRV9BUEldOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX1NFUlZFLFxyXG4gICAgICAgICAgLy8gXHU5NzAwXHU4OTgxXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtSLFNBQXNDLGVBQWU7QUFDdlUsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLFNBQVMscUJBQXFCO0FBRzlCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sVUFBVTtBQUVqQixTQUFTLDRCQUE0QjtBQUVyQyxJQUFPLHNCQUFRLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBbUM7QUFFakUsTUFBSSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUNyQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1osY0FBYyxZQUFZO0FBQUEsTUFDNUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxLQUFLLFFBQVEsT0FBTyxFQUFFLEVBQUU7QUFBQSxJQUNqRCxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLENBQUMsSUFBSSxpQkFBaUIsR0FBRztBQUFBLFVBQ3ZCLFFBQVEsSUFBSTtBQUFBO0FBQUEsVUFFWixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
