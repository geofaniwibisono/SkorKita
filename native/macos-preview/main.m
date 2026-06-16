#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface ScoreboardWindowController : NSWindowController <WKUIDelegate, WKNavigationDelegate>
@property(nonatomic, strong) NSURL *resourcesURL;
@property(nonatomic, strong) WKWebView *webView;
@property(nonatomic, strong) NSMutableArray<ScoreboardWindowController *> *childWindows;
- (instancetype)initWithResourcesURL:(NSURL *)resourcesURL
                                page:(NSString *)page
                               title:(NSString *)title
                                size:(NSSize)size;
@end

@implementation ScoreboardWindowController

- (instancetype)initWithResourcesURL:(NSURL *)resourcesURL
                                page:(NSString *)page
                               title:(NSString *)title
                                size:(NSSize)size {
  WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
  configuration.websiteDataStore = WKWebsiteDataStore.defaultDataStore;
  WKWebView *view = [[WKWebView alloc] initWithFrame:NSZeroRect
                                      configuration:configuration];
  NSWindow *window = [[NSWindow alloc]
      initWithContentRect:NSMakeRect(0, 0, size.width, size.height)
                styleMask:NSWindowStyleMaskTitled | NSWindowStyleMaskClosable |
                          NSWindowStyleMaskMiniaturizable |
                          NSWindowStyleMaskResizable
                  backing:NSBackingStoreBuffered
                    defer:NO];
  window.title = title;
  window.contentView = view;
  window.releasedWhenClosed = NO;
  window.collectionBehavior = NSWindowCollectionBehaviorFullScreenPrimary;
  [window center];

  self = [super initWithWindow:window];
  if (self) {
    self.resourcesURL = resourcesURL;
    self.webView = view;
    self.childWindows = [NSMutableArray array];
    view.UIDelegate = self;
    view.navigationDelegate = self;
    [self loadPage:page];
  }
  return self;
}

- (void)loadPage:(NSString *)page {
  NSURLComponents *pageComponents = [NSURLComponents componentsWithString:page];
  NSString *filename = pageComponents.path.length
                           ? pageComponents.path
                           : [page componentsSeparatedByString:@"?"].firstObject;
  NSURL *fileURL = [self.resourcesURL URLByAppendingPathComponent:filename];
  NSURLComponents *components =
      [NSURLComponents componentsWithURL:fileURL resolvingAgainstBaseURL:NO];
  components.query = pageComponents.query;
  [self.webView loadFileURL:components.URL
         allowingReadAccessToURL:self.resourcesURL];
}

- (nullable WKWebView *)webView:(WKWebView *)webView
            createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration
                       forNavigationAction:(WKNavigationAction *)navigationAction
                            windowFeatures:(WKWindowFeatures *)windowFeatures {
  NSURL *targetURL = navigationAction.request.URL;
  if (!targetURL) {
    return nil;
  }
  NSString *page = targetURL.lastPathComponent.length
                       ? targetURL.lastPathComponent
                       : @"scoreboard.html";
  if (targetURL.query.length) {
    page = [page stringByAppendingFormat:@"?%@", targetURL.query];
  }
  ScoreboardWindowController *child = [[ScoreboardWindowController alloc]
      initWithResourcesURL:self.resourcesURL
                      page:page
                     title:@"SkorKita - Scoreboard Viewer"
                      size:NSMakeSize(1280, 720)];
  child.window.collectionBehavior =
      NSWindowCollectionBehaviorFullScreenPrimary | NSWindowCollectionBehaviorManaged;
  [child showWindow:nil];
  [self.childWindows addObject:child];
  return nil;
}

- (void)webView:(WKWebView *)webView
    decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction
                    decisionHandler:
                        (void (^)(WKNavigationActionPolicy))decisionHandler {
  NSURL *url = navigationAction.request.URL;
  if (url.isFileURL || [url.scheme isEqualToString:@"about"]) {
    decisionHandler(WKNavigationActionPolicyAllow);
  } else {
    [NSWorkspace.sharedWorkspace openURL:url];
    decisionHandler(WKNavigationActionPolicyCancel);
  }
}

@end

@interface AppDelegate : NSObject <NSApplicationDelegate>
@property(nonatomic, strong) ScoreboardWindowController *mainWindowController;
@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)notification {
  NSString *resourcePath = NSBundle.mainBundle.resourcePath;
  if (!resourcePath) {
    [NSApp terminate:nil];
    return;
  }
  NSURL *resourcesURL =
      [[NSURL fileURLWithPath:resourcePath] URLByAppendingPathComponent:@"Web"];
  self.mainWindowController = [[ScoreboardWindowController alloc]
      initWithResourcesURL:resourcesURL
                      page:@"index.html?role=single&desktop=1"
                     title:@"SkorKita Offline Preview"
                      size:NSMakeSize(1440, 900)];
  [self.mainWindowController showWindow:nil];
  [NSApp activateIgnoringOtherApps:YES];
}

- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)sender {
  return YES;
}

@end

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    NSApplication *application = NSApplication.sharedApplication;
    AppDelegate *delegate = [[AppDelegate alloc] init];
    application.delegate = delegate;
    [application setActivationPolicy:NSApplicationActivationPolicyRegular];
    [application run];
  }
  return 0;
}

