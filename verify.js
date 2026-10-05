const http = require('http');
const fs = require('fs');
const path = require('path');

function testUrl(url) {
    return new Promise((resolve) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    length: data.length,
                    data: data
                });
            });
        }).on('error', err => {
            resolve({ error: err.message });
        });
    });
}

async function runVerification() {
    console.log("=== VERIFICACIÓN DE ENDPOINTS EN HTTP://LOCALHOST:8000 ===");
    
    // 1. Verificar index.html
    const indexRes = await testUrl('http://localhost:8000/');
    console.log('Index status:', indexRes.status, 'Length:', indexRes.length);
    
    // Verificar intro text
    const introFound = indexRes.data.includes('Hay algo que preparé especialmente para ti.');
    console.log('Intro text found:', introFound ? '✅ SÍ' : '❌ NO');
    
    // Verificar boton comenzar
    const btnComenzar = indexRes.data.includes('id="btn-comenzar"');
    console.log('Boton comenzar found:', btnComenzar ? '✅ SÍ' : '❌ NO');

    // Verificar confirmación
    const confirmFound = indexRes.data.includes('¿Estás segura de que quieres entrar?');
    console.log('Confirm question found:', confirmFound ? '✅ SÍ' : '❌ NO');

    const btnSi1 = indexRes.data.includes('id="btn-si-1"');
    const btnSi2 = indexRes.data.includes('id="btn-si-2"');
    console.log('Botones de confirmación found:', (btnSi1 && btnSi2) ? '✅ SÍ' : '❌ NO');

    // Verificar dedicatoria
    const dedFound = indexRes.data.includes('Siempre tendrás un lugar especial e imborrable en mi corazón, Marumi.');
    console.log('Dedication text in HTML found:', dedFound ? '✅ SÍ' : '❌ NO');

    // 2. Verificar config.js
    const configRes = await testUrl('http://localhost:8000/config.js');
    console.log('config.js status:', configRes.status);
    const hasMarumi = configRes.data.includes('const nombre = "Marumi";');
    console.log('Nombre Marumi in config.js:', hasMarumi ? '✅ SÍ' : '❌ NO');
    const hasQueridaMarumi = configRes.data.includes('Querida Marumi');
    console.log('Querida Marumi in letter:', hasQueridaMarumi ? '✅ SÍ' : '❌ NO');

    // 3. Verificar script.js y style.css
    const scriptRes = await testUrl('http://localhost:8000/script.js');
    console.log('script.js status:', scriptRes.status);
    const styleRes = await testUrl('http://localhost:8000/style.css');
    console.log('style.css status:', styleRes.status);

    // 4. Verificar fotos de la galería
    console.log('\n=== VERIFICANDO CARGA DE FOTOS DE LA GALERÍA ===');
    const configModule = require('./config.js'); // We can require it if we mock or read directly
    const configContent = fs.readFileSync(path.join(__dirname, 'config.js'), 'utf8');
    
    // Extraer URLs de fotos en config.js
    const matches = [...configContent.matchAll(/url:\s*"([^"]+)"/g)].map(m => m[1]);
    console.log(`Encontradas ${matches.length} imágenes en config.js.`);

    let allLoaded = true;
    for (const url of matches) {
        const encodedUrl = encodeURI('http://localhost:8000/' + url);
        const imgRes = await testUrl(encodedUrl);
        const ok = imgRes.status === 200;
        if (!ok) {
            console.log(`❌ ERROR al cargar ${url}: Status ${imgRes.status}`);
            allLoaded = false;
        } else {
            console.log(`✅ Foto cargada correctamente: ${url} (Tamaño: ${imgRes.headers['content-length']} bytes)`);
        }
    }

    if (allLoaded) {
        console.log('\n🌟 ¡TODAS LAS FOTOS SE CARGARON SATISFACTORIAMENTE (STATUS 200)!');
    }
}

runVerification();
