
// Route: /home

// SSR Hooks (no-op stubs for server-side rendering)
function useState(initialValue) { return [initialValue, () => {}]; }
function useEffect(callback, deps) { /* SSR: no-op */ }
function useMemo(factory, deps) { return factory(); }
function useCallback(callback, deps) { return callback; }
function useRef(initialValue) { return { current: initialValue }; }
function usePath() { return typeof window !== 'undefined' ? window.location.pathname : '/'; }
function navigate() {}

// SSR Component Definitions

const Footer = (props) => { return footer([
    div([
      div([
        div([
          h3("PDF Sign Tool", {
            className: "text-xl font-bold text-black mb-3"
          }),
          p("Free, easy, and secure PDF signing. No signup required.", {
            className: "text-black/60 text-sm"
          })
        ], { className: "mb-8 sm:mb-0" }),
        
        div([
          h4("Quick Links", {
            className: "text-xs font-semibold text-black mb-4 uppercase tracking-wider"
          }),
          div([
            a("Home", {
              href: "#",
              onclick: (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              },
              className: "block text-black/60 hover:text-black mb-2 text-sm transition"
            }),
            a("Features", {
              href: "#features",
              onclick: (e) => {
                e.preventDefault();
                document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
              },
              className: "block text-black/60 hover:text-black mb-2 text-sm transition"
            }),
            a("Get Started", {
              href: "#upload-section",
              onclick: (e) => {
                e.preventDefault();
                document.querySelector('#upload-section')?.scrollIntoView({ behavior: 'smooth' });
              },
              className: "block text-black/60 hover:text-black text-sm transition"
            })
          ])
        ], { className: "mb-8 sm:mb-0" }),
        
        div([
          h4("Features", {
            className: "text-xs font-semibold text-black mb-4 uppercase tracking-wider"
          }),
          div([
            span("✓ 100% Free", {
              className: "block text-black/60 mb-2 text-sm"
            }),
            span("✓ No Signup", {
              className: "block text-black/60 mb-2 text-sm"
            }),
            span("✓ Secure & Private", {
              className: "block text-black/60 text-sm"
            })
          ])
        ])
      ], { className: "grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12" }),
      
      div([
        div([
          p("Made with ⚛️ ATOM Framework", {
            className: "text-black/50 text-sm text-center sm:text-left"
          }),
          p("© 2024 PDF Sign Tool. All rights reserved.", {
            className: "text-black/50 text-sm text-center sm:text-right"
          })
        ], { className: "flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-black/10" })
      ])
    ], { className: "max-w-6xl mx-auto px-6 lg:px-8 py-16" })
  ], { className: "bg-gradient-to-b from-white to-black/5 mt-20" }); };

const Navbar = (props) => { return nav([
    div([
      div([
        h1("PDF Sign", {
          className: "text-xl sm:text-2xl font-bold text-black tracking-tight"
        })
      ], { className: "flex items-center" }),
      div([
        button("Features", {
          onclick: () => {
            document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
          },
          className: "px-4 py-2 text-black/70 hover:text-black transition font-medium"
        }),
        button("Get Started", {
          onclick: () => {
            document.querySelector('#upload-section')?.scrollIntoView({ behavior: 'smooth' });
          },
          className: "px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-black/90 transition shadow-lg"
        })
      ], { className: "hidden sm:flex items-center gap-6" })
    ], { className: "max-w-6xl mx-auto px-6 lg:px-8 flex justify-between items-center py-5" })
  ], { 
    className: "fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/10 shadow-sm"
  }); };


