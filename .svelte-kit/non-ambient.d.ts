
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/api" | "/api/todos" | "/api/todos/[id]" | "/privacy" | "/todo";
		RouteParams(): {
			"/api/todos/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/about": Record<string, never>;
			"/api": { id?: string };
			"/api/todos": { id?: string };
			"/api/todos/[id]": { id: string };
			"/privacy": Record<string, never>;
			"/todo": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/about/" | "/api" | "/api/" | "/api/todos" | "/api/todos/" | `/api/todos/${string}` & {} | `/api/todos/${string}/` & {} | "/privacy" | "/privacy/" | "/todo" | "/todo/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/Logo.jpg" | "/Logo.png" | "/android/.DS_Store" | "/android/play_store_512.png" | "/android/res/.DS_Store" | "/android/res/mipmap-anydpi-v26/ic_launcher.xml" | "/android/res/mipmap-hdpi/ic_launcher.png" | "/android/res/mipmap-hdpi/ic_launcher_background.png" | "/android/res/mipmap-hdpi/ic_launcher_foreground.png" | "/android/res/mipmap-hdpi/ic_launcher_monochrome.png" | "/android/res/mipmap-mdpi/ic_launcher.png" | "/android/res/mipmap-mdpi/ic_launcher_background.png" | "/android/res/mipmap-mdpi/ic_launcher_foreground.png" | "/android/res/mipmap-mdpi/ic_launcher_monochrome.png" | "/android/res/mipmap-xhdpi/ic_launcher.png" | "/android/res/mipmap-xhdpi/ic_launcher_background.png" | "/android/res/mipmap-xhdpi/ic_launcher_foreground.png" | "/android/res/mipmap-xhdpi/ic_launcher_monochrome.png" | "/android/res/mipmap-xxhdpi/ic_launcher.png" | "/android/res/mipmap-xxhdpi/ic_launcher_background.png" | "/android/res/mipmap-xxhdpi/ic_launcher_foreground.png" | "/android/res/mipmap-xxhdpi/ic_launcher_monochrome.png" | "/android/res/mipmap-xxxhdpi/ic_launcher.png" | "/android/res/mipmap-xxxhdpi/ic_launcher_background.png" | "/android/res/mipmap-xxxhdpi/ic_launcher_foreground.png" | "/android/res/mipmap-xxxhdpi/ic_launcher_monochrome.png" | "/api.md" | "/apple-touch-icon.png" | "/callaback.png" | "/favicon.ico" | "/favicon.svg" | "/icon-192-maskable.png" | "/icon-192.png" | "/icon-512-maskable.png" | "/icon-512.png" | "/icon.icon/Assets/PNG image.png" | "/icon.icon/Assets/logo-3.png" | "/icon.icon/icon.json" | "/icon.png" | "/ios/AppIcon-20@2x.png" | "/ios/AppIcon-20@2x~ipad.png" | "/ios/AppIcon-20@3x.png" | "/ios/AppIcon-20~ipad.png" | "/ios/AppIcon-29.png" | "/ios/AppIcon-29@2x.png" | "/ios/AppIcon-29@2x~ipad.png" | "/ios/AppIcon-29@3x.png" | "/ios/AppIcon-29~ipad.png" | "/ios/AppIcon-40@2x.png" | "/ios/AppIcon-40@2x~ipad.png" | "/ios/AppIcon-40@3x.png" | "/ios/AppIcon-40~ipad.png" | "/ios/AppIcon-60@2x~car.png" | "/ios/AppIcon-60@3x~car.png" | "/ios/AppIcon-83.5@2x~ipad.png" | "/ios/AppIcon@2x.png" | "/ios/AppIcon@2x~ipad.png" | "/ios/AppIcon@3x.png" | "/ios/AppIcon~ios-marketing.png" | "/ios/AppIcon~ipad.png" | "/ios/Contents.json" | "/manifest.webmanifest" | "/og-preview.png" | "/robots.txt" | string & {};
	}
}