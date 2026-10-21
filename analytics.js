// PostHog web analytics for pixeldoro.io (project "pixeldoro.io", separate from the app's project).
// Cookieless: no cookies or storage, so no consent banner. Only runs on the live site, not local previews.
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
if (/(^|\.)pixeldoro\.io$/.test(location.hostname)) {
    posthog.init('phc_DmzYcoADPtKRNFuQDABWpgJom743GJgijPSoYwxSUv5V', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2026-08-30',
        cookieless_mode: 'always'
    });

    // One "get_app_click" event for every link that leads to the game, split by store and platform.
    // Store links go through play.pixeldoro.io short links; `link` keeps the exact one.
    // Windows and Linux are direct downloads from the pixeldoro/desktop GitHub releases; `link` is the file name.
    var LINKS = {
        'ios': ['app_store', 'ios'], 'together-ios': ['app_store', 'ios'], 'dl-ios': ['app_store', 'ios'],
        'macos': ['mac_app_store', 'mac'], 'dl-mac': ['mac_app_store', 'mac'],
        'android': ['google_play', 'android'], 'together-android': ['google_play', 'android'], 'dl-android': ['google_play', 'android'],
        'web-beta': ['web', 'web'], 'together-web': ['web', 'web'], 'dl-web': ['web', 'web'],
        'pixeldoro-setup.exe': ['github', 'windows'], 'pixeldoro-linux.tar.gz': ['github', 'linux'],
        'discord-activity': ['discord_activity', 'discord'],
        'pixel-mini-apple': ['app_store', 'ios'], 'pixel-mini-android': ['google_play', 'android']
    };
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        var link = a.hostname === 'play.pixeldoro.io' ? a.pathname.replace(/^\/|\/$/g, '')
            : a.hostname === 'github.com' && a.pathname.indexOf('/pixeldoro/desktop/') === 0 ? a.pathname.split('/').pop()
            : '';
        if (!LINKS[link]) return;
        posthog.capture('get_app_click', {
            store: LINKS[link][0],
            platform: LINKS[link][1],
            app: link.indexOf('pixel-mini') === 0 ? 'mini' : 'pixeldoro',
            link: link
        }, { transport: 'sendBeacon', send_instantly: true });
    }, true);
}