// SSR HTML Helper Functions
function el(tag, content, props = {}) {
    let attrs = "";
    Object.keys(props).forEach(key => {
        if (key.startsWith('on')) return;
        if (key === 'className') attrs += ` class="${props[key]}"`;
        else if (key === 'style') {
            const styleStr = Object.entries(props[key]).map(([k,v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';');
            attrs += ` style="${styleStr}"`;
        } else if (['autoplay', 'loop', 'muted', 'controls', 'playsinline', 'checked', 'disabled'].includes(key)) {
            if(props[key]) attrs += ` ${key}`;
        } else if (key === 'value') {
            // CRITICAL: Handle all edge cases for value - undefined, null, false, and string "undefined"
            let safeVal;
            if (props[key] === undefined || props[key] === null || props[key] === false) {
                safeVal = '';
            } else if (typeof props[key] === 'string' && props[key] === 'undefined') {
                // Handle case where undefined was stringified
                safeVal = '';
            } else {
                safeVal = String(props[key]);
            }
            if (safeVal !== '') attrs += ` value="${safeVal.replace(/"/g, '&quot;')}"`;
        } else if (props[key] !== null && props[key] !== undefined && typeof props[key] !== 'object') {
            attrs += ` ${key}="${String(props[key]).replace(/"/g, '&quot;')}"`;
        }
    });
    let innerHTML = '';
    if (content === null || content === undefined || content === false) {
        innerHTML = '';
    } else if (Array.isArray(content)) {
        innerHTML = content.filter(c => c !== null && c !== undefined && c !== false).map(c => {
            return (typeof c === 'object' && c.outerHTML) ? c.outerHTML : String(c);
        }).join('');
    } else {
        innerHTML = String(content || '');
    }
    if (['input', 'img', 'br', 'hr', 'atom-video', 'atom-play', 'atom-progress', 'atom-cursor', 'source'].includes(tag)) return `<${tag}${attrs} />`;
    return `<${tag}${attrs}>${innerHTML}</${tag}>`;
}
const div = (c, p) => el('div', c, p);
const h1 = (c, p) => el('h1', c, p);
const h2 = (c, p) => el('h2', c, p);
const h3 = (c, p) => el('h3', c, p);
const h4 = (c, p) => el('h4', c, p);
const h5 = (c, p) => el('h5', c, p);
const h6 = (c, p) => el('h6', c, p);
const p = (c, p) => el('p', c, p);
const button = (c, p) => el('button', c, p);
const input = (c, p) => el('input', c, p);
const form = (c, p) => el('form', c, p);
const select = (c, p) => el('select', c, p);
const option = (c, p) => el('option', c, p);
const textarea = (c, p) => el('textarea', c, p);
const nav = (c, p) => el('nav', c, p);
const footer = (c, p) => el('footer', c, p);
const span = (c, p) => el('span', c, p);
const ul = (c, p) => el('ul', c, p);
const ol = (c, p) => el('ol', c, p);
const li = (c, p) => el('li', c, p);
const section = (c, p) => el('section', c, p);
const header = (c, p) => el('header', c, p);
const article = (c, p) => el('article', c, p);
const aside = (c, p) => el('aside', c, p);
const main = (c, p) => el('main', c, p);
const label = (c, p) => el('label', c, p);
const table = (c, p) => el('table', c, p);
const thead = (c, p) => el('thead', c, p);
const tbody = (c, p) => el('tbody', c, p);
const tr = (c, p) => el('tr', c, p);
const td = (c, p) => el('td', c, p);
const th = (c, p) => el('th', c, p);
const strong = (c, p) => el('strong', c, p);
const em = (c, p) => el('em', c, p);
const a = (text, props) => el('a', text, props);
const img = (props) => el('img', null, props);
const Image = (props) => {
    const { src, width, height, sizes, quality, format, ...restProps } = props;
    if (src && (src.startsWith('http://') || src.startsWith('https://'))) {
        return el('img', null, { loading: "lazy", decoding: "async", ...props });
    }
    const getOptimizedUrl = (w, h, q, f) => {
        return `/_atom/image?url=${encodeURIComponent(src)}&w=${w || ''}&h=${h || ''}&q=${q || 85}&fmt=${f || 'auto'}`;
    };
    if (width && sizes) {
        const baseUrl = src || props.src;
        const widths = [640, 768, 1024, 1280, 1920].filter(w => w <= width * 2);
        const srcset = widths.map(w => {
            const url = `/_atom/image?url=${encodeURIComponent(baseUrl)}&w=${w}&q=${quality || 85}&fmt=${format || 'auto'}`;
            return `${url} ${w}w`;
        }).join(', ');
        return el('img', null, {
            src: `/_atom/image?url=${encodeURIComponent(baseUrl)}&w=${width}&q=${quality || 85}&fmt=${format || 'auto'}`,
            srcset,
            sizes: sizes || `(max-width: ${width}px) 100vw, ${width}px`,
            width,
            height,
            loading: "lazy",
            decoding: "async",
            ...restProps
        });
    }
    if (src && (width || height)) {
        const optimizedSrc = `/_atom/image?url=${encodeURIComponent(src)}&w=${width || ''}&h=${height || ''}&q=${quality || 85}&fmt=${format || 'auto'}`;
        return el('img', null, { src: optimizedSrc, width, height, loading: "lazy", decoding: "async", ...restProps });
    }
    return el('img', null, { loading: "lazy", decoding: "async", ...props });
};

const Actions = {};

const PageContent = (props) => { 
    // Ensure props is always an object
    props = props || {};
    const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [signatureType, setSignatureType] = useState('draw'); // 'draw' or 'type'
  const [signatureText, setSignatureText] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [signedPdfUrl, setSignedPdfUrl] = useState(null);
  const canvasRef = useRef(null);
  const [signatureImage, setSignatureImage] = useState(null);
  
  // Initialize canvas for drawing signature
  useEffect(() => {
    if (signatureType !== 'draw' || !pdfFile) {
      // Clean up if switching away from draw mode
      return;
    }
    
    let cleanupFn = null;
    let timeoutId = null;
    
    // Small initial delay to ensure DOM is ready when PDF is first uploaded
    const initialDelay = setTimeout(() => {
      // Retry mechanism to find canvas
      const setupCanvas = (attempt = 0) => {
        // Try both ref and getElementById
        const canvas = canvasRef.current || document.getElementById('signature-canvas');
        if (!canvas) {
          if (attempt < 30) {
            // Retry up to 30 times with increasing delays
            timeoutId = setTimeout(() => setupCanvas(attempt + 1), 50 * (attempt + 1));
            return;
          }
          console.log('Canvas not found after retries');
          return;
        }
        
        console.log('Canvas found, setting up drawing');
        
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        
        const getCoordinates = (e) => {
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          
          if (e.touches && e.touches.length > 0) {
            return {
              x: (e.touches[0].clientX - rect.left) * scaleX,
              y: (e.touches[0].clientY - rect.top) * scaleY
            };
          }
          return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
          };
        };
        
        const startDrawing = (e) => {
          isDrawing = true;
          const coords = getCoordinates(e);
          lastX = coords.x;
          lastY = coords.y;
        };
        
        const draw = (e) => {
          if (!isDrawing) return;
          e.preventDefault();
          const coords = getCoordinates(e);
          const currentX = coords.x;
          const currentY = coords.y;
          
          ctx.beginPath();
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(currentX, currentY);
          ctx.stroke();
          
          lastX = currentX;
          lastY = currentY;
        };
        
        const stopDrawing = () => {
          isDrawing = false;
        };
        
        // Mouse events
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);
        
        console.log('Mouse event listeners attached');
        
        // Touch events for mobile
        const touchStart = (e) => {
          e.preventDefault();
          startDrawing(e);
        };
        
        const touchMove = (e) => {
          e.preventDefault();
          draw(e);
        };
        
        const touchEnd = (e) => {
          e.preventDefault();
          stopDrawing();
        };
        
        canvas.addEventListener('touchstart', touchStart);
        canvas.addEventListener('touchmove', touchMove);
        canvas.addEventListener('touchend', touchEnd);
        canvas.addEventListener('touchcancel', touchEnd);
        
        console.log('Touch event listeners attached');
        
        // Store cleanup function
        cleanupFn = () => {
          console.log('Cleaning up canvas event listeners');
          canvas.removeEventListener('mousedown', startDrawing);
          canvas.removeEventListener('mousemove', draw);
          canvas.removeEventListener('mouseup', stopDrawing);
          canvas.removeEventListener('mouseleave', stopDrawing);
          canvas.removeEventListener('touchstart', touchStart);
          canvas.removeEventListener('touchmove', touchMove);
          canvas.removeEventListener('touchend', touchEnd);
          canvas.removeEventListener('touchcancel', touchEnd);
        };
      };
      
      // Start setup
      setupCanvas();
    }, 100);
    
    return () => {
      clearTimeout(initialDelay);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [signatureType, pdfFile]);
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setSignedPdfUrl(null);
    } else {
      alert('Please upload a PDF file');
    }
  };
  
  const handleUploadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileInput = document.getElementById('pdf-upload');
    if (fileInput) {
      fileInput.click();
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setSignedPdfUrl(null);
    } else {
      alert('Please upload a PDF file');
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Setup file input change handler using useEffect
  useEffect(() => {
    const fileInput = document.getElementById('pdf-upload');
    if (fileInput) {
      const handleChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
          setPdfFile(file);
          const url = URL.createObjectURL(file);
          setPdfUrl(url);
          setSignedPdfUrl(null);
        } else {
          alert('Please upload a PDF file');
        }
      };
      
      fileInput.addEventListener('change', handleChange);
      
      return () => {
        fileInput.removeEventListener('change', handleChange);
      };
    }
  }, []);
  
  const clearSignature = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setSignatureText('');
    setSignatureImage(null);
  };
  
  const getSignatureImage = () => {
    if (signatureType === 'draw' && canvasRef.current) {
      return canvasRef.current.toDataURL('image/png');
    }
    return null;
  };
  
  // Helper function to convert base64 data URL to Uint8Array
  const base64ToUint8Array = (dataUrl) => {
    const base64Data = dataUrl.split(',')[1];
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };
  
  const signPdf = async () => {
    if (!pdfFile) {
      alert('Please upload a PDF file first');
      return;
    }
    
    if (signatureType === 'draw') {
      const canvas = canvasRef.current || document.getElementById('signature-canvas');
      if (!canvas) {
        alert('Please draw your signature');
        return;
      }
      // Check if canvas has any drawing (check if canvas is not empty/white)
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let hasDrawing = false;
      // Check if there's any non-white pixel (white is 255,255,255)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        // If pixel is not white (or very close to white), we have drawing
        if (r < 250 || g < 250 || b < 250) {
          hasDrawing = true;
          break;
        }
      }
      if (!hasDrawing) {
        alert('Please draw your signature on the canvas');
        return;
      }
    }
    
    if (signatureType === 'type' && !signatureText.trim()) {
      alert('Please enter your signature');
      return;
    }
    
    try {
      setIsSigning(true);
      
      // Dynamically import pdf-lib
      const { PDFDocument } = await import('pdf-lib');
      
      // Load the PDF
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Get the first page
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      
      // Create signature image
      let signatureImageData = null;
      
      if (signatureType === 'draw') {
        const canvas = canvasRef.current || document.getElementById('signature-canvas');
        if (!canvas) {
          alert('Canvas not found. Please try drawing again.');
          return;
        }
        const signatureDataUrl = canvas.toDataURL('image/png');
        const bytes = base64ToUint8Array(signatureDataUrl);
        signatureImageData = await pdfDoc.embedPng(bytes);
      } else {
        // For text signature, create an image from text
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 200;
        tempCanvas.height = 60;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.font = '24px Brush Script MT, cursive';
        tempCtx.fillStyle = '#1f2937';
        tempCtx.textAlign = 'center';
        tempCtx.fillText(signatureText, 100, 40);
        const textSignatureDataUrl = tempCanvas.toDataURL('image/png');
        const bytes = base64ToUint8Array(textSignatureDataUrl);
        signatureImageData = await pdfDoc.embedPng(bytes);
      }
      
      // Add signature to PDF (bottom right corner)
      if (signatureImageData) {
        const signatureSize = 120;
        firstPage.drawImage(signatureImageData, {
          x: width - signatureSize - 50,
          y: 50,
          width: signatureSize,
          height: signatureSize * 0.4,
        });
      }
      
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSignedPdfUrl(url);
      
    } catch (error) {
      console.error('Error signing PDF:', error);
      alert('Error signing PDF. Please try again.');
    } finally {
      setIsSigning(false);
    }
  };
  
  const downloadSignedPdf = () => {
    if (signedPdfUrl) {
      const link = document.createElement('a');
      link.href = signedPdfUrl;
      link.download = pdfFile.name.replace('.pdf', '_signed.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return div([
    // Hero Section
    div([
      div([
        h1("Sign PDF Documents", {
          className: "text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-6 leading-tight tracking-tight"
        }),
        p("Free, easy, and automatic PDF signing. No signup required. No hassle.", {
          className: "text-lg sm:text-xl text-black/60 mb-12 max-w-2xl mx-auto font-light"
        }),
        div([
          div([
            span("✓", { className: "text-xl mr-3 text-black" }),
            span("100% Free", { className: "text-base font-medium text-black/80" })
          ], { className: "flex items-center mb-3" }),
          div([
            span("✓", { className: "text-xl mr-3 text-black" }),
            span("No Signup Required", { className: "text-base font-medium text-black/80" })
          ], { className: "flex items-center mb-3" }),
          div([
            span("✓", { className: "text-xl mr-3 text-black" }),
            span("Secure & Private", { className: "text-base font-medium text-black/80" })
          ], { className: "flex items-center" })
        ], { className: "flex flex-col items-center" })
      ], { className: "text-center px-4 py-24 sm:py-32" })
    ], { 
      className: "bg-gradient-to-br from-white via-gray-50 to-black/5 min-h-[70vh] flex items-center justify-center pt-20"
    }),
    
    // Main Content
    div([
      // Upload Section
      div([
        h2("Upload Your PDF", {
          className: "text-3xl sm:text-4xl font-bold text-black mb-8 text-center tracking-tight"
        }),
        div([
          input(null, {
            type: "file",
            accept: "application/pdf",
            onchange: handleFileUpload,
            id: "pdf-upload",
            className: "hidden"
          }),
          div([
            div([
              div("📄", {
                className: "text-5xl mb-4 opacity-50"
              }),
              p("Click to upload PDF", {
                className: "text-lg font-medium text-black mb-2"
              }),
              p("or drag and drop", {
                className: "text-sm text-black/50"
              }),
              pdfFile && (
                p(pdfFile.name, {
                  className: "text-sm text-black mt-3 font-medium bg-black/5 px-4 py-2 rounded-full inline-block"
                })
              )
            ], { className: "text-center" })
          ], {
            id: "upload-area",
            onclick: handleUploadClick,
            ondrop: handleDrop,
            ondragover: handleDragOver,
            className: `flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
              pdfFile 
                ? "border-black bg-black/5" 
                : "border-black/20 bg-white hover:border-black/40 hover:bg-black/5"
            }`
          })
        ], { className: "mb-8" })
      ], { id: "upload-section", className: "mb-12" }),
      
      // Signature Section
      pdfFile && (
        div([
          h2("Add Your Signature", {
            className: "text-3xl sm:text-4xl font-bold text-black mb-8 text-center tracking-tight"
          }),
          
          // Signature Type Toggle
          div([
            button("Draw Signature", {
              onclick: () => setSignatureType('draw'),
              className: `px-8 py-3 rounded-l-full font-medium transition ${
                signatureType === 'draw'
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-black/60 hover:text-black border border-black/20"
              }`
            }),
            button("Type Signature", {
              onclick: () => setSignatureType('type'),
              className: `px-8 py-3 rounded-r-full font-medium transition ${
                signatureType === 'type'
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-black/60 hover:text-black border border-black/20"
              }`
            })
          ], { className: "flex justify-center mb-8" }),
          
          // Drawing Canvas
          signatureType === 'draw' && (
            div([
              canvas(null, {
                ref: canvasRef,
                id: "signature-canvas",
                width: 600,
                height: 200,
                className: "border-2 border-black/20 rounded-2xl bg-white cursor-crosshair w-full max-w-md mx-auto block shadow-sm"
              }),
              button("Clear", {
                onclick: clearSignature,
                className: "mt-6 px-6 py-2 bg-white text-black border border-black/20 rounded-full hover:bg-black/5 transition mx-auto block font-medium"
              })
            ], { className: "mb-6" })
          ),
          
          // Text Signature
          signatureType === 'type' && (
            div([
              div([
                label("Your Signature", {
                  htmlFor: "signature-input",
                  className: "block text-sm font-medium text-black/70 mb-3 text-center"
                }),
                input(signatureText, {
                  type: "text",
                  id: "signature-input",
                  placeholder: "Type your name here",
                  value: signatureText,
                  oninput: (e) => setSignatureText(e.target.value),
                  className: "w-full max-w-lg mx-auto px-8 py-5 text-2xl border-2 border-black/20 rounded-2xl focus:ring-2 focus:ring-black/20 focus:border-black outline-none text-center bg-white shadow-sm font-serif placeholder:text-black/30"
                }),
                p("Your signature will appear in cursive style", {
                  className: "text-sm text-black/50 text-center mt-4"
                })
              ], { className: "flex flex-col items-center" })
            ], { className: "mb-6" })
          ),
          
          // Sign PDF Button
          div([
            button(
              isSigning ? "Signing PDF..." : "Sign PDF",
              {
                onclick: signPdf,
                disabled: isSigning,
                className: `px-12 py-4 text-lg font-semibold rounded-full transition ${
                  isSigning
                    ? "bg-black/30 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-black/90 shadow-xl hover:shadow-2xl transform hover:scale-105"
                }`
              }
            )
          ], { className: "text-center mb-8" }),
          
          // Download Section
          signedPdfUrl && (
            div([
              div([
                span("✓", { className: "text-3xl text-black mr-3" }),
                p("PDF signed successfully!", {
                  className: "text-xl font-semibold text-black"
                })
              ], { className: "flex items-center justify-center mb-6" }),
              button("Download Signed PDF", {
                onclick: downloadSignedPdf,
                className: "px-12 py-4 text-lg font-semibold bg-black text-white rounded-full hover:bg-black/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition"
              })
            ], { className: "text-center p-8 bg-black/5 rounded-2xl border-2 border-black/10" })
          )
        ], { className: "mb-12" })
      ),
      
      // Features Section
      div([
        h2("Why Choose Our PDF Sign Tool?", {
          className: "text-3xl sm:text-4xl font-bold text-black mb-12 text-center tracking-tight"
        }),
        div([
          div([
            div([
              span("🔒", { className: "text-5xl mb-6 block" }),
              h3("100% Private", {
                className: "text-xl font-bold text-black mb-3"
              }),
              p("All processing happens in your browser. Your PDFs never leave your device.", {
                className: "text-black/60 leading-relaxed"
              })
            ], { className: "text-center" })
          ], { className: "p-8 bg-white rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition" }),
          
          div([
            div([
              span("⚡", { className: "text-5xl mb-6 block" }),
              h3("Lightning Fast", {
                className: "text-xl font-bold text-black mb-3"
              }),
              p("Sign PDFs in seconds. No waiting, no delays.", {
                className: "text-black/60 leading-relaxed"
              })
            ], { className: "text-center" })
          ], { className: "p-8 bg-white rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition" }),
          
          div([
            div([
              span("💰", { className: "text-5xl mb-6 block" }),
              h3("Completely Free", {
                className: "text-xl font-bold text-black mb-3"
              }),
              p("No hidden fees, no subscriptions. Free forever.", {
                className: "text-black/60 leading-relaxed"
              })
            ], { className: "text-center" })
          ], { className: "p-8 bg-white rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition" })
        ], { className: "grid grid-cols-1 md:grid-cols-3 gap-8" })
      ], { id: "features", className: "mb-20" })
    ], { 
      className: "max-w-5xl mx-auto px-6 lg:px-8 py-16"
    })
  ], { 
    className: "min-h-screen bg-white" 
  }); 
};
export default (props) => {
    // Ensure props is always an object
    props = props || {};
    // Layout functions are passed via props for SSR
    const Layout = props.Layout;
    
    const pageContent = PageContent(props);
    let result = pageContent;
    if (Layout && typeof Layout === 'function') { result = Layout({ ...props, content: result }); }
    return result;
    
};
