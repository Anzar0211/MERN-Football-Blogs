import { useEffect } from "react";

const Statistics = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ls.soccersapi.com/widget/res/awo_w5201_664730f1a7fc1/widget.js';
    script.type="module"
    script.async = true;
    document.body.appendChild(script);

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const checkboxes = document.querySelectorAll('.add-remove-match');
          checkboxes.forEach(checkbox => checkbox.disabled = true);
        }
      }
    });

    const widgetContainer = document.getElementById('ls-widget');
    observer.observe(widgetContainer, { childList: true });

    return () => {
      observer.disconnect();
      const scriptTag = document.querySelector('script[src="https://ls.soccersapi.com/widget/res/awo_w5201_664730f1a7fc1/widget.js"]');
      if (scriptTag) {
        document.body.removeChild(scriptTag);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full px-4">
        <div id="ls-widget" data-w="awo_w5201_664730f1a7fc1" className="livescore-widget w-full"></div>
      </div>
    </div>
  );
};

export default Statistics;


