export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","Logo.jpg","Logo.png","android/.DS_Store","android/play_store_512.png","android/res/.DS_Store","android/res/mipmap-anydpi-v26/ic_launcher.xml","android/res/mipmap-hdpi/ic_launcher.png","android/res/mipmap-hdpi/ic_launcher_background.png","android/res/mipmap-hdpi/ic_launcher_foreground.png","android/res/mipmap-hdpi/ic_launcher_monochrome.png","android/res/mipmap-mdpi/ic_launcher.png","android/res/mipmap-mdpi/ic_launcher_background.png","android/res/mipmap-mdpi/ic_launcher_foreground.png","android/res/mipmap-mdpi/ic_launcher_monochrome.png","android/res/mipmap-xhdpi/ic_launcher.png","android/res/mipmap-xhdpi/ic_launcher_background.png","android/res/mipmap-xhdpi/ic_launcher_foreground.png","android/res/mipmap-xhdpi/ic_launcher_monochrome.png","android/res/mipmap-xxhdpi/ic_launcher.png","android/res/mipmap-xxhdpi/ic_launcher_background.png","android/res/mipmap-xxhdpi/ic_launcher_foreground.png","android/res/mipmap-xxhdpi/ic_launcher_monochrome.png","android/res/mipmap-xxxhdpi/ic_launcher.png","android/res/mipmap-xxxhdpi/ic_launcher_background.png","android/res/mipmap-xxxhdpi/ic_launcher_foreground.png","android/res/mipmap-xxxhdpi/ic_launcher_monochrome.png","api.md","apple-touch-icon.png","callaback.png","favicon.ico","favicon.svg","icon-192-maskable.png","icon-192.png","icon-512-maskable.png","icon-512.png","icon.icon/Assets/PNG image.png","icon.icon/Assets/logo-3.png","icon.icon/icon.json","icon.png","ios/AppIcon-20@2x.png","ios/AppIcon-20@2x~ipad.png","ios/AppIcon-20@3x.png","ios/AppIcon-20~ipad.png","ios/AppIcon-29.png","ios/AppIcon-29@2x.png","ios/AppIcon-29@2x~ipad.png","ios/AppIcon-29@3x.png","ios/AppIcon-29~ipad.png","ios/AppIcon-40@2x.png","ios/AppIcon-40@2x~ipad.png","ios/AppIcon-40@3x.png","ios/AppIcon-40~ipad.png","ios/AppIcon-60@2x~car.png","ios/AppIcon-60@3x~car.png","ios/AppIcon-83.5@2x~ipad.png","ios/AppIcon@2x.png","ios/AppIcon@2x~ipad.png","ios/AppIcon@3x.png","ios/AppIcon~ios-marketing.png","ios/AppIcon~ipad.png","ios/Contents.json","manifest.webmanifest","og-preview.png","robots.txt"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".xml":"text/xml",".md":"text/markdown",".svg":"image/svg+xml",".json":"application/json",".webmanifest":"application/manifest+json",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.D07Rhp7b.js",app:"_app/immutable/entry/app.B4f3SHLY.js",imports:["_app/immutable/entry/start.D07Rhp7b.js","_app/immutable/chunks/BfOhj8Az.js","_app/immutable/chunks/RazRtEcl.js","_app/immutable/chunks/CP7wIe63.js","_app/immutable/chunks/DX4UBx9p.js","_app/immutable/entry/app.B4f3SHLY.js","_app/immutable/chunks/RazRtEcl.js","_app/immutable/chunks/D9sge_RQ.js","_app/immutable/chunks/DX4UBx9p.js","_app/immutable/chunks/DyF937Oy.js","_app/immutable/chunks/BVbUZWeM.js","_app/immutable/chunks/CP7wIe63.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
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
				id: "/api/todos",
				pattern: /^\/api\/todos\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/todos/_server.js'))
			},
			{
				id: "/api/todos/[id]",
				pattern: /^\/api\/todos\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/todos/_id_/_server.js'))
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
