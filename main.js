const wrapper = document.querySelector('.wrapper');
const btn = wrapper.querySelector('.btn-form');
const input = wrapper.querySelector('.input-form');
const form = wrapper.querySelector('.form');
const img = wrapper.querySelector('.qr__code img');
const downloadBtn = wrapper.querySelector('.download');
let currentValueInput;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();
    if (!inputValue || inputValue === currentValueInput) return;
    currentValueInput = inputValue;

    btn.textContent = "Wait a few seconds, pls...";
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`;

    img.onload = () => {
        document.querySelector('.qr__code').style.display = 'block';
        document.querySelector('.download').style.display = 'block';
        btn.textContent = "Generate QR-code";
    };

    img.addEventListener("error", () => {
        alert("Failed to load QR-code. Please, try again.");
        location.reload();
    });
});


async function downloadQRCode(format) {
    const qrCodeUrl = img.src; 
    const response = await fetch(qrCodeUrl);
    
    if (!response.ok) {
        alert("Failed to download QR-code. Please, try again.");
        return;
    }

    const blob = await response.blob(); 
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob); 

   
    if (format === 'jpg') {
        link.href = url;
        link.download = 'qr-code.jpg'; 
    } else if (format === 'svg') {
        link.href = url;
        link.download = 'qr-code.svg'; 
    } else {
        link.href = url;
        link.download = 'qr-code.png'; 
    }

   
    link.click();

   
    URL.revokeObjectURL(url);
}


