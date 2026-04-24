import React, { useEffect, useRef } from 'react';

/**
 * Renders the 3D poem animation component.
 */
export const PoemAnimation = ({ poemHTML, backgroundImageUrl, boyImageUrl }: { poemHTML: string, backgroundImageUrl: string, boyImageUrl: string }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // This effect handles the responsive scaling of the animation container.
    useEffect(() => {
        function adjustContentSize() {
            if (contentRef.current) {
                const viewportWidth = window.innerWidth;
                const baseWidth = 1000;
                const scaleFactor = viewportWidth < baseWidth ? (viewportWidth / baseWidth) * 0.9 : 1;
                contentRef.current.style.transform = `scale(${scaleFactor})`;
            }
        }

        adjustContentSize();
        window.addEventListener("resize", adjustContentSize);
        return () => window.removeEventListener("resize", adjustContentSize);
    }, []);

    return (
        <div className="flex items-center justify-center py-20 overflow-hidden">
            <div 
                ref={contentRef} 
                className="relative origin-center transition-transform duration-300"
                style={{ width: '1000px', height: '562px' }}
            >
                <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl bg-black">
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mix-blend-overlay animate-pulse"></div>
                    <img 
                      className="absolute inset-0 w-full h-full object-cover opacity-80" 
                      src={backgroundImageUrl} 
                      alt="Background" 
                      onError={(e: any) => e.target.style.display = 'none'} 
                    />
                    <img 
                      className="absolute bottom-0 right-10 w-auto h-[90%] object-contain z-20" 
                      src={boyImageUrl} 
                      alt="Overlay" 
                      onError={(e: any) => e.target.style.display = 'none'} 
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
                        <div className="cube-wrapper relative w-[400px] h-[400px]">
                          {/* We simulate the cube faces with CSS here, or adapt the specific styles from the txt */}
                          <div className="absolute inset-0 border border-white/20 backdrop-blur-md p-8 overflow-hidden rounded-lg flex items-center justify-center text-white/90 text-sm leading-relaxed text-center"
                               dangerouslySetInnerHTML={{ __html: poemHTML }}>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
