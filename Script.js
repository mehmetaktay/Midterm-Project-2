document.addEventListener('DOMContentLoaded', () => {
    const crackButton = document.getElementById('crack-button');
    const cipherTextArea = document.getElementById('cipher-text');
    const fileUpload = document.getElementById('file-upload');
    const resultsArea = document.getElementById('results-area');

    // Harfi verilen shift değeri kadar çözer (sola kaydırır)
    function caesarDecrypt(text, shift) {
        let result = '';
        text = text.toUpperCase();

        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i);

            // Sadece İngilizce A-Z harfleri için (ASCII 65-90)
            if (charCode >= 65 && charCode <= 90) {
                // Deşifreleme formülü: (x - shift) mod 26
                let decryptedCharCode = charCode - shift;
                
                // Karakter 'A' (65) altına düşerse, döngüyü tamamlamak için 26 ekle
                if (decryptedCharCode < 65) {
                    decryptedCharCode += 26;
                }
                result += String.fromCharCode(decryptedCharCode);
            } else {
                // Harf olmayan karakterleri (boşluk, noktalama) olduğu gibi bırak
                result += text[i];
            }
        }
        return result;
    }

    // Brute-Force Kırma İşlevi (Tüm 25 olası kaydırmayı dener)
    function crackCipher(cipherText) {
        resultsArea.innerHTML = ''; 

        if (!cipherText.trim()) {
            resultsArea.innerHTML = '<p style="color:red;">Please enter or upload encrypted text.</p>';
            return;
        }

        // Kırma işlemi: k = 1'den 25'e kadar tüm olası kaydırmaları dene
        for (let shift = 1; shift <= 25; shift++) {
            const decryptedText = caesarDecrypt(cipherText, shift);
            
            // Sonuçları HTML'e ekle
            const resultDiv = document.createElement('div');
          resultDiv.innerHTML = `<strong>Shift ${shift}:</strong> ${decryptedText}`;
            resultsArea.appendChild(resultDiv);
        }
    }

    // Butona tıklama olayı
    crackButton.addEventListener('click', () => {
        const cipherText = cipherTextArea.value;
        crackCipher(cipherText);
    });

    // Dosya yükleme olayı
    fileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const fileName = file ? file.name : 'File Select';
        
        // Label metnini güncelleyebiliriz (opsiyonel)
        document.querySelector('.file-label').textContent = fileName;
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                cipherTextArea.value = e.target.result; // Metni Textarea'ya yerleştir
            };
            reader.readAsText(file);
        }
    });
});