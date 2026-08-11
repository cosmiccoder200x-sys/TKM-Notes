// Injected into <head> before CSS paints so the right theme is applied immediately (no flash).
// Preference: "pp:theme" = "light" | "dark" | "system" (defaults to system).
export default function ThemeScript() {
  const script = `
    (function(){
      try {
        var key = 'pp:theme';
        var stored = localStorage.getItem(key);
        var dark = stored === 'dark'
          || ((stored == null || stored === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', dark);
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', function(e){
          var cur = localStorage.getItem(key);
          if (cur == null || cur === 'system') {
            document.documentElement.classList.toggle('dark', e.matches);
          }
        });
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} data-pp-theme />;
}
