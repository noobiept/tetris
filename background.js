chrome.app.runtime.onLaunched.addListener( function() {
    chrome.app.window.create( 'index.html', {
        'innerBounds': {
            'width': 800,
            'height': 600
        },
        'id': 'default'
    });
});
