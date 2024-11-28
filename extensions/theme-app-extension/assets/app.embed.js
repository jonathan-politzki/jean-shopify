// extensions/theme-app-extension/assets/app.embed.js
const JeanPersonalize = {
    open: function() {
        const appUrl = window.shopify.config.get('appUrl');
        window.location.href = `${appUrl}/auth`;
    }
};