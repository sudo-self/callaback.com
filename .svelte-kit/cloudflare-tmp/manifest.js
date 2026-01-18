export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","Logo.jpg","Logo.png","android/.DS_Store","android/play_store_512.png","android/res/.DS_Store","android/res/mipmap-anydpi-v26/ic_launcher.xml","android/res/mipmap-hdpi/ic_launcher.png","android/res/mipmap-hdpi/ic_launcher_background.png","android/res/mipmap-hdpi/ic_launcher_foreground.png","android/res/mipmap-hdpi/ic_launcher_monochrome.png","android/res/mipmap-mdpi/ic_launcher.png","android/res/mipmap-mdpi/ic_launcher_background.png","android/res/mipmap-mdpi/ic_launcher_foreground.png","android/res/mipmap-mdpi/ic_launcher_monochrome.png","android/res/mipmap-xhdpi/ic_launcher.png","android/res/mipmap-xhdpi/ic_launcher_background.png","android/res/mipmap-xhdpi/ic_launcher_foreground.png","android/res/mipmap-xhdpi/ic_launcher_monochrome.png","android/res/mipmap-xxhdpi/ic_launcher.png","android/res/mipmap-xxhdpi/ic_launcher_background.png","android/res/mipmap-xxhdpi/ic_launcher_foreground.png","android/res/mipmap-xxhdpi/ic_launcher_monochrome.png","android/res/mipmap-xxxhdpi/ic_launcher.png","android/res/mipmap-xxxhdpi/ic_launcher_background.png","android/res/mipmap-xxxhdpi/ic_launcher_foreground.png","android/res/mipmap-xxxhdpi/ic_launcher_monochrome.png","apple-touch-icon.png","callaback.png","favicon.ico","icon-192-maskable.png","icon-192.png","icon-512-maskable.png","icon-512.png","icon.icon/Assets/PNG image.png","icon.icon/Assets/logo-3.png","icon.icon/icon.json","ios/AppIcon-20@2x.png","ios/AppIcon-20@2x~ipad.png","ios/AppIcon-20@3x.png","ios/AppIcon-20~ipad.png","ios/AppIcon-29.png","ios/AppIcon-29@2x.png","ios/AppIcon-29@2x~ipad.png","ios/AppIcon-29@3x.png","ios/AppIcon-29~ipad.png","ios/AppIcon-40@2x.png","ios/AppIcon-40@2x~ipad.png","ios/AppIcon-40@3x.png","ios/AppIcon-40~ipad.png","ios/AppIcon-60@2x~car.png","ios/AppIcon-60@3x~car.png","ios/AppIcon-83.5@2x~ipad.png","ios/AppIcon@2x.png","ios/AppIcon@2x~ipad.png","ios/AppIcon@3x.png","ios/AppIcon~ios-marketing.png","ios/AppIcon~ipad.png","ios/Contents.json","manifest.webmanifest","og-preview.png","robots.txt"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".xml":"text/xml",".json":"application/json",".webmanifest":"application/manifest+json",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.D0vcs_tM.js",app:"_app/immutable/entry/app.CLELD9KI.js",imports:["_app/immutable/entry/start.D0vcs_tM.js","_app/immutable/chunks/fJ2_Uqlq.js","_app/immutable/chunks/HWqifss4.js","_app/immutable/chunks/CvJgxyJB.js","_app/immutable/chunks/tP9BYXXo.js","_app/immutable/entry/app.CLELD9KI.js","_app/immutable/chunks/HWqifss4.js","_app/immutable/chunks/DmJmNzuc.js","_app/immutable/chunks/tP9BYXXo.js","_app/immutable/chunks/Z-ifG_Kf.js","_app/immutable/chunks/CxWdK0oO.js","_app/immutable/chunks/CvJgxyJB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/export",
				pattern: /^\/api\/export\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/export/_server.js'))
			},
			{
				id: "/api/import",
				pattern: /^\/api\/import\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/import/_server.js'))
			},
			{
				id: "/api/todos",
				pattern: /^\/api\/todos\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/todos/_server.js'))
			},
			{
				id: "/api/todos/[id]",
				pattern: /^\/api\/todos\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/todos/_id_/_server.js'))
			},
			{
				id: "/todo",
				pattern: /^\/todo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base_path = "";
